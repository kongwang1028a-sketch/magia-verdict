import { AnimatePresence, motion } from 'framer-motion'
import type { TrialGame } from '../game/useTrialGame'

interface Props {
  game: TrialGame
}

export function TrialScreen({ game }: Props) {
  const {
    caseData,
    currentStatement,
    brokenIds,
    selectedEvidence,
    setSelectedEvidence,
    attemptBreak,
    advanceAfterBreak,
    feedback,
    livesLeft,
    collected,
    statementIndex,
  } = game

  if (!currentStatement) return null

  const speaker = caseData.suspects.find((s) => s.id === currentStatement.speakerId)
  const isBroken = brokenIds.has(currentStatement.id)
  const collectedList = caseData.evidence.filter((e) => collected.has(e.id))

  return (
    <section className="relative mx-auto min-h-dvh max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] text-[var(--candle)]">
            WITCH TRIAL
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-serif)] text-2xl font-bold">
            辯論 · 第 {statementIndex + 1} / {caseData.statements.length} 輪
          </h2>
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
        <blockquote className="mt-5 border-l-2 border-[color-mix(in_srgb,var(--candle)_40%,transparent)] pl-4 font-[family-name:var(--font-serif)] text-base leading-8 text-[var(--parchment)] sm:text-lg">
          「{currentStatement.text}」
        </blockquote>
      </motion.div>

      <div className="mt-6">
        <p className="mb-3 text-sm text-[var(--parchment-dim)]">
          選擇能指出矛盾的證據，然後按下「異議」。
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
                <span className="font-[family-name:var(--font-serif)] font-medium">{ev.name}</span>
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
            {brokenIds.size >= caseData.statements.length ? '進入最終指認' : '下一輪證詞'}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {feedback && (
          <motion.div
            key={feedback.text}
            className={`mt-5 ornament-border p-4 text-sm leading-7 ${
              feedback.kind === 'success'
                ? 'border-[color-mix(in_srgb,var(--candle)_50%,transparent)] text-[var(--parchment)]'
                : feedback.kind === 'error'
                  ? 'border-[color-mix(in_srgb,var(--blood-bright)_55%,transparent)] text-[color-mix(in_srgb,var(--parchment)_90%,var(--blood-bright))]'
                  : 'text-[var(--parchment-dim)]'
            }`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-xs tracking-[0.2em] text-[var(--candle)]">
              {feedback.kind === 'success' ? '矛盾成立' : feedback.kind === 'error' ? '異議失敗' : '提示'}
            </p>
            <p className="mt-2">{feedback.text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
