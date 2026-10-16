import { motion } from 'framer-motion'
import type { StoryPackInfo } from '../game/types'

interface Props {
  title: string
  subtitle: string
  stories: StoryPackInfo[]
  activeStoryId: string
  onSelectStory: (id: string) => void
  onStart: () => void
}

export function TitleScreen({
  title,
  subtitle,
  stories,
  activeStoryId,
  onSelectStory,
  onStart,
}: Props) {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-16 text-center">
      <motion.p
        className="mb-4 font-[family-name:var(--font-display)] text-xs tracking-[0.45em] text-[var(--candle)] uppercase"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Manosaba-inspired Trial
      </motion.p>
      <motion.h1
        className="max-w-3xl font-[family-name:var(--font-serif)] text-4xl leading-tight font-bold tracking-wide text-[var(--parchment)] sm:text-6xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="mt-5 max-w-md font-[family-name:var(--font-serif)] text-base text-[var(--parchment-dim)] sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.8 }}
      >
        {subtitle}
      </motion.p>
      <motion.p
        className="mt-8 max-w-lg text-sm leading-relaxed text-[color-mix(in_srgb,var(--parchment)_70%,transparent)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        與櫻羽艾瑪、二階堂希羅一同走過日常、慘案、搜索與審判。可自由切換文本。
      </motion.p>

      <motion.div
        className="ornament-border mt-10 w-full max-w-xl bg-[color-mix(in_srgb,var(--ink-soft)_88%,transparent)] p-4 text-left sm:p-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.5 }}
      >
        <p className="mb-3 text-xs tracking-[0.25em] text-[var(--candle)]">選擇文本</p>
        <div className="grid gap-2">
          {stories.map((s) => {
            const active = s.id === activeStoryId
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectStory(s.id)}
                className={`border px-3 py-3 text-left transition ${
                  active
                    ? 'border-[var(--candle)] bg-[color-mix(in_srgb,var(--candle)_14%,transparent)]'
                    : 'border-[color-mix(in_srgb,var(--parchment)_18%,transparent)] hover:border-[color-mix(in_srgb,var(--blood)_45%,transparent)]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-[family-name:var(--font-serif)] font-medium text-[var(--parchment)]">
                    {s.title}
                  </span>
                  <span className="text-[10px] tracking-wider text-[var(--iron)]">{s.tag}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--parchment-dim)]">{s.subtitle}</p>
                <p className="mt-2 text-xs leading-5 text-[color-mix(in_srgb,var(--parchment)_65%,transparent)]">
                  {s.blurb}
                </p>
              </button>
            )
          })}
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={onStart}
        className="ornament-border accuse-pulse mt-10 bg-[color-mix(in_srgb,var(--blood)_88%,black)] px-10 py-3.5 text-sm tracking-[0.2em] text-[var(--parchment)] transition hover:bg-[var(--blood-bright)]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileTap={{ scale: 0.98 }}
      >
        召開審判
      </motion.button>
      <p className="mt-10 text-[11px] tracking-wider text-[var(--iron)]">
        粉絲向短案 · 角色名取自原作 · 劇情非本篇
      </p>
    </section>
  )
}
