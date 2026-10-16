import { motion } from 'framer-motion'

interface Props {
  title: string
  subtitle: string
  onStart: () => void
}

export function TitleScreen({ title, subtitle, onStart }: Props) {
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
        撕開謊言，指出矛盾，把混入少女之中的魔女送上審判台。
      </motion.p>
      <motion.button
        type="button"
        onClick={onStart}
        className="ornament-border accuse-pulse mt-12 bg-[color-mix(in_srgb,var(--blood)_88%,black)] px-10 py-3.5 text-sm tracking-[0.2em] text-[var(--parchment)] transition hover:bg-[var(--blood-bright)]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileTap={{ scale: 0.98 }}
      >
        召開審判
      </motion.button>
      <p className="mt-10 text-[11px] tracking-wider text-[var(--iron)]">
        原創短案 · 類型致敬 · 非原作內容
      </p>
    </section>
  )
}
