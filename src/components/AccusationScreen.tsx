import { motion } from 'framer-motion'
import type { TrialGame } from '../game/useTrialGame'

interface Props {
  game: TrialGame
}

export function AccusationScreen({ game }: Props) {
  const { caseData, accuse } = game
  const ema = caseData.cast.find((c) => c.id === 'ema')
  const hiro = caseData.cast.find((c) => c.id === 'hiro')

  return (
    <section className="relative mx-auto flex min-h-dvh max-w-4xl flex-col justify-center px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.35em] text-[var(--candle)]">
          FINAL VOTE
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl font-bold">
          指認魔女
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--parchment-dim)]">
          <span style={{ color: hiro?.color }}>希羅</span>
          ：把票投給證據指向的那個人。
          <span style={{ color: ema?.color }}> 艾瑪</span>
          ：……我選好了。為了漢娜小姐。
        </p>
      </motion.div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {caseData.suspects.map((s, i) => (
          <motion.button
            key={s.id}
            type="button"
            onClick={() => accuse(s.id)}
            className="ornament-border group bg-[color-mix(in_srgb,var(--ink-soft)_92%,transparent)] p-5 text-left transition hover:border-[var(--blood-bright)]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.45 }}
            whileTap={{ scale: 0.985 }}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-10 w-10 shrink-0 rounded-full border border-[color-mix(in_srgb,var(--parchment)_20%,transparent)]"
                style={{
                  background: `radial-gradient(circle at 35% 30%, ${s.color}, #1a1014 70%)`,
                }}
              />
              <div>
                <p className="text-xs text-[var(--iron)]">{s.title}</p>
                <p
                  className="font-[family-name:var(--font-serif)] text-lg font-bold"
                  style={{ color: s.color }}
                >
                  {s.name}
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs tracking-wider text-[var(--candle-dim)]">魔法：{s.magic}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--parchment-dim)]">{s.blurb}</p>
            <p className="mt-4 text-xs tracking-[0.2em] text-[var(--blood-bright)] opacity-0 transition group-hover:opacity-100">
              與希羅一同投票 →
            </p>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
