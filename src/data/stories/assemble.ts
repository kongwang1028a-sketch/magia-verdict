import type { CaseData, DailyScene, Statement } from '../../game/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function assembleCase(bundle: any): CaseData {
  const { longStory, storyMeta } = bundle
  const dailyScenes: DailyScene[] = longStory.dailyScenes.map(
    (s: DailyScene) => ({
      ...s,
      priority: s.priority ?? 'key',
      lines: [...s.lines],
    }),
  )
  const statements: Statement[] = longStory.statements.map((s: Statement) => {
    if (!s.lieToken || !s.text.includes(s.lieToken)) {
      throw new Error(`證詞 ${s.id} 缺少可圈選的矛盾片段 lieToken`)
    }
    return {
      ...s,
      intro: [...s.intro],
      reveal: [...s.reveal],
    }
  })
  const keyCount = dailyScenes.filter((s) => s.priority === 'key').length
  const dailyVisitLimit =
    typeof longStory.dailyVisitLimit === 'number'
      ? longStory.dailyVisitLimit
      : Math.max(keyCount, Math.min(dailyScenes.length, keyCount + 2))

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
    dailyScenes,
    dailyVisitLimit,
    incident: [...longStory.incident],
    investigationIntro: [...longStory.investigationIntro],
    evidence: longStory.evidence.map((e: CaseData['evidence'][number]) => ({
      ...e,
      discoverLines: [...e.discoverLines],
    })),
    trialIntro: [...longStory.trialIntro],
    statements,
    endingTruth: [...longStory.endingTruth],
    endingWrong: [...longStory.endingWrong],
    epilogue: [...(longStory.epilogue ?? [])],
  }
}
