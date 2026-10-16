import { motion } from 'framer-motion'
import type { CaseData } from '../game/types'

interface Props {
  caseData: CaseData
  onContinue: () => void
}

export function BriefingScreen({ caseData, onContinue }: Props) {
  return (
    <section className="relative mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-5 py-14 sm:px-8">
      <motion.div
        className="ornament-border bg-[color-mix(in_srgb,var(--ink-soft)_92%,transparent)] p-6 sm:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.35em] text-[var(--candle)]">
          CASE FILE
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-serif)] text-2xl font-bold sm:text-3xl">
          {caseData.subtitle}
        </h2>
        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[var(--iron)]">死者</dt>
            <dd className="mt-1 text-[var(--parchment)]">{caseData.victim}</dd>
          </div>
          <div>
            <dt className="text-[var(--iron)]">推定死亡時間</dt>
            <dd className="mt-1 text-[var(--parchment)]">{caseData.timeOfDeath}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[var(--iron)]">現場</dt>
            <dd className="mt-1 text-[var(--parchment)]">{caseData.location}</dd>
          </div>
        </dl>
        <p className="mt-6 text-sm leading-8 text-[color-mix(in_srgb,var(--parchment)_85%,transparent)]">
          {caseData.synopsis}
        </p>
        <button
          type="button"
          onClick={onContinue}
          className="mt-8 w-full border border-[color-mix(in_srgb,var(--candle)_40%,transparent)] bg-[color-mix(in_srgb,var(--blood)_75%,black)] py-3 text-sm tracking-[0.18em] transition hover:bg-[var(--blood-bright)] sm:w-auto sm:px-8"
        >
          開始蒐證
        </button>
      </motion.div>
    </section>
  )
}
