import { useCallback, useMemo, useState } from 'react'
import { caseOne } from '../data/case'
import type { EvidenceId, Phase, SuspectId } from './types'

export function useTrialGame() {
  const caseData = caseOne
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

  const currentStatement = caseData.statements[statementIndex]
  const allBroken = brokenIds.size >= caseData.statements.length
  const livesLeft = caseData.maxMistakes - mistakes
  const failedByMistakes = mistakes >= caseData.maxMistakes

  const progress = useMemo(() => {
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
    phase,
    visitedDaily.size,
    collected.size,
    brokenIds.size,
    caseData.dailyScenes.length,
    caseData.evidence.length,
    caseData.statements.length,
  ])

  const reset = useCallback(() => {
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

  const startPrologue = useCallback(() => {
    setDialogueIndex(0)
    setPhase('prologue')
  }, [])

  const advanceDialogue = useCallback(() => {
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
  }, [phase, dialogueIndex, caseData, activeDailyId])

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
    if (visitedDaily.size < caseData.dailyScenes.length) return
    setDialogueIndex(0)
    setPhase('incident')
  }, [visitedDaily.size, caseData.dailyScenes.length])

  const dismissGate = useCallback(() => {
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
  }, [gateLines, dialogueIndex, caseData.investigationIntro, caseData.trialIntro])

  const collectEvidence = useCallback(
    (id: EvidenceId) => {
      setCollected((prev) => {
        const next = new Set(prev)
        next.add(id)
        return next
      })
      setInspectId(id)
      setDialogueIndex(0)
      setPendingDiscover(true)
    },
    [],
  )

  const closeInspect = useCallback(() => {
    const ev = caseData.evidence.find((e) => e.id === inspectId)
    if (pendingDiscover && ev && dialogueIndex < ev.discoverLines.length - 1) {
      setDialogueIndex((i) => i + 1)
      return
    }
    setPendingDiscover(false)
    setInspectId(null)
    setDialogueIndex(0)
  }, [caseData.evidence, inspectId, pendingDiscover, dialogueIndex])

  const beginTrial = useCallback(() => {
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
  }, [collected.size, caseData.evidence.length])

  const attemptBreak = useCallback(() => {
    if (!currentStatement || !selectedEvidence) {
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
  }, [
    currentStatement,
    selectedEvidence,
    brokenIds,
    mistakes,
    caseData.maxMistakes,
  ])

  const advanceAfterBreak = useCallback(() => {
    if (!currentStatement || !brokenIds.has(currentStatement.id)) return
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
  }, [currentStatement, brokenIds, revealLineIndex, caseData.statements.length])

  const accuse = useCallback(
    (id: SuspectId) => {
      setAccusedId(id)
      const success = id === caseData.witchId
      setWon(success)
      setDialogueIndex(0)
      setPhase('ending')
    },
    [caseData.witchId],
  )

  return {
    caseData,
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
  }
}

export type TrialGame = ReturnType<typeof useTrialGame>
