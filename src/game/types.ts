export type Phase =
  | 'title'
  | 'prologue'
  | 'daily'
  | 'incident'
  | 'investigation'
  | 'trial'
  | 'accusation'
  | 'ending'

export type EvidenceId =
  | 'watch-log'
  | 'handkerchief'
  | 'window-scorch'
  | 'boot-prints'
  | 'water-flask'
  | 'chapel-ash'

export type SuspectId = 'meruru' | 'reia' | 'arisa' | 'anan'

export type SpeakerId =
  | SuspectId
  | 'ema'
  | 'hiro'
  | 'hanna'
  | 'owl'
  | 'narrator'
  | 'system'

export interface Evidence {
  id: EvidenceId
  name: string
  detail: string
  foundIn: string
  /** 取得證物時艾瑪／希羅的對話 */
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
}

export interface Statement {
  id: string
  speakerId: SuspectId
  text: string
  correctEvidenceId: EvidenceId
  /** 正確異議後的辯論收束 */
  reveal: DialogueLine[]
  wrongHint: string
  /** 該輪開始前的鋪陳對話 */
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
  evidence: Evidence[]
  suspects: Suspect[]
  cast: Character[]
  prologue: DialogueLine[]
  dailyScenes: DailyScene[]
  incident: DialogueLine[]
  investigationIntro: DialogueLine[]
  trialIntro: DialogueLine[]
  statements: Statement[]
  maxMistakes: number
}
