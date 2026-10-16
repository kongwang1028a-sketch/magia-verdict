export type Phase =
  | 'title'
  | 'prologue'
  | 'daily'
  | 'incident'
  | 'investigation'
  | 'trial'
  | 'accusation'
  | 'ending'

export type EvidenceId = string
export type SuspectId = string

export type SpeakerId =
  | string
  | 'ema'
  | 'hiro'
  | 'hanna'
  | 'owl'
  | 'narrator'
  | 'system'
  | 'noa'
  | 'miria'
  | 'margo'
  | 'nanoka'
  | 'sherry'
  | 'coco'
  | 'yuki'
  | 'meruru'
  | 'reia'
  | 'arisa'
  | 'anan'

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
}

export interface Statement {
  id: string
  speakerId: SuspectId
  text: string
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

export interface StoryPackInfo {
  id: string
  title: string
  subtitle: string
  blurb: string
  /** 封存舊稿／現行稿等標籤 */
  tag: string
}
