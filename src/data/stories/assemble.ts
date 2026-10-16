import type { CaseData } from '../../game/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function assembleCase(bundle: any): CaseData {
  const { longStory, storyMeta } = bundle
  return {
    title: storyMeta.title,
    subtitle: storyMeta.subtitle,
    victim: storyMeta.victim,
    location: storyMeta.location,
    timeOfDeath: storyMeta.timeOfDeath,
    synopsis: storyMeta.synopsis,
    witchId: storyMeta.witchId,
    maxMistakes: storyMeta.maxMistakes,
    cast: [...storyMeta.cast],
    suspects: [...storyMeta.suspects],
    prologue: [...longStory.prologue],
    dailyScenes: longStory.dailyScenes.map((s: CaseData['dailyScenes'][number]) => ({
      ...s,
      lines: [...s.lines],
    })),
    incident: [...longStory.incident],
    investigationIntro: [...longStory.investigationIntro],
    evidence: longStory.evidence.map((e: CaseData['evidence'][number]) => ({
      ...e,
      discoverLines: [...e.discoverLines],
    })),
    trialIntro: [...longStory.trialIntro],
    statements: longStory.statements.map((s: CaseData['statements'][number]) => ({
      ...s,
      intro: [...s.intro],
      reveal: [...s.reveal],
    })),
    endingTruth: [...longStory.endingTruth],
    endingWrong: [...longStory.endingWrong],
  }
}
