import { AnimatePresence, motion } from 'framer-motion'
import { DialogueBox } from './DialogueBox'
import type { TrialGame } from '../game/useTrialGame'

interface Props {
  game: TrialGame
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
  } = game

  const active = caseData.dailyScenes.find((s) => s.id === activeDailyId)
  const allDone = visitedDaily.size >= caseData.dailyScenes.length

  return (
    <section className="relative mx-auto min-h-dvh max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] text-[var(--candle)]">
          DAILY LIFE
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-serif)] text-2xl font-bold">
          監牢日常
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--parchment-dim)]">
          點選地點與囚犯交談。聽完所有白天的對話後，夜幕就會降臨。
        </p>
        <p className="mt-3 text-sm text-[var(--candle)]">
          已交談 {visitedDaily.size}/{caseData.dailyScenes.length}
        </p>
      </header>

      <div className="ornament-border relative min-h-[22rem] overflow-hidden bg-[linear-gradient(160deg,#1a1014_0%,#0e080a_55%,#151018_100%)] sm:min-h-[26rem]">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_25%_30%,rgba(232,160,176,0.18),transparent_40%),radial-gradient(circle_at_75%_60%,rgba(201,162,39,0.1),transparent_35%)]" />
        <p className="absolute top-4 left-4 text-[11px] tracking-[0.25em] text-[var(--iron)]">
          白天 · 點選場景
        </p>
        {caseData.dailyScenes.map((scene) => {
          const done = visitedDaily.has(scene.id)
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => openDailyScene(scene.id)}
              className={`absolute ${scene.spot} z-10 -translate-x-1/2 -translate-y-1/2 rounded-sm border px-3 py-2 text-left text-xs transition ${
                done
                  ? 'border-[color-mix(in_srgb,var(--candle)_50%,transparent)] bg-[color-mix(in_srgb,var(--candle)_14%,transparent)] text-[var(--candle)]'
                  : 'border-[color-mix(in_srgb,var(--parchment)_25%,transparent)] bg-[color-mix(in_srgb,var(--ink)_55%,transparent)] text-[var(--parchment)] hover:border-[var(--blood-bright)]'
              }`}
            >
              <span className="block font-medium">{scene.place}</span>
              <span className="mt-0.5 block text-[10px] opacity-75">
                {done ? '已聽完' : scene.summary}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {caseData.dailyScenes.map((scene) => {
          const done = visitedDaily.has(scene.id)
          return (
            <button
              key={`list-${scene.id}`}
              type="button"
              onClick={() => openDailyScene(scene.id)}
              className={`border px-3 py-3 text-left text-sm transition ${
                done
                  ? 'border-[color-mix(in_srgb,var(--candle)_45%,transparent)] text-[var(--candle)]'
                  : 'border-[color-mix(in_srgb,var(--parchment)_20%,transparent)] hover:border-[var(--blood-bright)]'
              }`}
            >
              <span className="font-[family-name:var(--font-serif)] font-medium">{scene.place}</span>
              <span className="mt-1 block text-xs text-[var(--iron)]">
                {done ? '已聽完' : scene.title}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!allDone}
          onClick={finishDaily}
          className={`px-8 py-3 text-sm tracking-[0.18em] transition ${
            allDone
              ? 'bg-[var(--blood)] text-[var(--parchment)] hover:bg-[var(--blood-bright)]'
              : 'cursor-not-allowed bg-[color-mix(in_srgb,var(--iron)_35%,transparent)] text-[var(--iron)]'
          }`}
        >
          {allDone ? '進入夜晚' : '尚有未交談的場景'}
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
