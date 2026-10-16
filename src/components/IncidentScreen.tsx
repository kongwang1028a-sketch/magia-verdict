import { DialogueBox } from './DialogueBox'
import type { LoadedTrialGame } from '../game/useTrialGame'

interface Props {
  game: LoadedTrialGame
}

export function IncidentScreen({ game }: Props) {
  const { caseData, dialogueIndex, advanceDialogue } = game

  return (
    <section className="relative mx-auto flex min-h-dvh max-w-3xl flex-col justify-end px-4 py-10 sm:justify-center sm:px-6">
      <div className="mb-6">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.35em] text-[var(--blood-bright)]">
          INCIDENT
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-serif)] text-2xl font-bold sm:text-3xl">
          祈禱堂的慘案
        </h2>
        <p className="mt-2 text-sm text-[var(--parchment-dim)]">
          {caseData.victim} · {caseData.timeOfDeath} · {caseData.location}
        </p>
      </div>
      <DialogueBox
        lines={caseData.incident}
        index={dialogueIndex}
        caseData={caseData}
        onNext={advanceDialogue}
        footerHint={
          dialogueIndex < caseData.incident.length - 1 ? '點擊繼續 ▶' : '點擊開始搜索 ▶'
        }
      />
    </section>
  )
}
