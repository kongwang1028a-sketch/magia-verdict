import { AnimatePresence, motion } from 'framer-motion'
import { DialogueBox } from './DialogueBox'
import type { LoadedTrialGame } from '../game/useTrialGame'

interface Props {
  game: LoadedTrialGame
}

export function DailyScreen({ game }: Props) {
  const {
    caseData,
    visitedDaily,
    activeDailyId,
    dialogueIndex,
    openDailyScene,
    closeDailyScene,
    advanceDialogue,
    finishDaily,
    keyDailyDone,
    visitsRemaining,
    feedback,
  } = game

  const active = caseData.dailyScenes.find((s) => s.id === activeDailyId)
  const day1 = caseData.dailyScenes.filter((s) => s.id.startsWith('d1-'))
  const day2 = caseData.dailyScenes.filter((s) => s.id.startsWith('d2-'))
  const keyTotal = caseData.dailyScenes.filter((s) => (s.priority ?? 'key') === 'key').length
  const keyDone = caseData.dailyScenes.filter(
    (s) => (s.priority ?? 'key') === 'key' && visitedDaily.has(s.id),
  ).length

  return (
    <section className="relative mx-auto min-h-dvh max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] text-[var(--candle)]">
          DAILY LIFE
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-serif)] text-2xl font-bold">
          監牢日常 · 限次探訪
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--parchment-dim)]">
          行動力有限：標「關鍵」的地點必須探訪才能進入夜晚；其餘為選修，可換取推理筆記。已探訪過的場景可重聽，不消耗次數。
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--candle)]">
          <span>
            行動力剩餘 {visitsRemaining}/{caseData.dailyVisitLimit}
          </span>
          <span>
            關鍵 {keyDone}/{keyTotal}
          </span>
          <span>
            已探訪 {visitedDaily.size}
          </span>
        </div>
      </header>

      <DaySection
        label="第一日"
        scenes={day1}
        visitedDaily={visitedDaily}
        visitsRemaining={visitsRemaining}
        visitLimit={caseData.dailyVisitLimit}
        onOpen={openDailyScene}
      />
      <DaySection
        label="第二日"
        scenes={day2}
        visitedDaily={visitedDaily}
        visitsRemaining={visitsRemaining}
        visitLimit={caseData.dailyVisitLimit}
        onOpen={openDailyScene}
        className="mt-6"
      />

      {feedback?.kind === 'info' && (
        <p className="mt-4 text-sm text-[var(--candle)]">{feedback.text}</p>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!keyDailyDone}
          onClick={finishDaily}
          className={`px-8 py-3 text-sm tracking-[0.18em] transition ${
            keyDailyDone
              ? 'bg-[var(--blood)] text-[var(--parchment)] hover:bg-[var(--blood-bright)]'
              : 'cursor-not-allowed bg-[color-mix(in_srgb,var(--iron)_35%,transparent)] text-[var(--iron)]'
          }`}
        >
          {keyDailyDone ? '進入夜晚' : '尚有關鍵地點未探訪'}
        </button>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-40 flex items-end justify-center bg-black/70 p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
            >
              <p className="mb-3 font-[family-name:var(--font-serif)] text-lg font-bold">
                {active.title}
                <span className="ml-2 text-sm font-normal text-[var(--iron)]">{active.place}</span>
                {(active.priority ?? 'key') === 'key' ? (
                  <span className="ml-2 text-xs tracking-wider text-[var(--blood-bright)]">關鍵</span>
                ) : (
                  <span className="ml-2 text-xs tracking-wider text-[var(--candle)]">選修</span>
                )}
              </p>
              <DialogueBox
                lines={active.lines}
                index={dialogueIndex}
                caseData={caseData}
                onNext={() => {
                  if (dialogueIndex >= active.lines.length - 1) closeDailyScene()
                  else advanceDialogue()
                }}
                footerHint={
                  dialogueIndex < active.lines.length - 1 ? '點擊繼續 ▶' : '點擊結束對話 ▶'
                }
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function DaySection({
  label,
  scenes,
  visitedDaily,
  visitsRemaining,
  visitLimit,
  onOpen,
  className = '',
}: {
  label: string
  scenes: LoadedTrialGame['caseData']['dailyScenes']
  visitedDaily: Set<string>
  visitsRemaining: number
  visitLimit: number
  onOpen: (id: string) => void
  className?: string
}) {
  const doneCount = scenes.filter((s) => visitedDaily.has(s.id)).length
  return (
    <div className={className}>
      <div className="mb-3 flex items-end justify-between gap-2">
        <h3 className="font-[family-name:var(--font-serif)] text-lg font-bold text-[var(--parchment)]">
          {label}
        </h3>
        <p className="text-xs text-[var(--iron)]">
          {doneCount}/{scenes.length}
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {scenes.map((scene) => {
          const done = visitedDaily.has(scene.id)
          const isKey = (scene.priority ?? 'key') === 'key'
          const locked = !done && visitsRemaining <= 0
          return (
            <button
              key={scene.id}
              type="button"
              disabled={locked}
              onClick={() => onOpen(scene.id)}
              className={`ornament-border p-4 text-left transition ${
                done
                  ? 'border-[color-mix(in_srgb,var(--candle)_45%,transparent)] text-[var(--candle)]'
                  : locked
                    ? 'cursor-not-allowed opacity-45'
                    : 'hover:border-[var(--blood-bright)]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs tracking-wider text-[var(--iron)]">{scene.place}</p>
                <span
                  className={`text-[10px] tracking-wider ${
                    isKey ? 'text-[var(--blood-bright)]' : 'text-[var(--candle)]'
                  }`}
                >
                  {isKey ? '關鍵' : '選修'}
                </span>
              </div>
              <p className="mt-1 font-[family-name:var(--font-serif)] font-medium">{scene.title}</p>
              <p className="mt-2 text-xs leading-5 text-[var(--parchment-dim)]">
                {done
                  ? '已聽完 · 可重聽'
                  : locked
                    ? `行動力已用盡（上限 ${visitLimit}）`
                    : scene.summary}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
