import { AnimatePresence, motion } from 'framer-motion'
import { DialogueBox } from './DialogueBox'
import type { TrialGame } from '../game/useTrialGame'

interface Props {
  game: TrialGame
}

const spots: { id: TrialGame['caseData']['evidence'][number]['id']; label: string; spot: string }[] =
  [
    { id: 'watch-log', label: '守衛室', spot: 'left-[8%] top-[22%]' },
    { id: 'handkerchief', label: '祈禱堂', spot: 'left-[42%] top-[18%]' },
    { id: 'window-scorch', label: '東窗外側', spot: 'right-[10%] top-[28%]' },
    { id: 'boot-prints', label: '中庭', spot: 'left-[28%] top-[58%]' },
    { id: 'water-flask', label: '蕾雅的牢房', spot: 'right-[22%] top-[62%]' },
    { id: 'chapel-ash', label: '燭架', spot: 'left-[55%] top-[48%]' },
  ]

export function InvestigationScreen({ game }: Props) {
  const {
    caseData,
    collected,
    inspectId,
    collectEvidence,
    closeInspect,
    beginTrial,
    feedback,
    gateLines,
    dialogueIndex,
    dismissGate,
    pendingDiscover,
  } = game
  const inspected = caseData.evidence.find((e) => e.id === inspectId)
  const ready = collected.size >= caseData.evidence.length
  const showGate = gateLines === 'invest'

  return (
    <section className="relative mx-auto min-h-dvh max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] text-[var(--candle)]">
            INVESTIGATION
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-serif)] text-2xl font-bold">
            搜索 · 與希羅同行
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[var(--parchment-dim)]">
            點選地點取得證據。每份證據都會觸發艾瑪與希羅的討論。
          </p>
        </div>
        <p className="text-sm tracking-wider text-[var(--candle)]">
          證據 {collected.size}/{caseData.evidence.length}
        </p>
      </header>

      <div className="ornament-border relative min-h-[22rem] overflow-hidden bg-[linear-gradient(160deg,#1a1014_0%,#0e080a_55%,#151018_100%)] sm:min-h-[26rem]">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_30%_20%,rgba(139,30,45,0.35),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(201,162,39,0.12),transparent_35%)]" />
        <p className="absolute top-4 left-4 text-[11px] tracking-[0.25em] text-[var(--iron)]">
          東翼 · 搜證
        </p>
        {spots.map((spot) => {
          const got = collected.has(spot.id)
          return (
            <button
              key={spot.id}
              type="button"
              disabled={showGate}
              onClick={() => collectEvidence(spot.id)}
              className={`absolute ${spot.spot} -translate-x-1/2 -translate-y-1/2 rounded-sm border px-3 py-2 text-left text-xs transition ${
                got
                  ? 'border-[color-mix(in_srgb,var(--candle)_55%,transparent)] bg-[color-mix(in_srgb,var(--candle)_18%,transparent)] text-[var(--candle)]'
                  : 'border-[color-mix(in_srgb,var(--parchment)_25%,transparent)] bg-[color-mix(in_srgb,var(--ink)_55%,transparent)] text-[var(--parchment)] hover:border-[var(--blood-bright)] hover:bg-[color-mix(in_srgb,var(--blood)_35%,transparent)]'
              }`}
            >
              <span className="block font-medium">{spot.label}</span>
              <span className="mt-0.5 block text-[10px] opacity-70">
                {got ? '已取得' : '尚未搜查'}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {caseData.evidence.map((ev) => {
          const got = collected.has(ev.id)
          return (
            <button
              key={ev.id}
              type="button"
              disabled={!got || showGate}
              onClick={() => collectEvidence(ev.id)}
              className={`ornament-border p-4 text-left transition ${
                got
                  ? 'bg-[color-mix(in_srgb,var(--ink-soft)_90%,transparent)] hover:border-[var(--candle)]'
                  : 'cursor-not-allowed opacity-35'
              }`}
            >
              <p className="text-xs tracking-wider text-[var(--iron)]">{ev.foundIn}</p>
              <p className="mt-1 font-[family-name:var(--font-serif)] font-medium">
                {got ? ev.name : '？？？'}
              </p>
            </button>
          )
        })}
      </div>

      {feedback?.kind === 'info' && (
        <p className="mt-4 text-sm text-[var(--candle)]">{feedback.text}</p>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={beginTrial}
          disabled={!ready || showGate}
          className={`px-8 py-3 text-sm tracking-[0.18em] transition ${
            ready && !showGate
              ? 'bg-[var(--blood)] text-[var(--parchment)] hover:bg-[var(--blood-bright)]'
              : 'cursor-not-allowed bg-[color-mix(in_srgb,var(--iron)_35%,transparent)] text-[var(--iron)]'
          }`}
        >
          {ready ? '進入魔女審判' : '證據未齊'}
        </button>
      </div>

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
                lines={caseData.investigationIntro}
                index={dialogueIndex}
                caseData={caseData}
                onNext={dismissGate}
                footerHint={
                  dialogueIndex < caseData.investigationIntro.length - 1
                    ? '點擊繼續 ▶'
                    : '點擊開始搜證 ▶'
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {inspected && (
          <motion.div
            className="fixed inset-0 z-40 flex items-end justify-center bg-black/65 p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
            >
              <div className="ornament-border mb-3 bg-[var(--ink-soft)] p-5">
                <p className="text-xs tracking-[0.25em] text-[var(--candle)]">EVIDENCE</p>
                <h3 className="mt-2 font-[family-name:var(--font-serif)] text-xl font-bold">
                  {inspected.name}
                </h3>
                <p className="mt-1 text-xs text-[var(--iron)]">發現於：{inspected.foundIn}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--parchment-dim)]">
                  {inspected.detail}
                </p>
              </div>
              {pendingDiscover ? (
                <DialogueBox
                  lines={inspected.discoverLines}
                  index={dialogueIndex}
                  caseData={caseData}
                  onNext={closeInspect}
                  footerHint={
                    dialogueIndex < inspected.discoverLines.length - 1
                      ? '點擊繼續 ▶'
                      : '點擊收起 ▶'
                  }
                />
              ) : (
                <button
                  type="button"
                  className="border border-[color-mix(in_srgb,var(--candle)_35%,transparent)] px-5 py-2 text-sm"
                  onClick={closeInspect}
                >
                  收起
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
