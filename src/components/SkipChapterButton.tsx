interface Props {
  label?: string
  disabled?: boolean
  onClick: () => void
}

export function SkipChapterButton({ label = '跳過本章', disabled, onClick }: Props) {
  if (disabled) return null

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed top-4 right-4 z-50 border border-[color-mix(in_srgb,var(--candle)_40%,transparent)] bg-[color-mix(in_srgb,var(--ink)_82%,transparent)] px-3 py-2 text-xs tracking-[0.18em] text-[var(--parchment-dim)] backdrop-blur-sm transition hover:border-[var(--candle)] hover:text-[var(--candle)]"
    >
      {label}
    </button>
  )
}
