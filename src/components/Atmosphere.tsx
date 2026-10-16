export function Atmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="bg-bars absolute inset-0" />
      <div className="candle-glow absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.22),transparent_70%)]" />
      <div className="candle-glow absolute bottom-0 left-[12%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(139,30,45,0.25),transparent_70%)] [animation-delay:1.1s]" />
      <div className="candle-glow absolute right-[10%] bottom-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(126,176,196,0.12),transparent_70%)] [animation-delay:2s]" />
      <div className="drift absolute top-[18%] left-[8%] h-2 w-2 rounded-full bg-[color-mix(in_srgb,var(--parchment)_35%,transparent)]" />
      <div className="drift absolute top-[28%] right-[14%] h-1.5 w-1.5 rounded-full bg-[color-mix(in_srgb,var(--candle)_40%,transparent)] [animation-delay:1.4s]" />
      <div className="drift absolute top-[55%] left-[22%] h-1 w-1 rounded-full bg-[color-mix(in_srgb,var(--parchment)_25%,transparent)] [animation-delay:2.6s]" />
    </div>
  )
}
