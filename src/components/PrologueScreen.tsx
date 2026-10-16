import { DialogueBox } from './DialogueBox'
import type { LoadedTrialGame } from '../game/useTrialGame'

interface Props {
  game: LoadedTrialGame
}

export function PrologueScreen({ game }: Props) {
  const { caseData, dialogueIndex, advanceDialogue } = game

  return (
    <section className="relative mx-auto flex min-h-dvh max-w-3xl flex-col justify-end px-4 py-10 sm:justify-center sm:px-6">
      <div className="mb-6">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.35em] text-[var(--candle)]">
          PROLOGUE
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-serif)] text-2xl font-bold sm:text-3xl">
          魔女島的早晨
        </h2>
        <p className="mt-2 text-sm text-[var(--parchment-dim)]">
          櫻羽艾瑪與二階堂希羅——這一審，由你們揭開謊言。
        </p>
      </div>
      <DialogueBox
        lines={caseData.prologue}
        index={dialogueIndex}
        caseData={caseData}
        onNext={advanceDialogue}
        footerHint={
          dialogueIndex < caseData.prologue.length - 1 ? '點擊繼續 ▶' : '點擊進入日常 ▶'
        }
      />
    </section>
  )
}
