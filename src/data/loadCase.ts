import type { CaseData, DailyScene, Evidence, Statement } from '../game/types'

export async function loadCase(): Promise<CaseData> {
  const { longStory, storyMeta } = await import('./story/longStory')

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
    dailyScenes: longStory.dailyScenes.map((s) => ({
      ...s,
      lines: [...s.lines],
    })) as DailyScene[],
    incident: [...longStory.incident],
    investigationIntro: [...longStory.investigationIntro],
    evidence: longStory.evidence.map((e) => ({
      ...e,
      discoverLines: [...e.discoverLines],
    })) as Evidence[],
    trialIntro: [...longStory.trialIntro],
    statements: longStory.statements.map((s) => ({
      ...s,
      intro: [...s.intro],
      reveal: [...s.reveal],
    })) as Statement[],
    endingTruth: [...longStory.endingTruth],
    endingWrong: [...longStory.endingWrong],
  }
}
