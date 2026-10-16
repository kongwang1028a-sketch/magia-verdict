import { useState } from 'react'
import { motion } from 'framer-motion'
import { DialogueBox } from './DialogueBox'
import type { TrialGame } from '../game/useTrialGame'

interface Props {
  game: TrialGame
}

export function EndingScreen({ game }: Props) {
  const { caseData, won, accusedId, failedByMistakes, reset } = game
  const accused = caseData.suspects.find((s) => s.id === accusedId)
  const witch = caseData.suspects.find((s) => s.id === caseData.witchId)
  const lines = won ? caseData.endingTruth : caseData.endingWrong
  const [lineIndex, setLineIndex] = useState(0)
  const finished = lineIndex >= lines.length - 1

  return (
    <section className="relative mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-5 py-14 sm:px-8">
      <motion.div
        className="ornament-border bg-[color-mix(in_srgb,var(--ink-soft)_94%,transparent)] p-6 sm:p-10"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.35em] text-[var(--candle)]">
          {won ? 'TRUE END' : 'BAD END'}
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl font-bold">
          {won ? '魔女已現形' : failedByMistakes ? '異議耗盡' : '誤判'}
        </h2>

        {!failedByMistakes && accused && (
          <p className="mt-4 text-sm text-[var(--parchment-dim)]">
            艾瑪與希羅指認了{' '}
            <span style={{ color: accused.color }} className="font-medium">
              {accused.name}
            </span>
            。
          </p>
        )}

        <div className="mt-6">
          <DialogueBox
            lines={lines}
            index={lineIndex}
            caseData={caseData}
            onNext={() => {
              if (!finished) setLineIndex((i) => i + 1)
            }}
            footerHint={finished ? '結局對話結束' : '點擊繼續 ▶'}
          />
        </div>

        {!won && witch && finished && (
          <p className="mt-4 border-t border-[color-mix(in_srgb,var(--iron)_40%,transparent)] pt-4 text-sm text-[var(--parchment-dim)]">
            真正的魔女是{' '}
            <span style={{ color: witch.color }} className="font-medium">
              {witch.name}
            </span>
            。
          </p>
        )}

        {finished && (
          <button
            type="button"
            onClick={reset}
            className="mt-8 bg-[var(--blood)] px-8 py-3 text-sm tracking-[0.18em] transition hover:bg-[var(--blood-bright)]"
          >
            再審一次
          </button>
        )}
      </motion.div>
    </section>
  )
}
