import { DialogueBox } from './DialogueBox'
import type { LoadedTrialGame } from '../game/useTrialGame'

interface Props {
  game: LoadedTrialGame
}

export function EpilogueScreen({ game }: Props) {
  const { caseData, dialogueIndex, advanceDialogue, reset } = game
  const lines = caseData.epilogue
  const finished = lines.length === 0 || dialogueIndex >= lines.length - 1

  return (
    <section className="relative mx-auto flex min-h-dvh max-w-3xl flex-col justify-end px-4 py-10 sm:justify-center sm:px-6">
      <div className="mb-6">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.35em] text-[var(--candle)]">
          EPILOGUE
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-serif)] text-2xl font-bold sm:text-3xl">
          終章 · 剩餘的人們
        </h2>
        <p className="mt-2 text-sm text-[var(--parchment-dim)]">
          審判結束之後——她們仍要在這座島上，把能修好的修好。
        </p>
      </div>

      {lines.length > 0 ? (
        <DialogueBox
          lines={lines}
          index={dialogueIndex}
          caseData={caseData}
          onNext={() => {
            if (!finished) advanceDialogue()
          }}
          footerHint={finished ? '終章結束' : '點擊繼續 ▶'}
        />
      ) : (
        <p className="text-sm text-[var(--parchment-dim)]">（本篇尚無終章文本）</p>
      )}

      {finished && (
        <button
          type="button"
          onClick={reset}
          className="mt-8 self-start bg-[var(--blood)] px-8 py-3 text-sm tracking-[0.18em] transition hover:bg-[var(--blood-bright)]"
        >
          回到標題
        </button>
      )}
    </section>
  )
}
