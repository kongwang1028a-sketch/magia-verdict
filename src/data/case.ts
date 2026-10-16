import type { CaseData } from '../game/types'

/** 粉絲向原創短案：使用原作角色名，劇情非原作本篇 */
export const caseOne: CaseData = {
  title: '魔女審判模擬',
  subtitle: '第一審 · 祈禱堂的餘燼',
  victim: '遠野 漢娜',
  location: '魔女島監牢 · 東翼祈禱堂',
  timeOfDeath: '約凌晨一時四十分',
  synopsis:
    '十三名「預備魔女」被關進魔女島監牢。今夜，遠野漢娜死於祈禱堂——身上留下高溫灼傷與焦黑穿刺痕。典獄長貓頭鷹敲響鐘，魔女審判開始。以櫻羽艾瑪的視角蒐證、辯論，揪出真正的魔女。',
  witchId: 'arisa',
  endingTruth:
    '紫藤亞里沙在午夜半離開中庭，由祈禱堂外側窗栓以發火魔法刺殺遠野漢娜，再將氷上梅露露的手帕丟在現場嫁禍。蓮見蕾雅因受威脅而謊報查勤結束時間。窗栓上的焦痕與中斷的靴印，終將真相釘死。',
  endingWrong:
    '處刑台上，被指認者的眼淚並未化為魔女的詛咒。真正的兇手仍混在人群裡——貓頭鷹宣布：審判失敗。下一次，你將沒有第二次機會。',
  maxMistakes: 3,
  evidence: [
    {
      id: 'watch-log',
      name: '值班日誌',
      detail: '蓮見蕾雅的查勤簽名寫到凌晨一時整，並非她口中的「午夜結束」。',
      foundIn: '守衛室桌面',
    },
    {
      id: 'handkerchief',
      name: '沾淚手帕',
      detail: '現場血跡旁有一條還帶淚痕與香水味的手帕。氷上梅露露的抽屜裡有同款備用手帕。',
      foundIn: '祈禱堂祭壇下',
    },
    {
      id: 'window-scorch',
      name: '窗栓焦痕',
      detail: '祈禱堂外側窗栓有高溫燒焦刮痕，由外向內撬過——死者無法從內側造成。',
      foundIn: '祈禱堂東窗外側',
    },
    {
      id: 'boot-prints',
      name: '中庭靴印',
      detail: '紫藤亞里沙的靴印只延續到約零時三十分，之後在通往東翼的石徑上消失。',
      foundIn: '中庭地面',
    },
    {
      id: 'water-flask',
      name: '稀釋血痕瓶',
      detail: '蓮見蕾雅的水壺內壁有被大量清水沖淡的血跡。她承認曾幫忙清洗現場入口，卻否認殺人。',
      foundIn: '蕾雅的牢房',
    },
    {
      id: 'chapel-ash',
      name: '燭台灰燼',
      detail: '祈禱堂燭台燃至將近二時才熄，與死亡時間吻合，兇案發生時堂內仍有微光。',
      foundIn: '祈禱堂燭架',
    },
  ],
  suspects: [
    {
      id: 'meruru',
      name: '氷上 梅露露',
      title: '囚犯 · 治療',
      magic: '治療',
      color: '#c45c6a',
      blurb: '極度膽小、動不動就哭。手帕與她有關，但動機仍不明。',
    },
    {
      id: 'reia',
      name: '蓮見 蕾雅',
      title: '囚犯 · 視線誘導',
      magic: '視線誘導',
      color: '#4a7d8c',
      blurb: '當晚負責查勤。她堅持「什麼都沒看見」，卻在時間點上露出破綻。',
    },
    {
      id: 'arisa',
      name: '紫藤 亞里沙',
      title: '囚犯 · 發火',
      magic: '發火',
      color: '#c45a2a',
      blurb: '宣稱整夜在中庭晃蕩、眾目睽睽。傷口的灼燒性質與她的發火魔法高度相似。',
    },
    {
      id: 'anan',
      name: '夏目 安安',
      title: '囚犯 · 洗腦',
      magic: '洗腦',
      color: '#6b5b73',
      blurb: '幾乎不開口，只用素描本筆談。有人看見她的身影在走廊一閃而過，但沒有直接證據。',
    },
  ],
  statements: [
    {
      id: 's1',
      speakerId: 'reia',
      text: '查勤在午夜就結束了。之後我回房睡覺，整晚什麼都沒看見、也沒聽到。',
      correctEvidenceId: 'watch-log',
      reveal:
        '日誌戳穿了時間謊言——蕾雅至少待到凌晨一時。她低頭承認：有人要她「別多事」。',
      wrongHint: '這份證據無法證明查勤何時結束。再找找與「時間」有關的紀錄。',
    },
    {
      id: 's2',
      speakerId: 'meruru',
      text: '那、那條手帕不是我的！我、我怎麼可能出現在祈禱堂……',
      correctEvidenceId: 'handkerchief',
      reveal:
        '同款備用品讓她無法否認手帕的歸屬。但她哭喊：手帕早上還在抽屜裡——被人拿走了。',
      wrongHint: '要拆穿這句話，需要能證明手帕與她之間連結的證物。',
    },
    {
      id: 's3',
      speakerId: 'arisa',
      text: '哈？我整晚都在中庭好嗎，很多人看見。誰要去那個破祈禱堂啊。',
      correctEvidenceId: 'boot-prints',
      reveal:
        '靴印在零時三十分中斷。中庭的「不在場證明」只覆蓋到前半夜——後半夜她消失了。',
      wrongHint: '她強調「整晚都在中庭」。去核對足跡能否支撐這句話。',
    },
    {
      id: 's4',
      speakerId: 'arisa',
      text: '就算有燒痕，也可能是燭火或漢娜自己搞的。外面的人進得了上鎖的祈禱堂嗎？',
      correctEvidenceId: 'window-scorch',
      reveal:
        '外側窗栓的焦痕證明：攻擊來自屋外，且使用了發火系魔法。亞里沙的表情終於裂開。',
      wrongHint: '重點是「能否從外部進入／攻擊」。檢查門窗痕跡。',
    },
  ],
}
