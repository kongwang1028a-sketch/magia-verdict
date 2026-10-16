export type Phase =
  | 'title'
  | 'briefing'
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

export interface Evidence {
  id: EvidenceId
  name: string
  detail: string
  foundIn: string
}

export interface Suspect {
  id: SuspectId
  name: string
  title: string
  magic: string
  color: string
  blurb: string
}

export interface Statement {
  id: string
  speakerId: SuspectId
  text: string
  /** Evidence that correctly breaks this statement */
  correctEvidenceId: EvidenceId
  /** Shown after a correct break */
  reveal: string
  /** Wrong evidence responses */
  wrongHint: string
}

export interface CaseData {
  title: string
  subtitle: string
  victim: string
  location: string
  timeOfDeath: string
  synopsis: string
  witchId: SuspectId
  endingTruth: string
  endingWrong: string
  evidence: Evidence[]
  suspects: Suspect[]
  statements: Statement[]
  maxMistakes: number
}
