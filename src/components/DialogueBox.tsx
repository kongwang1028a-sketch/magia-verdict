import { AnimatePresence, motion } from 'framer-motion'
import type { CaseData, DialogueLine, SpeakerId } from '../game/types'

interface Props {
  lines: DialogueLine[]
  index: number
  caseData: CaseData
  onNext: () => void
  footerHint?: string
}

function resolveSpeaker(caseData: CaseData, id: SpeakerId) {
  const fromCast = caseData.cast.find((c) => c.id === id)
  if (fromCast) return fromCast
  const fromSuspect = caseData.suspects.find((s) => s.id === id)
  if (fromSuspect) return fromSuspect
  return { id, name: id, color: '#8a8078' }
}

export function DialogueBox({ lines, index, caseData, onNext, footerHint }: Props) {
  const line = lines[index]
  if (!line) return null
  const speaker = resolveSpeaker(caseData, line.speakerId)
  const isNarrator = line.speakerId === 'narrator'
  const progress = `${index + 1} / ${lines.length}`

  return (
    <button
      type="button"
      onClick={onNext}
      className="ornament-border group w-full bg-[color-mix(in_srgb,var(--ink-soft)_94%,transparent)] p-5 text-left sm:p-6"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        {isNarrator ? (
          <p className="text-xs tracking-[0.3em] text-[var(--iron)]">旁白</p>
        ) : (
          <p
            className="font-[family-name:var(--font-serif)] text-sm font-bold tracking-wide"
            style={{ color: speaker.color }}
          >
            {speaker.name}
            {speaker.title ? (
              <span className="ml-2 text-xs font-normal text-[var(--iron)]">{speaker.title}</span>
            ) : null}
          </p>
        )}
        <span className="text-[11px] text-[var(--iron)]">{progress}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={`${index}-${line.text.slice(0, 12)}`}
          className={`min-h-[4.5rem] text-sm leading-8 sm:text-base ${
            isNarrator
              ? 'font-[family-name:var(--font-serif)] text-[var(--parchment-dim)]'
              : 'text-[var(--parchment)]'
          }`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {isNarrator ? line.text : `「${line.text}」`}
        </motion.p>
      </AnimatePresence>
      <p className="mt-4 text-xs tracking-[0.18em] text-[color-mix(in_srgb,var(--candle)_80%,transparent)] group-hover:text-[var(--candle)]">
        {footerHint ?? (index < lines.length - 1 ? '點擊繼續 ▶' : '點擊進入下一步 ▶')}
      </p>
    </button>
  )
}
