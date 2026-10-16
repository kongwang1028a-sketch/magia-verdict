import { useCallback, useEffect, useMemo, useState } from 'react'
import { loadCase } from '../data/loadCase'
import { DEFAULT_STORY_ID, STORY_CATALOG, STORY_STORAGE_KEY } from '../data/stories/catalog'
import type { CaseData, EvidenceId, Phase, SuspectId } from './types'

function readStoredStoryId(): string {
  try {
    const id = localStorage.getItem(STORY_STORAGE_KEY)
    if (id && STORY_CATALOG.some((s) => s.id === id)) return id
  } catch {
    /* ignore */
  }
  return DEFAULT_STORY_ID
}

export function useTrialGame() {
  const [storyId, setStoryId] = useState<string>(DEFAULT_STORY_ID)
  const [caseData, setCaseData] = useState<CaseData | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>('title')
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [visitedDaily, setVisitedDaily] = useState<Set<string>>(new Set())
  const [activeDailyId, setActiveDailyId] = useState<string | null>(null)
  const [collected, setCollected] = useState<Set<EvidenceId>>(new Set())
  const [statementIndex, setStatementIndex] = useState(0)
  const [brokenIds, setBrokenIds] = useState<Set<string>>(new Set())
  const [mistakes, setMistakes] = useState(0)
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceId | null>(null)
  const [feedback, setFeedback] = useState<{
    kind: 'success' | 'error' | 'info'
    text: string
  } | null>(null)
  const [revealLineIndex, setRevealLineIndex] = useState(0)
  const [accusedId, setAccusedId] = useState<SuspectId | null>(null)
  const [won, setWon] = useState(false)
  const [inspectId, setInspectId] = useState<EvidenceId | null>(null)
  const [pendingDiscover, setPendingDiscover] = useState(false)
  const [gateLines, setGateLines] = useState<'none' | 'invest' | 'trial'>('none')

  useEffect(() => {
    setStoryId(readStoredStoryId())
  }, [])

  const clearProgress = useCallback(() => {
    setPhase('title')
    setDialogueIndex(0)
    setVisitedDaily(new Set())
    setActiveDailyId(null)
    setCollected(new Set())
    setStatementIndex(0)
    setBrokenIds(new Set())
    setMistakes(0)
    setSelectedEvidence(null)
    setFeedback(null)
    setRevealLineIndex(0)
    setAccusedId(null)
    setWon(false)
    setInspectId(null)
    setPendingDiscover(false)
    setGateLines('none')
  }, [])

  useEffect(() => {
    let alive = true
    setCaseData(null)
    setLoadError(null)
    loadCase(storyId)
      .then((data) => {
        if (alive) setCaseData(data)
      })
      .catch((err: unknown) => {
        if (alive) setLoadError(err instanceof Error ? err.message : '劇本載入失敗')
      })
    return () => {
      alive = false
    }
  }, [storyId])

  const selectStory = useCallback(
    (id: string) => {
      if (!STORY_CATALOG.some((s) => s.id === id)) return
      try {
        localStorage.setItem(STORY_STORAGE_KEY, id)
      } catch {
        /* ignore */
      }
      clearProgress()
      setStoryId(id)
    },
    [clearProgress],
  )

  const currentStatement = caseData?.statements[statementIndex]
  const allBroken = caseData ? brokenIds.size >= caseData.statements.length : false
  const livesLeft = caseData ? caseData.maxMistakes - mistakes : 0
  const failedByMistakes = caseData ? mistakes >= caseData.maxMistakes : false

  const progress = useMemo(() => {
    if (!caseData) return 0
    if (phase === 'daily') {
      return Math.round((visitedDaily.size / caseData.dailyScenes.length) * 100)
    }
    if (phase === 'investigation') {
      return Math.round((collected.size / caseData.evidence.length) * 100)
    }
    if (phase === 'trial') {
      return Math.round((brokenIds.size / caseData.statements.length) * 100)
    }
    return 0
  }, [
    caseData,
    phase,
    visitedDaily.size,
    collected.size,
    brokenIds.size,
  ])

  const reset = useCallback(() => {
    clearProgress()
  }, [clearProgress])

  const startPrologue = useCallback(() => {
    setDialogueIndex(0)
    setPhase('prologue')
  }, [])

  const advanceDialogue = useCallback(() => {
    if (!caseData) return
    if (phase === 'prologue') {
      if (dialogueIndex < caseData.prologue.length - 1) {
        setDialogueIndex((i) => i + 1)
        return
      }
      setDialogueIndex(0)
      setPhase('daily')
      return
    }

    if (phase === 'incident') {
      if (dialogueIndex < caseData.incident.length - 1) {
        setDialogueIndex((i) => i + 1)
        return
      }
      setDialogueIndex(0)
      setGateLines('invest')
      setPhase('investigation')
      return
    }

    if (activeDailyId) {
      const scene = caseData.dailyScenes.find((s) => s.id === activeDailyId)
      if (!scene) return
      if (dialogueIndex < scene.lines.length - 1) {
        setDialogueIndex((i) => i + 1)
      }
    }
  }, [caseData, phase, dialogueIndex, activeDailyId])

  const openDailyScene = useCallback((id: string) => {
    setActiveDailyId(id)
    setDialogueIndex(0)
  }, [])

  const closeDailyScene = useCallback(() => {
    if (!activeDailyId) return
    setVisitedDaily((prev) => {
      const next = new Set(prev)
      next.add(activeDailyId)
      return next
    })
    setActiveDailyId(null)
    setDialogueIndex(0)
  }, [activeDailyId])

  const finishDaily = useCallback(() => {
    if (!caseData) return
    if (visitedDaily.size < caseData.dailyScenes.length) return
    setDialogueIndex(0)
    setPhase('incident')
  }, [caseData, visitedDaily.size])

  const dismissGate = useCallback(() => {
    if (!caseData) return
    const lines =
      gateLines === 'invest'
        ? caseData.investigationIntro
        : gateLines === 'trial'
          ? caseData.trialIntro
          : []
    if (dialogueIndex < lines.length - 1) {
      setDialogueIndex((i) => i + 1)
      return
    }
    setGateLines('none')
    setDialogueIndex(0)
  }, [caseData, gateLines, dialogueIndex])

  const collectEvidence = useCallback((id: EvidenceId) => {
    setCollected((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
    setInspectId(id)
    setDialogueIndex(0)
    setPendingDiscover(true)
  }, [])

  const closeInspect = useCallback(() => {
    if (!caseData) return
    const ev = caseData.evidence.find((e) => e.id === inspectId)
    if (pendingDiscover && ev && dialogueIndex < ev.discoverLines.length - 1) {
      setDialogueIndex((i) => i + 1)
      return
    }
    setPendingDiscover(false)
    setInspectId(null)
    setDialogueIndex(0)
  }, [caseData, inspectId, pendingDiscover, dialogueIndex])

  const beginTrial = useCallback(() => {
    if (!caseData) return
    if (collected.size < caseData.evidence.length) {
      setFeedback({
        kind: 'info',
        text: '希羅：證據還沒齊。把監牢各處找完再進去。',
      })
      return
    }
    setFeedback(null)
    setDialogueIndex(0)
    setGateLines('trial')
    setStatementIndex(0)
    setRevealLineIndex(0)
    setPhase('trial')
  }, [caseData, collected.size])

  const attemptBreak = useCallback(() => {
    if (!caseData || !currentStatement) return
    if (!selectedEvidence) {
      setFeedback({ kind: 'info', text: '艾瑪：先選證據，再喊異議！' })
      return
    }
    if (brokenIds.has(currentStatement.id)) return

    if (selectedEvidence === currentStatement.correctEvidenceId) {
      const nextBroken = new Set(brokenIds)
      nextBroken.add(currentStatement.id)
      setBrokenIds(nextBroken)
      setRevealLineIndex(0)
      setFeedback({ kind: 'success', text: '' })
      setSelectedEvidence(null)
    } else {
      const nextMistakes = mistakes + 1
      setMistakes(nextMistakes)
      setFeedback({ kind: 'error', text: currentStatement.wrongHint })
      setSelectedEvidence(null)
      if (nextMistakes >= caseData.maxMistakes) {
        setWon(false)
        setAccusedId(null)
        setDialogueIndex(0)
        setPhase('ending')
      }
    }
  }, [caseData, currentStatement, selectedEvidence, brokenIds, mistakes])

  const advanceAfterBreak = useCallback(() => {
    if (!caseData || !currentStatement || !brokenIds.has(currentStatement.id)) return
    const reveal = currentStatement.reveal
    if (revealLineIndex < reveal.length - 1) {
      setRevealLineIndex((i) => i + 1)
      return
    }
    if (brokenIds.size >= caseData.statements.length) {
      setFeedback(null)
      setRevealLineIndex(0)
      setPhase('accusation')
      return
    }
    setFeedback(null)
    setRevealLineIndex(0)
    setStatementIndex((i) => Math.min(i + 1, caseData.statements.length - 1))
  }, [caseData, currentStatement, brokenIds, revealLineIndex])

  const accuse = useCallback(
    (id: SuspectId) => {
      if (!caseData) return
      setAccusedId(id)
      const success = id === caseData.witchId
      setWon(success)
      setDialogueIndex(0)
      setPhase('ending')
    },
    [caseData],
  )

  const canSkipChapter =
    phase === 'prologue' ||
    phase === 'daily' ||
    phase === 'incident' ||
    phase === 'investigation' ||
    phase === 'trial' ||
    phase === 'ending'

  const skipChapterLabel = (() => {
    switch (phase) {
      case 'prologue':
        return '跳過序章'
      case 'daily':
        return '跳過日常'
      case 'incident':
        return '跳過事件'
      case 'investigation':
        return '跳過搜索'
      case 'trial':
        return '跳過審判辯論'
      case 'ending':
        return '跳過結局對話'
      default:
        return '跳過本章'
    }
  })()

  const skipChapter = useCallback(() => {
    if (!caseData) return

    if (phase === 'prologue') {
      setDialogueIndex(0)
      setPhase('daily')
      return
    }

    if (phase === 'daily') {
      setVisitedDaily(new Set(caseData.dailyScenes.map((s) => s.id)))
      setActiveDailyId(null)
      setDialogueIndex(0)
      setPhase('incident')
      return
    }

    if (phase === 'incident') {
      setDialogueIndex(0)
      setGateLines('none')
      setPhase('investigation')
      return
    }

    if (phase === 'investigation') {
      setCollected(new Set(caseData.evidence.map((e) => e.id)))
      setInspectId(null)
      setPendingDiscover(false)
      setFeedback(null)
      setDialogueIndex(0)
      setGateLines('none')
      setStatementIndex(0)
      setRevealLineIndex(0)
      setBrokenIds(new Set())
      setSelectedEvidence(null)
      setPhase('trial')
      return
    }

    if (phase === 'trial') {
      setGateLines('none')
      setFeedback(null)
      setSelectedEvidence(null)
      setBrokenIds(new Set(caseData.statements.map((s) => s.id)))
      setStatementIndex(Math.max(0, caseData.statements.length - 1))
      setRevealLineIndex(0)
      setPhase('accusation')
      return
    }

    if (phase === 'ending') {
      const lines = won ? caseData.endingTruth : caseData.endingWrong
      setDialogueIndex(Math.max(0, lines.length - 1))
    }
  }, [caseData, phase, won])

  return {
    storyId,
    stories: STORY_CATALOG,
    selectStory,
    caseData,
    loadError,
    phase,
    dialogueIndex,
    visitedDaily,
    activeDailyId,
    collected,
    statementIndex,
    currentStatement,
    brokenIds,
    mistakes,
    livesLeft,
    failedByMistakes,
    selectedEvidence,
    feedback,
    revealLineIndex,
    accusedId,
    won,
    allBroken,
    progress,
    inspectId,
    pendingDiscover,
    gateLines,
    canSkipChapter,
    skipChapterLabel,
    setSelectedEvidence,
    setFeedback,
    reset,
    startPrologue,
    advanceDialogue,
    openDailyScene,
    closeDailyScene,
    finishDaily,
    dismissGate,
    collectEvidence,
    closeInspect,
    beginTrial,
    attemptBreak,
    advanceAfterBreak,
    accuse,
    skipChapter,
  }
}

export type TrialGame = ReturnType<typeof useTrialGame>
export type LoadedTrialGame = Omit<TrialGame, 'caseData'> & { caseData: CaseData }
