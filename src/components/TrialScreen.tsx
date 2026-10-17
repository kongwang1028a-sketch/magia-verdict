import { AnimatePresence, motion } from 'framer-motion'
import { DialogueBox } from './DialogueBox'
import { splitStatementTokens } from '../game/statementTokens'
import type { LoadedTrialGame } from '../game/useTrialGame'

interface Props {
  game: LoadedTrialGame
}

export function TrialScreen({ game }: Props) {
  const {
    caseData,
    currentStatement,
    brokenIds,
    selectedEvidence,
    setSelectedEvidence,
    selectedLieToken,
    setSelectedLieToken,
    attemptBreak,
    advanceAfterBreak,
    feedback,
    revealLineIndex,
    livesLeft,
    collected,
    statementIndex,
    gateLines,
    dialogueIndex,
    dismissGate,
  } = game

  if (!currentStatement) return null

  const speaker = caseData.suspects.find((s) => s.id === currentStatement.speakerId)
  const isBroken = brokenIds.has(currentStatement.id)
  const collectedList = caseData.evidence.filter((e) => collected.has(e.id))
  const showGate = gateLines === 'trial'
  const showIntro = !showGate && !isBroken && !feedback
  const revealLine = isBroken ? currentStatement.reveal[revealLineIndex] : null
  const tokens = splitStatementTokens(currentStatement.text, currentStatement.lieToken)

  return (
    <section className="relative mx-auto min-h-dvh max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] text-[var(--candle)]">
            WITCH TRIAL
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-serif)] text-2xl font-bold">
            審判辯論 · 第 {statementIndex + 1} / {caseData.statements.length} 輪
          </h2>
          <p className="mt-1 text-xs text-[var(--parchment-dim)]">
            先圈選矛盾句 → 再出示證據 → 異議
          </p>
        </div>
        <div className="flex items-center gap-2" aria-label={`剩餘容錯 ${livesLeft}`}>
          {Array.from({ length: caseData.maxMistakes }).map((_, i) => (
            <span
              key={i}
              className={`h-2.5 w-2.5 rounded-full ${
                i < livesLeft ? 'bg-[var(--blood-bright)]' : 'bg-[var(--iron)] opacity-40'
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-[var(--parchment-dim)]">容錯</span>
        </div>
      </header>

      {!showGate && (
        <>
          {showIntro && currentStatement.intro.length > 0 && (
            <div className="mb-4 space-y-2">
              {currentStatement.intro.map((line, i) => {
                const sp =
                  caseData.cast.find((c) => c.id === line.speakerId) ??
                  caseData.suspects.find((s) => s.id === line.speakerId)
                return (
                  <p key={i} className="text-sm leading-7 text-[var(--parchment-dim)]">
                    <span style={{ color: sp?.color }} className="font-medium">
                      {sp?.name ?? ''}
                    </span>
                    ：{line.text}
                  </p>
                )
              })}
            </div>
          )}

          <motion.div
            key={currentStatement.id}
            className="ornament-border relative overflow-hidden bg-[color-mix(in_srgb,var(--ink-soft)_94%,transparent)] p-5 sm:p-8"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div
              className="absolute top-0 left-0 h-full w-1"
              style={{ background: speaker?.color ?? 'var(--candle)' }}
            />
            <p className="text-xs tracking-wider text-[var(--iron)]">{speaker?.title}</p>
            <h3
              className="mt-1 font-[family-name:var(--font-serif)] text-xl font-bold"
              style={{ color: speaker?.color }}
            >
              {speaker?.name}
            </h3>
            <p className="mt-4 text-xs tracking-wider text-[var(--candle)]">
              點擊圈選你認為矛盾的片段
            </p>
            <blockquote className="mt-3 border-l-2 border-[color-mix(in_srgb,var(--candle)_40%,transparent)] pl-4 font-[family-name:var(--font-serif)] text-base leading-8 text-[var(--parchment)] sm:text-lg">
              「
              {tokens.map((token, i) => {
                const active = selectedLieToken === token
                return (
                  <button
                    key={`${i}-${token}`}
                    type="button"
                    disabled={isBroken}
                    onClick={() => setSelectedLieToken(token)}
                    className={`mx-0.5 inline rounded-sm px-1 py-0.5 text-left transition ${
                      active
                        ? 'bg-[color-mix(in_srgb,var(--blood)_55%,transparent)] text-[var(--parchment)] underline decoration-2'
                        : 'hover:bg-[color-mix(in_srgb,var(--candle)_22%,transparent)] hover:underline'
                    } ${isBroken ? 'cursor-default opacity-80' : ''}`}
                  >
                    {token}
                  </button>
                )
              })}
              」
            </blockquote>
            {selectedLieToken && !isBroken && (
              <p className="mt-3 text-xs text-[var(--candle)]">
                已圈選：「{selectedLieToken}」
              </p>
            )}
          </motion.div>

          <div className="mt-6">
            <p className="mb-3 text-sm text-[var(--parchment-dim)]">
              選擇能指出矛盾的證據，然後讓艾瑪喊出「異議」。
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {collectedList.map((ev) => {
                const active = selectedEvidence === ev.id
                return (
                  <button
                    key={ev.id}
                    type="button"
                    disabled={isBroken}
                    onClick={() => setSelectedEvidence(ev.id)}
                    className={`border px-3 py-3 text-left text-sm transition ${
                      active
                        ? 'border-[var(--candle)] bg-[color-mix(in_srgb,var(--candle)_16%,transparent)]'
                        : 'border-[color-mix(in_srgb,var(--parchment)_18%,transparent)] bg-[color-mix(in_srgb,var(--ink)_40%,transparent)] hover:border-[color-mix(in_srgb,var(--blood)_50%,transparent)]'
                    } ${isBroken ? 'opacity-50' : ''}`}
                  >
                    <span className="font-[family-name:var(--font-serif)] font-medium">
                      {ev.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {!isBroken ? (
              <button
                type="button"
                onClick={attemptBreak}
                className="bg-[var(--blood)] px-8 py-3 text-sm tracking-[0.25em] text-[var(--parchment)] transition hover:bg-[var(--blood-bright)]"
              >
                異議！
              </button>
            ) : (
              <button
                type="button"
                onClick={advanceAfterBreak}
                className="border border-[var(--candle)] px-8 py-3 text-sm tracking-[0.18em] text-[var(--candle)] transition hover:bg-[color-mix(in_srgb,var(--candle)_12%,transparent)]"
              >
                {revealLineIndex < currentStatement.reveal.length - 1
                  ? '繼續對話 ▶'
                  : brokenIds.size >= caseData.statements.length
                    ? '進入最終指認'
                    : '下一輪證詞'}
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {feedback?.kind === 'error' && (
              <motion.div
                key={feedback.text}
                className="ornament-border mt-5 border-[color-mix(in_srgb,var(--blood-bright)_55%,transparent)] p-4 text-sm leading-7"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-xs tracking-[0.2em] text-[var(--blood-bright)]">異議失敗</p>
                <p className="mt-2 text-[var(--parchment)]">希羅：{feedback.text}</p>
              </motion.div>
            )}
            {feedback?.kind === 'success' && revealLine && (
              <motion.div
                key={`${revealLineIndex}-${revealLine.text}`}
                className="ornament-border mt-5 p-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-xs tracking-[0.2em] text-[var(--candle)]">矛盾成立</p>
                {(() => {
                  const sp =
                    caseData.cast.find((c) => c.id === revealLine.speakerId) ??
                    caseData.suspects.find((s) => s.id === revealLine.speakerId)
                  return (
                    <p className="mt-2 text-sm leading-7">
                      <span style={{ color: sp?.color }} className="font-medium">
                        {sp?.name}
                      </span>
                      ：{revealLine.text}
                    </p>
                  )
                })()}
              </motion.div>
            )}
            {feedback?.kind === 'info' && (
              <p className="mt-4 text-sm text-[var(--candle)]">{feedback.text}</p>
            )}
          </AnimatePresence>
        </>
      )}

      <AnimatePresence>
        {showGate && (
          <motion.div
            className="fixed inset-0 z-40 flex items-end justify-center bg-black/70 p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-full max-w-2xl">
              <DialogueBox
                lines={caseData.trialIntro}
                index={dialogueIndex}
                caseData={caseData}
                onNext={dismissGate}
                footerHint={
                  dialogueIndex < caseData.trialIntro.length - 1
                    ? '點擊繼續 ▶'
                    : '點擊開始辯論 ▶'
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
