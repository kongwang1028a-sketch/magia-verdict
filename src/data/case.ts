import type { CaseData } from '../game/types'

/** 原創短案：類型致敬，非原作劇情／角色 */
export const caseOne: CaseData = {
  title: '魔女審判模擬',
  subtitle: '第一審 · 祈禱堂的凍結',
  victim: '緋崎 燈',
  location: '孤島監牢 · 東翼祈禱堂',
  timeOfDeath: '約凌晨一時四十分',
  synopsis:
    '十三名「預備魔女」被關進與世隔絕的監牢。今夜，緋崎燈死於祈禱堂——胸口留下凍結的穿刺傷。貓頭鷹敲響鐘，魔女審判開始。你必須用證據撕開謊言，找出真正的魔女。',
  witchId: 'yuki',
  endingTruth:
    '氷室雪在午夜半離開中庭，由祈禱堂外側窗栓以冰霜魔法刺殺緋崎燈，再將月島香織的鈴蘭手帕丟在現場嫁禍。蒼井澪因受威脅而謊報查勤結束時間。窗栓上的霜痕與中斷的靴印，終將真相釘死。',
  endingWrong:
    '處刑台上，被指認者的眼淚並未化為魔女的詛咒。真正的兇手仍混在人群裡——貓頭鷹宣布：審判失敗。下一次，你將沒有第二次機會。',
  maxMistakes: 3,
  evidence: [
    {
      id: 'watch-log',
      name: '值班日誌',
      detail: '蒼井澪的查勤簽名寫到凌晨一時整，並非她口中的「午夜結束」。',
      foundIn: '守衛室桌面',
    },
    {
      id: 'handkerchief',
      name: '鈴蘭手帕',
      detail: '現場血跡旁有一條沾血的鈴蘭香手帕。月島香織的抽屜裡有同款香水與備用手帕。',
      foundIn: '祈禱堂祭壇下',
    },
    {
      id: 'frost-scratch',
      name: '窗栓霜痕',
      detail: '祈禱堂外側窗栓有細密冰霜刮痕，由外向內用力撬過——死者無法從內側造成。',
      foundIn: '祈禱堂東窗外側',
    },
    {
      id: 'boot-prints',
      name: '中庭靴印',
      detail: '氷室雪的靴印只延續到約零時三十分，之後在通往東翼的石徑上消失。',
      foundIn: '中庭積雪',
    },
    {
      id: 'water-flask',
      name: '稀釋血痕瓶',
      detail: '蒼井澪的水壺內壁有被大量清水沖淡的血跡。她承認曾幫忙清洗現場入口，卻否認殺人。',
      foundIn: '澪的牢房',
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
      id: 'kaori',
      name: '月島 香織',
      title: '薔薇的低語',
      magic: '薔薇藤蔓',
      color: '#c45c6a',
      blurb: '語氣柔弱，卻總把「不是我」掛在嘴邊。手帕與她有關，但動機仍不明。',
    },
    {
      id: 'mio',
      name: '蒼井 澪',
      title: '夜勤看守',
      magic: '清流水脈',
      color: '#4a7d8c',
      blurb: '當晚負責查勤。她堅持「什麼都沒看見」，卻在時間點上露出破綻。',
    },
    {
      id: 'yuki',
      name: '氷室 雪',
      title: '凍結的切痕',
      magic: '冰霜穿刺',
      color: '#7eb0c4',
      blurb: '宣稱整夜在中庭練魔法、眾目睽睽。傷口的凍結性質與她的魔法高度相似。',
    },
    {
      id: 'karasu',
      name: '黒羽 鴉',
      title: '影子旁觀者',
      magic: '暗幕隱匿',
      color: '#6b5b73',
      blurb: '幾乎不說話。有人看見她的影子在走廊一閃而過，但沒有直接證據。',
    },
  ],
  statements: [
    {
      id: 's1',
      speakerId: 'mio',
      text: '查勤在午夜就結束了。之後我回房睡覺，整晚什麼都沒看見、也沒聽到。',
      correctEvidenceId: 'watch-log',
      reveal:
        '日誌戳穿了時間謊言——澪至少待到凌晨一時。她低頭承認：有人要她「別多事」。',
      wrongHint: '這份證據無法證明查勤何時結束。再找找與「時間」有關的紀錄。',
    },
    {
      id: 's2',
      speakerId: 'kaori',
      text: '那條鈴蘭手帕不是我的！我從不帶手帕，更不可能出現在祈禱堂。',
      correctEvidenceId: 'handkerchief',
      reveal:
        '同款香水與備用品讓她無法否認手帕的歸屬。但她哭喊：手帕早上還在抽屜裡——被人拿走了。',
      wrongHint: '要拆穿這句話，需要能證明手帕與她之間連結的證物。',
    },
    {
      id: 's3',
      speakerId: 'yuki',
      text: '我整晚都在中庭練魔法，很多人看見。我根本沒靠近過祈禱堂。',
      correctEvidenceId: 'boot-prints',
      reveal:
        '靴印在零時三十分中斷。中庭的「不在場證明」只覆蓋到前半夜——後半夜她消失了。',
      wrongHint: '她強調「整晚都在中庭」。去核對足跡能否支撐這句話。',
    },
    {
      id: 's4',
      speakerId: 'yuki',
      text: '就算有凍結傷口，也可能是燈自己練習失控。外面的人進得了上鎖的祈禱堂嗎？',
      correctEvidenceId: 'frost-scratch',
      reveal:
        '外側窗栓的霜痕證明：攻擊來自屋外，且使用了冰霜系魔法。雪的表情終於裂開。',
      wrongHint: '重點是「能否從外部進入／攻擊」。檢查門窗痕跡。',
    },
  ],
}
