export type Phase =
  | 'title'
  | 'prologue'
  | 'daily'
  | 'incident'
  | 'investigation'
  | 'trial'
  | 'accusation'
  | 'ending'
  | 'epilogue'

export type EvidenceId = string
export type SuspectId = string

export type SpeakerId = string

export interface Evidence {
  id: EvidenceId
  name: string
  detail: string
  foundIn: string
  mapLabel: string
  mapSpot: string
  discoverLines: DialogueLine[]
}

export interface Character {
  id: SpeakerId
  name: string
  title?: string
  magic?: string
  color: string
  blurb?: string
}

export interface Suspect extends Character {
  id: SuspectId
  title: string
  magic: string
  blurb: string
}

export interface DialogueLine {
  speakerId: SpeakerId
  text: string
}

export interface DailyScene {
  id: string
  title: string
  place: string
  summary: string
  spot: string
  lines: DialogueLine[]
  /** key = 進入夜晚前必須探訪；optional = 消耗行動力換筆記 */
  priority?: 'key' | 'optional'
  /** 探訪後寫入推理筆記 */
  note?: string
}

export interface Statement {
  id: string
  speakerId: SuspectId
  text: string
  /** 證詞中必須圈選的矛盾片段 */
  lieToken: string
  correctEvidenceId: EvidenceId
  reveal: DialogueLine[]
  wrongHint: string
  intro: DialogueLine[]
}

export interface CaseData {
  title: string
  subtitle: string
  victim: string
  location: string
  timeOfDeath: string
  synopsis: string
  witchId: SuspectId
  endingTruth: DialogueLine[]
  endingWrong: DialogueLine[]
  /** 正解後：眾人如何收拾殘局、繼續活下去 */
  epilogue: DialogueLine[]
  evidence: Evidence[]
  suspects: Suspect[]
  cast: Character[]
  /** 醒來、抵達、十三人初識 */
  prologue: DialogueLine[]
  dailyScenes: DailyScene[]
  /** 日常最多可探訪幾場（含 key） */
  dailyVisitLimit: number
  incident: DialogueLine[]
  investigationIntro: DialogueLine[]
  trialIntro: DialogueLine[]
  statements: Statement[]
  maxMistakes: number
}

export interface StoryPackInfo {
  id: string
  title: string
  subtitle: string
  blurb: string
  tag: string
}

export interface NotebookEntry {
  id: string
  kind: 'note' | 'evidence'
  title: string
  body: string
}
