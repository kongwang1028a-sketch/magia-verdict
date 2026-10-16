import type { CaseData } from '../game/types'

/** 粉絲向短案：角色名取自原作；劇情非本篇 */
export const caseOne: CaseData = {
  title: '魔女審判模擬',
  subtitle: '第一審 · 祈禱堂的餘燼',
  victim: '遠野 漢娜',
  location: '魔女島監牢 · 東翼祈禱堂',
  timeOfDeath: '約凌晨一時四十分',
  synopsis:
    '十三名預備魔女被關進魔女島監牢。遠野漢娜死於祈禱堂——身上留下高溫灼傷。典獄長召開魔女審判，櫻羽艾瑪與二階堂希羅必須揪出真正的魔女。',
  witchId: 'arisa',
  maxMistakes: 3,

  cast: [
    { id: 'ema', name: '櫻羽 艾瑪', title: '預備魔女', color: '#e8a0b0' },
    { id: 'hiro', name: '二階堂 希羅', title: '預備魔女', color: '#d4c4a8' },
    { id: 'hanna', name: '遠野 漢娜', title: '預備魔女', magic: '浮遊', color: '#c9b07a' },
    { id: 'owl', name: '典獄長', title: '貓頭鷹', color: '#c9a227' },
    { id: 'narrator', name: '', color: '#8a8078' },
    { id: 'system', name: '系統', color: '#5c6670' },
  ],

  suspects: [
    {
      id: 'meruru',
      name: '氷上 梅露露',
      title: '預備魔女 · 治療',
      magic: '治療',
      color: '#c45c6a',
      blurb: '極度膽小。現場手帕與她有關，但她堅持自己整晚都在哭著睡覺。',
    },
    {
      id: 'reia',
      name: '蓮見 蕾雅',
      title: '預備魔女 · 視線誘導',
      magic: '視線誘導',
      color: '#4a7d8c',
      blurb: '當晚負責查勤。她說「什麼都沒看見」，時間點卻對不上。',
    },
    {
      id: 'arisa',
      name: '紫藤 亞里沙',
      title: '預備魔女 · 發火',
      magic: '發火',
      color: '#c45a2a',
      blurb: '宣稱整夜待在中庭。傷口的灼燒性質與發火魔法高度相似。',
    },
    {
      id: 'anan',
      name: '夏目 安安',
      title: '預備魔女 · 洗腦',
      magic: '洗腦',
      color: '#6b5b73',
      blurb: '幾乎不開口，只用素描本筆談。走廊曾閃過她的身影。',
    },
  ],

  prologue: [
    {
      speakerId: 'narrator',
      text: '魔女島監牢。與世隔絕的石牆裡，十三名被認定「可能成為魔女」的少女過著囚犯生活。',
    },
    {
      speakerId: 'ema',
      text: '唔……早安。今天也要點名、吃飯、然後……繼續當囚犯，對吧。',
    },
    {
      speakerId: 'hiro',
      text: '艾瑪。別一副「習慣就好」的臉。這裡的每一條規則，都可能要人命。',
    },
    {
      speakerId: 'ema',
      text: '我、我知道啦希羅……只是如果不笑一下，我會先被自己嚇垮。',
    },
    {
      speakerId: 'hiro',
      text: '……哼。至少把耳朵豎起來。昨晚中庭那邊，亞里沙又在亂發火玩。',
    },
    {
      speakerId: 'ema',
      text: '欸？不會燒到人吧？漢娜小姐不是最討厭髒兮兮的地方……',
    },
    {
      speakerId: 'hiro',
      text: '所以我們今天多走動、多聽。有什麼不對勁，我不會放過。',
    },
    {
      speakerId: 'narrator',
      text: '——日常開始。與其他囚犯交談，收集「氣氛」與「關係」。夜幕降臨後，事件就會發生。',
    },
  ],

  dailyScenes: [
    {
      id: 'dining',
      title: '食堂的閒話',
      place: '食堂',
      summary: '與漢娜、梅露露一道用早餐',
      spot: 'left-[12%] top-[30%]',
      lines: [
        {
          speakerId: 'hanna',
          text: '真是的，這食堂的餐具也太寒酸了吧？本小姐在家用的可是銀器——咳、是、是風格問題！',
        },
        {
          speakerId: 'meruru',
          text: '對、對不起漢娜小姐……我、我把湯灑到桌子上了……嗚……',
        },
        {
          speakerId: 'ema',
          text: '沒、沒關係梅露露！我幫你擦——啊，手帕借我一下？',
        },
        {
          speakerId: 'meruru',
          text: '這、這條是我媽媽給的……請、請務必還給我……晚上我要抱著才能睡……',
        },
        {
          speakerId: 'hiro',
          text: '漢娜。你今晚還要去祈禱堂「靜心」嗎？上次你差點在走廊迷路。',
        },
        {
          speakerId: 'hanna',
          text: '那叫散步！本小姐的浮遊魔法，可是很高雅的——才不會迷路呢。',
        },
        {
          speakerId: 'ema',
          text: '（漢娜今晚可能會去祈禱堂……梅露露的手帕對她很重要呢。）',
        },
      ],
    },
    {
      id: 'courtyard',
      title: '中庭的火花',
      place: '中庭',
      summary: '亞里沙練發火，安安在角落素描',
      spot: 'right-[18%] top-[28%]',
      lines: [
        {
          speakerId: 'arisa',
          text: '喂喂，離遠點！本大爷——呸，本姑娘正爽著呢。火，就是要燒得漂亮！',
        },
        {
          speakerId: 'hiro',
          text: '亞里沙。監牢禁止「無意義的破壞」。你再把石磚燒裂，典獄長不會當沒看見。',
        },
        {
          speakerId: 'arisa',
          text: '哈？關你什麼事，大小姐。我整晚待在這兒燒，總比躲房裡哭強吧？',
        },
        {
          speakerId: 'ema',
          text: '整、整晚？晚上中庭很冷耶……你不回牢房嗎？',
        },
        {
          speakerId: 'arisa',
          text: '回什麼回。牢房悶死了。愛看不看。',
        },
        {
          speakerId: 'anan',
          text: '…………（素描本上寫：火很吵。漢娜說今晚要去東翼。）',
        },
        {
          speakerId: 'hiro',
          text: '安安也聽到了嗎……漢娜去東翼。記住了，艾瑪。',
        },
      ],
    },
    {
      id: 'guard',
      title: '查勤的約定',
      place: '守衛室前',
      summary: '蕾雅接下今夜夜勤',
      spot: 'left-[40%] top-[58%]',
      lines: [
        {
          speakerId: 'reia',
          text: '今晚的查勤由我負責。大家乖乖待在房裡，有異狀就叫我。',
        },
        {
          speakerId: 'ema',
          text: '蕾雅好可靠……希羅，我們是不是也該幫忙？',
        },
        {
          speakerId: 'hiro',
          text: '囚犯沒有「協助看守」的義務。不過——蕾雅，午夜之後你也會繼續巡嗎？',
        },
        {
          speakerId: 'reia',
          text: '按規定會簽到至凌晨。別擔心，視線誘導在暗處也很好用……開玩笑的。',
        },
        {
          speakerId: 'hiro',
          text: '別開玩笑。有人出事時，時間紀錄就是命。',
        },
        {
          speakerId: 'reia',
          text: '……我知道。我會認真寫日誌。',
        },
        {
          speakerId: 'ema',
          text: '（蕾雅看起來很有責任感。可是希羅的表情……總覺得她在擔心什麼。）',
        },
      ],
    },
    {
      id: 'chapel-day',
      title: '祈禱堂的午後',
      place: '東翼祈禱堂',
      summary: '漢娜邀艾瑪「今晚再來」',
      spot: 'right-[38%] top-[62%]',
      lines: [
        {
          speakerId: 'hanna',
          text: '這裡的彩窗還算體面嘛。本小姐晚上會再來——月光比較適合浮遊。',
        },
        {
          speakerId: 'ema',
          text: '一個人？會不會危險……要不要叫我們一起？',
        },
        {
          speakerId: 'hanna',
          text: '哼，才不要。兩人同行很掃興。對了，窗戶那邊風很大，別亂碰窗栓。',
        },
        {
          speakerId: 'hiro',
          text: '窗栓……從外側也能碰到嗎？',
        },
        {
          speakerId: 'hanna',
          text: '誰知道？本小姐又不是工匠。好了，晚上見——不，不見也沒關係！',
        },
        {
          speakerId: 'ema',
          text: '漢娜小姐——啊，走掉了。希羅，我們晚上要不要偷偷來看一眼？',
        },
        {
          speakerId: 'hiro',
          text: '……若真出事，後悔也來不及。先把白天該聽的話聽完。',
        },
      ],
    },
  ],

  incident: [
    {
      speakerId: 'narrator',
      text: '夜。石牆外的風像刀。東翼祈禱堂的燭火，在某一個瞬間猛地晃了一下——然後再也沒有平靜下來。',
    },
    {
      speakerId: 'ema',
      text: '希、希羅！走廊好燙……有焦味！',
    },
    {
      speakerId: 'hiro',
      text: '跟我來。祈禱堂——門是鎖的。漢娜！你聽得見嗎！',
    },
    {
      speakerId: 'ema',
      text: '窗戶……外側有黑煙？漢娜小姐！拜託應一下——',
    },
    {
      speakerId: 'narrator',
      text: '當典獄長強迫開啟鎖後，遠野漢娜倒在祭壇前方。胸口與衣袖焦黑，表情仍像在說「寒酸」。',
    },
    {
      speakerId: 'ema',
      text: '怎麼會……早上還一起吃飯……',
    },
    {
      speakerId: 'hiro',
      text: '哭可以晚點。先記住現場——門內鎖、灼傷、還有那條手帕。',
    },
    {
      speakerId: 'owl',
      text: '余等認定：預備魔女之中，發生了「魔女」所為之殺人。現在開始——魔女審判。',
    },
    {
      speakerId: 'owl',
      text: '搜證。辯論。投票。指認錯誤者，亦可能被視為威脅。余等很公平。',
    },
    {
      speakerId: 'hiro',
      text: '艾瑪，聽好。我們要在審判前把謊言的縫找出來。我會跟你一起搜。',
    },
    {
      speakerId: 'ema',
      text: '嗯……！不能讓真正的兇手繼續笑著站在我們旁邊。',
    },
  ],

  investigationIntro: [
    {
      speakerId: 'hiro',
      text: '搜證開始。每個角落都可能是矛盾的鑰匙——別漏看「時間」與「進出路徑」。',
    },
    {
      speakerId: 'ema',
      text: '我會把找到的東西好好記下來。希羅，有奇怪的地方就直接說，不要客氣。',
    },
  ],

  trialIntro: [
    {
      speakerId: 'owl',
      text: '搜證結束。現在進入辯論。指出證詞中的矛盾——以證據為刃。',
    },
    {
      speakerId: 'hiro',
      text: '艾瑪，聽她們說完。矛盾出現時，選對證據，喊異議。我撐著你。',
    },
    {
      speakerId: 'ema',
      text: '好……我不會再假裝沒看見。這一次，我要看清楚。',
    },
  ],

  endingTruth: [
    {
      speakerId: 'hiro',
      text: '真相很醜，但必須說清楚。',
    },
    {
      speakerId: 'narrator',
      text: '紫藤亞里沙在午夜半離開中庭，由祈禱堂外側窗栓以發火魔法刺殺遠野漢娜，並將氷上梅露露的手帕丟在現場嫁禍。蓮見蕾雅因受威脅而謊報查勤結束時間。',
    },
    {
      speakerId: 'ema',
      text: '漢娜小姐……我們會記住你說「寒酸」時的語氣。對不起，來得太晚了。',
    },
    {
      speakerId: 'hiro',
      text: '至少這一次，我們沒有把眼睛閉起來。走吧，艾瑪——審判結束了，但島上的夜還很長。',
    },
  ],

  endingWrong: [
    {
      speakerId: 'owl',
      text: '指認錯誤。余等宣布——審判失敗。',
    },
    {
      speakerId: 'ema',
      text: '怎麼會……證據明明……',
    },
    {
      speakerId: 'hiro',
      text: '……冷靜。真正的魔女還在笑。下次——我們不會再錯。',
    },
  ],

  evidence: [
    {
      id: 'watch-log',
      name: '值班日誌',
      detail: '蓮見蕾雅的查勤簽名寫到凌晨一時整，並非「午夜結束」。',
      foundIn: '守衛室桌面',
      discoverLines: [
        { speakerId: 'ema', text: '日誌寫到凌晨一時……可是蕾雅不是說午夜就結束了嗎？' },
        { speakerId: 'hiro', text: '時間謊言。收好，審判會用到。' },
      ],
    },
    {
      id: 'handkerchief',
      name: '沾淚手帕',
      detail: '現場血跡旁有手帕。氷上梅露露的抽屜裡有同款備用。',
      foundIn: '祈禱堂祭壇下',
      discoverLines: [
        { speakerId: 'ema', text: '這條……是梅露露早上借我擦桌的那條？可是上面有血……' },
        { speakerId: 'hiro', text: '她不會主動把寶貝手帕丟在這裡。被人拿走的可能性很高。' },
      ],
    },
    {
      id: 'window-scorch',
      name: '窗栓焦痕',
      detail: '外側窗栓有高溫燒焦刮痕，由外向內——死者無法從內側造成。',
      foundIn: '祈禱堂東窗外側',
      discoverLines: [
        { speakerId: 'hiro', text: '外側焦痕。攻擊來自屋外，而且是高溫——發火。' },
        { speakerId: 'ema', text: '漢娜還提醒我們別亂碰窗栓……難道她早就覺得不對勁？' },
      ],
    },
    {
      id: 'boot-prints',
      name: '中庭靴印',
      detail: '紫藤亞里沙的靴印只到約零時三十分，之後在通往東翼的路上消失。',
      foundIn: '中庭地面',
      discoverLines: [
        { speakerId: 'ema', text: '亞里沙說她整晚都在中庭……可是足跡在半路斷了。' },
        { speakerId: 'hiro', text: '「整晚」是謊。後半夜她離席了。' },
      ],
    },
    {
      id: 'water-flask',
      name: '稀釋血痕瓶',
      detail: '蕾雅的水壺內壁有被沖淡的血跡。她承認清洗過入口，否認殺人。',
      foundIn: '蕾雅的牢房',
      discoverLines: [
        { speakerId: 'reia', text: '……那是我清洗門口濺到的血。我沒殺漢娜。相信我。' },
        { speakerId: 'hiro', text: '你有沒有殺人，由證據決定。但你隱瞞了時間，這點先記下。' },
      ],
    },
    {
      id: 'chapel-ash',
      name: '燭台灰燼',
      detail: '燭台燃至將近二時才熄，兇案時堂內仍有微光。',
      foundIn: '祈禱堂燭架',
      discoverLines: [
        { speakerId: 'ema', text: '燭火幾乎燒到兩點……漢娜不是在一片漆黑裡被襲擊的。' },
        { speakerId: 'hiro', text: '兇手看得到她。冷靜、近距離、或隔窗瞄準——都可能。' },
      ],
    },
  ],

  statements: [
    {
      id: 's1',
      speakerId: 'reia',
      text: '查勤在午夜就結束了。之後我回房睡覺，整晚什麼都沒看見、也沒聽到。',
      correctEvidenceId: 'watch-log',
      intro: [
        { speakerId: 'owl', text: '第一輪。夜勤者——蓮見蕾雅。陳述你的行動。' },
        { speakerId: 'hiro', text: '聽好時間。夜勤的謊，永遠從鐘點開始裂。' },
      ],
      reveal: [
        { speakerId: 'ema', text: '異議！值班日誌寫到凌晨一時——你根本沒在午夜結束！' },
        {
          speakerId: 'reia',
          text: '……是。有人要我「別把後半夜寫進去」。我怕連累其他人。',
        },
        { speakerId: 'hiro', text: '怕也不是說謊的許可證。下一輪。' },
      ],
      wrongHint: '這份證據無法證明查勤何時結束。再找與「時間」有關的紀錄。',
    },
    {
      id: 's2',
      speakerId: 'meruru',
      text: '那、那條手帕不是我的！我、我怎麼可能出現在祈禱堂……',
      correctEvidenceId: 'handkerchief',
      intro: [
        { speakerId: 'owl', text: '第二輪。現場遺留物相關——氷上梅露露。' },
        { speakerId: 'ema', text: '梅露露，早上你還很珍惜那條手帕……求你說實話。' },
      ],
      reveal: [
        { speakerId: 'ema', text: '異議！同款備用手帕就在你抽屜裡——那條就是你的！' },
        {
          speakerId: 'meruru',
          text: '嗚嗚……是我的……可是早上還在！一定、一定有人拿走了……！',
        },
        { speakerId: 'hiro', text: '栽贓成立的前提，是兇手碰得到她的東西。繼續。' },
      ],
      wrongHint: '要拆穿這句話，需要能證明手帕歸屬的證物。',
    },
    {
      id: 's3',
      speakerId: 'arisa',
      text: '哈？我整晚都在中庭好嗎，很多人看見。誰要去那個破祈禱堂啊。',
      correctEvidenceId: 'boot-prints',
      intro: [
        { speakerId: 'owl', text: '第三輪。不在場證明——紫藤亞里沙。' },
        { speakerId: 'hiro', text: '她最喜歡把「整晚」掛在嘴上。戳破它。' },
      ],
      reveal: [
        { speakerId: 'ema', text: '異議！中庭靴印只到零時三十分——你根本沒待整晚！' },
        { speakerId: 'arisa', text: '……啧。那又怎樣？難道走來走去就是殺人犯？' },
        { speakerId: 'hiro', text: '不是「走來走去」。是你對「整晚」撒謊。差很多。' },
      ],
      wrongHint: '她強調「整晚都在中庭」。核對足跡能否支撐。',
    },
    {
      id: 's4',
      speakerId: 'arisa',
      text: '就算有燒痕，也可能是燭火或漢娜自己搞的。外面的人進得了上鎖的祈禱堂嗎？',
      correctEvidenceId: 'window-scorch',
      intro: [
        { speakerId: 'owl', text: '最終輪。關於進出路徑與兇器性質。' },
        { speakerId: 'ema', text: '門是鎖的……可是窗栓，漢娜提醒過我們。' },
      ],
      reveal: [
        {
          speakerId: 'ema',
          text: '異議！外側窗栓的焦痕證明攻擊來自屋外——而且是發火！',
        },
        { speakerId: 'arisa', text: '…………哈。被看穿了啊。', },
        {
          speakerId: 'hiro',
          text: '遠野漢娜死於你的火。手帕是栽贓，蕾雅被你堵住嘴。還有話要說嗎？',
        },
        {
          speakerId: 'arisa',
          text: '……那家伙晚上說我太吵、太髒。我就是火啊。火本來就會燒。',
        },
      ],
      wrongHint: '重點是「能否從外部攻擊」。檢查門窗痕跡。',
    },
  ],
}
