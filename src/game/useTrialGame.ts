import { useCallback, useMemo, useState } from 'react'
import { caseOne } from '../data/case'
import type { EvidenceId, Phase, SuspectId } from './types'

export function useTrialGame() {
  const caseData = caseOne
  const [phase, setPhase] = useState<Phase>('title')
  const [collected, setCollected] = useState<Set<EvidenceId>>(new Set())
  const [statementIndex, setStatementIndex] = useState(0)
  const [brokenIds, setBrokenIds] = useState<Set<string>>(new Set())
  const [mistakes, setMistakes] = useState(0)
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceId | null>(null)
  const [feedback, setFeedback] = useState<{
    kind: 'success' | 'error' | 'info'
    text: string
  } | null>(null)
  const [accusedId, setAccusedId] = useState<SuspectId | null>(null)
  const [won, setWon] = useState(false)
  const [inspectId, setInspectId] = useState<EvidenceId | null>(null)

  const currentStatement = caseData.statements[statementIndex]
  const allBroken = brokenIds.size >= caseData.statements.length
  const livesLeft = caseData.maxMistakes - mistakes
  const failedByMistakes = mistakes >= caseData.maxMistakes

  const progress = useMemo(() => {
    if (phase === 'investigation') {
      return Math.round((collected.size / caseData.evidence.length) * 100)
    }
    if (phase === 'trial') {
      return Math.round((brokenIds.size / caseData.statements.length) * 100)
    }
    return 0
  }, [phase, collected.size, brokenIds.size, caseData.evidence.length, caseData.statements.length])

  const reset = useCallback(() => {
    setPhase('title')
    setCollected(new Set())
    setStatementIndex(0)
    setBrokenIds(new Set())
    setMistakes(0)
    setSelectedEvidence(null)
    setFeedback(null)
    setAccusedId(null)
    setWon(false)
    setInspectId(null)
  }, [])

  const startBriefing = useCallback(() => setPhase('briefing'), [])
  const startInvestigation = useCallback(() => setPhase('investigation'), [])

  const collectEvidence = useCallback((id: EvidenceId) => {
    setCollected((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
    setInspectId(id)
  }, [])

  const beginTrial = useCallback(() => {
    if (collected.size < caseData.evidence.length) {
      setFeedback({
        kind: 'info',
        text: '證據尚未蒐集齊全。把監牢各處找一遍再召開審判。',
      })
      return
    }
    setFeedback(null)
    setPhase('trial')
  }, [collected.size, caseData.evidence.length])

  const attemptBreak = useCallback(() => {
    if (!currentStatement || !selectedEvidence) {
      setFeedback({ kind: 'info', text: '先選一份證據，再指出證詞的矛盾。' })
      return
    }
    if (brokenIds.has(currentStatement.id)) return

    if (selectedEvidence === currentStatement.correctEvidenceId) {
      const nextBroken = new Set(brokenIds)
      nextBroken.add(currentStatement.id)
      setBrokenIds(nextBroken)
      setFeedback({ kind: 'success', text: currentStatement.reveal })
      setSelectedEvidence(null)

      if (nextBroken.size >= caseData.statements.length) {
        // stay on last reveal; player advances to accusation
      } else {
        // advance after short beat handled by UI button
      }
    } else {
      const nextMistakes = mistakes + 1
      setMistakes(nextMistakes)
      setFeedback({ kind: 'error', text: currentStatement.wrongHint })
      setSelectedEvidence(null)
      if (nextMistakes >= caseData.maxMistakes) {
        setWon(false)
        setAccusedId(null)
        setPhase('ending')
      }
    }
  }, [
    currentStatement,
    selectedEvidence,
    brokenIds,
    mistakes,
    caseData.statements.length,
    caseData.maxMistakes,
  ])

  const advanceAfterBreak = useCallback(() => {
    if (!currentStatement || !brokenIds.has(currentStatement.id)) return
    if (brokenIds.size >= caseData.statements.length) {
      setFeedback(null)
      setPhase('accusation')
      return
    }
    setFeedback(null)
    setStatementIndex((i) => Math.min(i + 1, caseData.statements.length - 1))
  }, [currentStatement, brokenIds, caseData.statements.length])

  const accuse = useCallback(
    (id: SuspectId) => {
      setAccusedId(id)
      const success = id === caseData.witchId
      setWon(success)
      setPhase('ending')
    },
    [caseData.witchId],
  )

  return {
    caseData,
    phase,
    collected,
    statementIndex,
    currentStatement,
    brokenIds,
    mistakes,
    livesLeft,
    failedByMistakes,
    selectedEvidence,
    feedback,
    accusedId,
    won,
    allBroken,
    progress,
    inspectId,
    setInspectId,
    setSelectedEvidence,
    setFeedback,
    reset,
    startBriefing,
    startInvestigation,
    collectEvidence,
    beginTrial,
    attemptBreak,
    advanceAfterBreak,
    accuse,
  }
}

export type TrialGame = ReturnType<typeof useTrialGame>
