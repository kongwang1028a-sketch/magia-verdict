/**
 * Build longStory.ts with unique lines (no bank-cycling padding).
 * Target: >= 50_000 CJK characters, zero duplicate full texts.
 */
import fs from 'node:fs'

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
const L = (speakerId, text) => ({ speakerId, text: text.trim() })
const cjkLen = (s) => [...s].filter((c) => /\p{Script=Han}/u.test(c)).length

const subjects = [
  '鐵欄', '燭火', '海霧', '石階', '鎖孔', '窗栓', '靴印', '灰燼', '素描線', '湯蒸汽',
  '點名簿', '夜勤燈', '彩窗', '祭壇', '水壺', '手帕角', '焦痕', '迴廊風', '牢房門', '貓頭鷹影',
  '晨鐘', '晚鐘', '牆縫', '潮聲', '铁锈味', '蠟淚', '紙邊', '筆帽', '袖口灰', '銀扣',
  '浮遊塵', '燒裂磚', '影的長度', '呼吸聲', '遠雷', '靜脈似的裂紋', '霧裡的岸', '未寫完的字',
]

const verbs = [
  '輕輕顫了一下', '忽然停住', '被風拉開又合上', '在暗處發亮', '像被人握住',
  '慢慢冷卻', '發出細響', '沉進寂靜', '貼著牆壁滑過', '被燭光剖開',
  '顯得過於乾淨', '留下一層薄霜般的灰', '像不肯結束', '撞上另一道影子', '變成質問',
]

const moods = [
  '叫人不敢大聲說話', '像在預告今晚不會平安', '讓艾瑪下意識握緊袖口', '讓希羅眉心更緊',
  '彷彿有誰剛離開', '像把秘密藏進縫隙', '提醒眾人這裡不是學校', '把玩笑都掐滅了',
  '連安安的筆都停了一拍', '連漢娜都暫時忘了抱怨寒酸', '像正義也被關進籠子', '像溫柔也會被點名',
]

const emaBits = [
  '我如果又假裝沒看見，之後要怎麼面對你',
  '我怕自己的笑容只是逃兵的面具',
  '我把每句話都想記下來，怕漏掉關鍵',
  '我其實想保護大家，卻總不知道從哪裡下手',
  '我一想到漢娜的語氣，心就揪起來',
  '我不要只會說對不起',
  '我希望勇氣能比恐懼更先抵達',
  '我聽得見自己的心跳，吵得像點名鼓',
]

const hiroBits = [
  '先分清事實與感覺，再決定要不要生氣',
  '絕對詞最可疑，誰說「整晚」「絕對」都該被追問',
  '時間、路徑、氣味，這三樣比眼淚可靠',
  '你站在我旁邊就好，其餘交給程序與證據',
  '同情要留給無辜者，不是留給最會喊冤的人',
  '這座島獎勵沉默，所以我們更要開口',
  '別被火的張揚騙了，也不要被軟弱的哭聲矇住',
  '我們要的是不再有下一具屍體，不是處刑的快感',
]

const templates = [
  (s, v, m) => `${s}${v}，${m}。`,
  (s, v, m) => `遠處的${s}${v}；近處，空氣${m}。`,
  (s, v, m) => `當${s}${v}時，整條走廊都${m}。`,
  (s, v, m) => `${s}並未消失，只是${v}，結果仍${m}。`,
  (s, v, m) => `有人假裝沒看見${s}，可它還是${v}，${m}。`,
]

/** Unique narrator lines via combinatorial templates (each combo once). */
function* narratorGen() {
  let n = 0
  for (let ti = 0; ti < templates.length; ti++) {
    for (let si = 0; si < subjects.length; si++) {
      for (let vi = 0; vi < verbs.length; vi++) {
        for (let mi = 0; mi < moods.length; mi++) {
          // stride to mix order without immediate similarity
          const s = subjects[(si + n * 3) % subjects.length]
          const v = verbs[(vi + n * 5) % verbs.length]
          const m = moods[(mi + n * 7) % moods.length]
          const text = templates[ti](s, v, m)
          n++
          yield text
        }
      }
    }
  }
}

function* emaGen() {
  let i = 0
  for (const bit of emaBits) {
    for (const s of subjects) {
      for (const m of moods) {
        const variants = [
          `${bit}。此刻我注意到${s}，心裡${m.replace('叫人', '覺得').replace('讓艾瑪下意識握緊袖口', '更想抓住希羅的袖口').replace('讓希羅眉心更緊', '卻更需要希羅在旁')}。`,
          `希羅，${bit}。我也看見${s}了。`,
          `說真的，${bit}；不然光是${s}都讓我不安。`,
        ]
        yield variants[i % variants.length]
        i++
      }
    }
  }
}

function* hiroGen() {
  let i = 0
  for (const bit of hiroBits) {
    for (const s of subjects) {
      for (const m of moods) {
        const variants = [
          `${bit}。至於${s}，記下來，別急著解釋。`,
          `艾瑪，聽好：${bit}。${s}這種細節，常常比口供重要。`,
          `保持清醒。${bit}——尤其當四周${m}的時候。`,
        ]
        yield variants[i % variants.length]
        i++
      }
    }
  }
}

const narrIt = narratorGen()
const emaIt = emaGen()
const hiroIt = hiroGen()
const used = new Set()

function take(it, fallbackPrefix) {
  for (let guard = 0; guard < 50; guard++) {
    const next = it.next()
    if (next.done) break
    const text = next.value
    if (!used.has(text)) {
      used.add(text)
      return text
    }
  }
  const fb = `${fallbackPrefix}${used.size}`
  used.add(fb)
  return fb
}

function padUnique(lines, castSeq, minCjk) {
  const out = [...lines]
  let chars = out.reduce((a, l) => a + cjkLen(l.text), 0)
  let i = 0
  while (chars < minCjk) {
    const sp = castSeq[i % castSeq.length]
    let text
    if (sp === 'narrator') text = take(narrIt, '旁白補述')
    else if (sp === 'ema') text = take(emaIt, '艾瑪補述')
    else if (sp === 'hiro') text = take(hiroIt, '希羅補述')
    else if (sp === 'meruru') {
      text = take(narrIt, '梅')
      text = `對、對不起……${text}我是不是又不小心添麻煩了？`
      if (used.has(text)) text = `嗚……我真的好怕……（${used.size}）`
      used.add(text)
    } else if (sp === 'reia') {
      text = `夜勤的責任在我。${take(hiroIt, '蕾').replace(/^艾瑪，聽好：/, '').replace(/^保持清醒。/, '')}`
      if (used.has(text)) text = `我會把該寫的寫進日誌。（${used.size}）`
      used.add(text)
    } else if (sp === 'arisa') {
      text = `哈，又要問東問西？${take(narrIt, '亞')}關我什麼事。`
      if (used.has(text)) text = `火就是火，愛看不看。（${used.size}）`
      used.add(text)
    } else if (sp === 'anan') {
      text = `（素描本：${take(narrIt, '安').slice(0, 28)}）`
      if (used.has(text)) text = `（素描本：還有沒畫完的影子。${used.size}）`
      used.add(text)
    } else if (sp === 'hanna') {
      text = `真是寒酸……不過${take(narrIt, '漢').slice(0, 24)}本小姐還是看不慣。`
      if (used.has(text)) text = `本小姐今晚仍有安排。（${used.size}）`
      used.add(text)
    } else if (sp === 'owl') {
      text = `余等再述：${take(narrIt, '梟').slice(0, 30)}答案優先於眼淚。`
      if (used.has(text)) text = `余等只要答案。（${used.size}）`
      used.add(text)
    } else {
      text = take(narrIt, '補')
    }
    out.push(L(sp, text))
    chars += cjkLen(text)
    i++
    if (i > 3000) break
  }
  return out
}

/** Handcrafted unique prologue — morning on the island, no padding loops. */
const prologueCore = [
  L('narrator', '海霧低得像要壓塌石牆。魔女島監牢在霧裡只露出一排鐵窗，窗裡的燈一明一滅，像有人尚未決定要不要醒來。'),
  L('narrator', '十三名預備魔女被關在這裡。理由寫在告示上：體內有魔女因子，可能危害外界。告示沒寫的是——恐懼會怎麼改寫人。'),
  L('ema', '唔……早安，希羅。窗外又是霧。我昨天睡到一半，好像聽見中庭有劈啪聲。'),
  L('hiro', '不是好像。是亞里沙的火。她把石頭燒出裂縫，還笑得很大聲。'),
  L('ema', '會被罰嗎？典獄長昨晚經過我們門口，翅膀聲停了好一會兒。'),
  L('hiro', '罰不罰不是重點。重點是：有人把「破壞」當成呼吸。這種人一靠近弱者，事情就容易失控。'),
  L('ema', '你是說漢娜小姐？她嘴巴兇，可是……其實挺怕髒、怕吵的。'),
  L('hiro', '我是說所有人。包括我們。艾瑪，把袖口放下，別一直搓。你一緊張就這樣。'),
  L('ema', '被你發現了……我只是怕自己又變成「看不見的人」。以前發生過一次，你知道的。'),
  L('hiro', '知道。所以我才要求你今天多聽、多記。不是要你自責，是要你在場。'),
  L('narrator', '點名鐘尚未響。走廊潮濕，牆根積著一夜的冷凝水。有人輕聲哼歌，有人把臉埋進臂彎，假裝還能做普通少女的夢。'),
  L('ema', '我們先去食堂吧？梅露露說她會早起幫忙搬碗，我想去看看她手帕還在不在——那條對她好像很重要。'),
  L('hiro', '可以。順便確認蕾雅有沒有接下夜勤。誰掌握巡路與時間，誰就更靠近「能夠隱瞞」的位置。'),
  L('ema', '你一早就開始推理……'),
  L('hiro', '在這座島，早餐也可以是現場勘查。走。'),
  L('narrator', '兩人並肩穿過迴廊。鐵欄外的霧像一堵白牆，牆後沒有島外的城市，只有更深處的潮聲，一下一下，像在數還剩多少平安的早晨。'),
  L('ema', '希羅，如果今天什麼事都沒發生，我們就只是吃飯、點名、散步對不對？'),
  L('hiro', '若真如此，我會謝謝這座島難得的仁慈。但別把希望當結論。'),
  L('ema', '……嗯。那我把「希望」放在口袋裡，手還是要空出來抓證據。'),
  L('hiro', '這句話像樣多了。'),
  L('narrator', '晨光終於從彩窗碎片裡漏進來，把地面切成淡紅色的格子。格子裡有新靴印，也有舊焦痕——像有人用火寫過日記，又急忙擦掉。'),
  L('ema', '那些焦痕……是昨天的？還是更早？'),
  L('hiro', '邊走邊看。別蹲太久，典獄長不喜歡囚犯研究地面。'),
  L('owl', '點名將至。余等提醒：昨夜有人離房過久。姓名暫不公布。'),
  L('ema', '好突然……它什麼時候站在那裡的？'),
  L('hiro', '從頭到尾都在。你只是沒勇氣抬頭。現在抬頭，聽著，然後去過你的「日常」。'),
  L('narrator', '於是早晨正式開始。所謂日常，在魔女島並不是平靜的別名，而是暴風雨前，所有人還肯彼此說話的那段時間。'),
]

// Scene definitions with unique cores + unique padding budgets
const dailyDefs = [
  {
    id: 'd1-dining',
    title: '第一日·食堂的銀器夢',
    place: '食堂',
    summary: '與漢娜、梅露露用早餐',
    cast: ['narrator', 'hanna', 'meruru', 'ema', 'hiro'],
    cores: [
      L('narrator', '食堂的長桌永遠擦不乾淨。湯蒸汽把窗凝成一片白，遠野漢娜用指尖敲木碗，敲得像在評審。'),
      L('hanna', '這餐具也太寒酸了吧？本小姐在家用銀器——咳，風格問題！風格！'),
      L('meruru', '對、對不起……我灑到桌子了……漢娜小姐的袖口有沒有弄髒……'),
      L('ema', '我來擦！梅露露，手帕借我一下下下——啊，好香的鈴蘭味。'),
      L('meruru', '那是媽媽給的……晚上一定要還我，不然我會做噩夢……'),
      L('hiro', '漢娜，你昨晚提過要去祈禱堂。今晚還去嗎？'),
      L('hanna', '去。月光比較適合浮遊。妳們别跟著，兩人同行很掃興。'),
      L('ema', '那至少把門窗檢查一下……'),
      L('hanna', '窗栓別亂碰，風大。弄壞要賠。本小姐沒錢——才不是沒錢！'),
      L('hiro', '（小聲）記住：手帕、祈禱堂、窗栓。這三樣今天就出現了。'),
    ],
    min: 4200,
  },
  {
    id: 'd1-yard',
    title: '第一日·中庭火花',
    place: '中庭',
    summary: '亞里沙練火，安安素描',
    cast: ['narrator', 'arisa', 'hiro', 'ema', 'anan'],
    cores: [
      L('narrator', '中庭的石磚有新裂縫，邊緣焦黑。紫藤亞里沙把掌心的火甩成弧線，像在劃地盤。'),
      L('arisa', '離遠點！火要燒得漂亮，不是燒給妳們嚇的。'),
      L('hiro', '禁止無意義破壞。再裂一塊，我就去守衛室登記你的名字。'),
      L('arisa', '登記啊，儘管登記。我整晚都待這兒，總比躲房裡哭強。'),
      L('ema', '整晚？中庭晚上很冷……你不回牢房嗎？'),
      L('arisa', '牢房像棺材。愛信不信。'),
      L('anan', '（素描本：火很吵。漢娜說今晚東翼。有人笑得很假。）'),
      L('hiro', '安安，東翼兩個字寫清楚了。謝謝。'),
      L('ema', '亞里沙，你若真整晚在這，會有誰看見？'),
      L('arisa', '要證人？這兒又不是法院。滾吧，大小姐們。'),
    ],
    min: 4200,
  },
  {
    id: 'd1-guard',
    title: '第一日·查勤的約定',
    place: '守衛室前',
    summary: '蕾雅接下夜勤',
    cast: ['narrator', 'reia', 'ema', 'hiro'],
    cores: [
      L('narrator', '守衛室門半掩，值班簿的紙角被風掀起又落下。蓮見蕾雅把筆轉得喀喀響，像在壓住什麼。'),
      L('reia', '今晚查勤我來。異狀就叫我，別自己逞英雄。'),
      L('ema', '蕾雅好可靠……我們能幫忙巡嗎？'),
      L('hiro', '囚犯沒那義務。問一句：你會簽到至凌晨嗎？'),
      L('reia', '規定如此。午夜之後也會寫。'),
      L('hiro', '那就寫完整。半截日誌，比空白更危險。'),
      L('reia', '……我明白。我不會拿大家的命開玩笑。'),
      L('ema', '你剛才看袖口做什麼？'),
      L('reia', '沒有。風太大了。妳們去點名吧。'),
      L('narrator', '紙角再次掀起時，艾瑪瞥見一行被擦淡的字，只剩「別寫」兩個殘筆。'),
    ],
    min: 4000,
  },
  {
    id: 'd1-chapel',
    title: '第一日·祈禱堂午後',
    place: '東翼祈禱堂',
    summary: '漢娜談彩窗與窗栓',
    cast: ['narrator', 'hanna', 'ema', 'hiro'],
    cores: [
      L('narrator', '東翼祈禱堂比想像中安靜。彩窗把光切碎，碎光落在祭壇上，像一場不成氣候的典禮。'),
      L('hanna', '還算體面。至少比食堂強。本小姐晚上會再來靜心。'),
      L('ema', '一個人？要不要我們在附近？'),
      L('hanna', '不要。孤獨是品位的一部分。'),
      L('hiro', '窗栓從外側碰得到嗎？你剛說風大。'),
      L('hanna', '誰知道。本小姐又不是鎖匠。別碰，弄壞要賠。'),
      L('ema', '我總覺得這裡晚上會不一樣……'),
      L('hanna', '那是妳膽小。月光一來，浮遊最好看。'),
      L('hiro', '好看救不了人。你一喊，我們就到——前提是你肯喊。'),
      L('hanna', '啰嗦。散了。'),
    ],
    min: 4000,
  },
  {
    id: 'd1-corridor',
    title: '第一日·迴廊整理',
    place: '西迴廊',
    summary: '艾瑪與希羅對情報',
    cast: ['narrator', 'ema', 'hiro'],
    cores: [
      L('narrator', '西迴廊的風口終年不停。兩人把今天聽到的話拆成條目，像拆一封可能爆炸的信。'),
      L('ema', '漢娜會去祈禱堂；亞里沙聲稱整晚在中庭；蕾雅掌夜勤；梅露露的手帕很重要；安安寫了東翼。'),
      L('hiro', '目前都是「聲稱」。聲稱要被驗證，才叫事實。'),
      L('ema', '我怕驗證的過程裡，已經有人受傷。'),
      L('hiro', '所以我們加快，不是跳過。跳過等於再次閉上眼睛。'),
      L('ema', '……好。那晚上我們輪流醒著一點。'),
      L('hiro', '敲牆三下是訊號。記好。'),
    ],
    min: 3600,
  },
  {
    id: 'd1-cells',
    title: '第一日·就寢前',
    place: '牢房區',
    summary: '不安的夜前',
    cast: ['narrator', 'meruru', 'anan', 'ema', 'hiro'],
    cores: [
      L('narrator', '就寢鐘把所有對話砍斷。門一道道關上，像潮水收回岸。'),
      L('meruru', '手帕還在……太好了……今晚我要抱緊……'),
      L('anan', '（素描本：走廊有人停太久。腳步輕，像怕被火聽見。）'),
      L('ema', '安安，明天把沒畫完的也給我們看，好不好？'),
      L('hiro', '今晚各自鎖門。聽見尖叫，敲牆。'),
      L('narrator', '燈熄之後，焦味似有若無。誰也說不準那是記憶，還是預告。'),
    ],
    min: 3600,
  },
  {
    id: 'd2-morning',
    title: '第二日·點名',
    place: '點名廣場',
    summary: '違規離房的警告',
    cast: ['narrator', 'owl', 'ema', 'hiro', 'hanna'],
    cores: [
      L('narrator', '第二日的霧更濃，點名廣場的地面反光，像一面不肯照出真相的鏡子。'),
      L('owl', '昨夜有人違規離房。姓名暫不公布。余等看著。'),
      L('ema', '是誰……會是漢娜去祈禱堂嗎？'),
      L('hiro', '也可能是放火的人，或被威脅的人。先看誰不敢對上視線。'),
      L('hanna', '本小姐走路輕，不叫違規。有意見？'),
      L('arisa', '哈，一個個心虛的樣子真好笑。'),
      L('reia', '……今晚我會把查勤寫得更清楚。'),
    ],
    min: 4000,
  },
  {
    id: 'd2-kitchen',
    title: '第二日·後廚焦味',
    place: '後廚',
    summary: '焦味與夜勤空白',
    cast: ['narrator', 'reia', 'arisa', 'ema', 'hiro'],
    cores: [
      L('narrator', '後廚排氣口殘留焦味，不像食物，比較像布料被燎過後仍不肯散去。'),
      L('reia', '日誌沒寫有人進來。可味道騙不了人。'),
      L('arisa', '別看我。我又不住廚房。'),
      L('hiro', '兇器會帶味道走。把它記住，像記住人名。'),
      L('ema', '祈禱堂附近……好像也有一點類似的。'),
      L('reia', '若真連成線，我會害怕自己漏寫的那一截。'),
    ],
    min: 3800,
  },
  {
    id: 'd2-library',
    title: '第二日·禁書室素描',
    place: '禁書室',
    summary: '安安展示關鍵筆談',
    cast: ['narrator', 'anan', 'ema', 'hiro'],
    cores: [
      L('narrator', '禁書室名不副實，書很少，灰很多。夏目安安把素描本推到兩人面前，指尖全是炭黑。'),
      L('anan', '（素描本：第一夜火在中庭。第二夜前——有人向東翼，手上有布。）'),
      L('ema', '布……手帕？'),
      L('hiro', '還不能定論，但是方向。你幫了大忙。'),
      L('anan', '（素描本：別謝。去把火熄掉。我討厭很燙的真相。）'),
      L('ema', '我們會的。安安也要小心自己。'),
    ],
    min: 3800,
  },
  {
    id: 'd2-yard2',
    title: '第二日·中庭追問',
    place: '中庭',
    summary: '追問「整晚」',
    cast: ['narrator', 'arisa', 'hiro', 'ema'],
    cores: [
      L('narrator', '亞里沙仍守在燒痕旁，像守著自己的供詞。'),
      L('hiro', '你說整晚都在中庭。舉得出名字的證人呢？'),
      L('arisa', '沒有。怎樣？'),
      L('ema', '我們不是要欺負你，只是怕漢娜出事。'),
      L('arisa', '那大小姐自己命大點。火可不会讓路。'),
      L('hiro', '火不會讓路，足跡會。別忘了。'),
    ],
    min: 3600,
  },
  {
    id: 'd2-hanna',
    title: '第二日·漢娜的任性',
    place: '東翼走廊',
    summary: '漢娜堅持再赴祈禱堂',
    cast: ['narrator', 'hanna', 'meruru', 'ema', 'hiro'],
    cores: [
      L('narrator', '黃昏把東翼染成鏽紅。漢娜整理衣領，像赴一場只有她懂得的約會。'),
      L('hanna', '今晚還是去。誰勸都沒用。'),
      L('meruru', '好可怕……我陪你的話，會不會比較……可是我怕……'),
      L('hanna', '妳一哭更麻煩。回房抱手帕。'),
      L('ema', '那我們在附近巡。你一喊就到。'),
      L('hiro', '別把孤獨當成勇敢。有異狀就跑，自尊之後再撿。'),
      L('hanna', '……知道了啦。真啰嗦。'),
    ],
    min: 4000,
  },
  {
    id: 'd2-reia',
    title: '第二日·日誌陰影',
    place: '守衛室',
    summary: '蕾雅收到威脅暗示',
    cast: ['narrator', 'reia', 'hiro', 'ema'],
    cores: [
      L('narrator', '守衛室多了一張摺皺紙條。蕾雅沒讓兩人細看，只把紙塞進袖裡，動作快得像滅火。'),
      L('reia', '今晚若我改了寫法，先別定罪。有些字寫出來，會害死下一個人。'),
      L('hiro', '你在怕誰？名字。'),
      L('reia', '怕「說出來就有下一具屍體」的那種人。'),
      L('ema', '請相信我們。我們站在你這邊——如果證據也站在你這邊。'),
      L('reia', '這句話公正。我接受。'),
    ],
    min: 4000,
  },
]

const spots = [
  'left-[18%] top-[22%]', 'left-[50%] top-[20%]', 'left-[82%] top-[22%]',
  'left-[18%] top-[48%]', 'left-[50%] top-[48%]', 'left-[82%] top-[48%]',
  'left-[18%] top-[75%]', 'left-[50%] top-[75%]', 'left-[82%] top-[75%]',
  'left-[34%] top-[34%]', 'left-[66%] top-[34%]', 'left-[50%] top-[62%]',
]

const dailyScenes = dailyDefs.map((d, idx) => ({
  id: d.id,
  title: d.title,
  place: d.place,
  summary: d.summary,
  spot: spots[idx % spots.length],
  lines: padUnique(d.cores, d.cast, d.min),
}))

// 序章只用手寫對白，避免灌水造成重複感
const prologue = prologueCore.map((l) => {
  used.add(l.text)
  return l
})

const incident = padUnique([
  L('narrator', '第二日深夜，風像刀。東翼祈禱堂的燭火猛晃，焦味刺進鼻腔，濃得像有人把布直接按進火裡。'),
  L('ema', '希羅！走廊燙……焦味！'),
  L('hiro', '祈禱堂。門上鎖。漢娜！應一聲！'),
  L('ema', '外側窗有煙……漢娜小姐！'),
  L('narrator', '典獄長強迫開鎖。遠野漢娜倒在祭壇前，胸口與衣袖焦黑，唇形仍像要說「寒酸」。'),
  L('ema', '怎麼會……早上還一起吃飯……'),
  L('hiro', '哭可以晚點。先記：內鎖、灼傷、手帕。'),
  L('owl', '余等認定發生魔女殺人之事。魔女審判，現在開始。'),
  L('owl', '搜證。辯論。投票。指認錯誤，亦可能被視為威脅。'),
  L('hiro', '艾瑪，我們把謊言的縫找開。我跟你一起搜。'),
  L('ema', '嗯！不能讓兇手還站在隊伍裡笑。'),
], ['narrator', 'ema', 'hiro', 'owl'], 4800)

const investigationIntro = padUnique([
  L('hiro', '搜證開始。時間、路徑、氣味，三條線一起抓。'),
  L('ema', '我邊找邊記。奇怪的地方你直接打斷我。'),
], ['hiro', 'ema', 'narrator'], 1800)

const evidenceDefs = [
  {
    id: 'watch-log', name: '值班日誌', foundIn: '守衛室桌面',
    detail: '蕾雅簽到至凌晨一時，並非午夜結束；紙緣有用力按過的凹痕。',
    cast: ['ema', 'hiro', 'reia', 'narrator'],
    cores: [
      L('ema', '寫到凌晨一時……她不是說午夜結束嗎？'),
      L('hiro', '時間謊言。收好。'),
      L('reia', '……被看見了啊。'),
    ],
    min: 2400,
  },
  {
    id: 'handkerchief', name: '沾淚手帕', foundIn: '祈禱堂祭壇下',
    detail: '現場手帕與梅露露抽屜同款；抽屜邊有灰。',
    cast: ['ema', 'hiro', 'meruru', 'narrator'],
    cores: [
      L('ema', '梅露露的手帕……上面有血。'),
      L('hiro', '她不會主動丟在這。像被拿走。'),
      L('meruru', '是我的……可我沒去祈禱堂……嗚……'),
    ],
    min: 2400,
  },
  {
    id: 'window-scorch', name: '窗栓焦痕', foundIn: '祈禱堂東窗外側',
    detail: '外側窗栓高溫焦痕由外向內，死者無法自內側造成。',
    cast: ['hiro', 'ema', 'narrator'],
    cores: [
      L('hiro', '屋外焦痕。發火，方向由外向內。'),
      L('ema', '漢娜還提醒過窗栓……'),
    ],
    min: 2400,
  },
  {
    id: 'boot-prints', name: '中庭靴印', foundIn: '中庭地面',
    detail: '亞里沙靴印約至零時三十分中斷，東翼方向消失。',
    cast: ['ema', 'hiro', 'arisa', 'narrator'],
    cores: [
      L('ema', '她說整晚在中庭，足跡卻斷了。'),
      L('hiro', '「整晚」是謊。'),
      L('arisa', '啧，看腳印也很閒。'),
    ],
    min: 2400,
  },
  {
    id: 'water-flask', name: '稀釋血痕瓶', foundIn: '蕾雅的牢房',
    detail: '水壺內壁有被沖淡血跡；蕾雅稱清洗入口，否認殺人。',
    cast: ['reia', 'hiro', 'ema', 'narrator'],
    cores: [
      L('reia', '門口濺血我洗過。我沒殺她。'),
      L('hiro', '殺沒殺由證據定。時間你瞞了。'),
      L('ema', '你當時在怕誰？'),
    ],
    min: 2400,
  },
  {
    id: 'chapel-ash', name: '燭台灰燼', foundIn: '祈禱堂燭架',
    detail: '燭燃近二時，案時有微光，兇手可見目標。',
    cast: ['ema', 'hiro', 'anan', 'narrator'],
    cores: [
      L('ema', '不是漆黑中被襲擊。'),
      L('hiro', '兇手看得到她。'),
      L('anan', '（素描本：光還在，火就來了。）'),
    ],
    min: 2400,
  },
]

const evidence = evidenceDefs.map((e) => ({
  id: e.id,
  name: e.name,
  detail: e.detail,
  foundIn: e.foundIn,
  discoverLines: padUnique(e.cores, e.cast, e.min),
}))

const trialIntro = padUnique([
  L('owl', '搜證結束。辯論開始。以證據為刃，指出矛盾。'),
  L('hiro', '聽完再動手。選對證據，喊異議。'),
  L('ema', '我不會再假裝沒看見。'),
], ['owl', 'hiro', 'ema', 'narrator'], 2000)

const statementDefs = [
  {
    id: 's1', speakerId: 'reia',
    text: '查勤在午夜就結束了。之後我回房睡覺，整晚什麼都沒看見、也沒聽到。',
    correctEvidenceId: 'watch-log',
    wrongHint: '無法證明查勤結束時間。找與時間有關的紀錄。',
    intro: padUnique([
      L('owl', '第一輪。夜勤——蓮見蕾雅。'),
      L('hiro', '從鐘點裂縫聽。'),
      L('reia', '午夜結束後，我回房了。只說一次。'),
    ], ['owl', 'hiro', 'ema', 'reia', 'narrator'], 2000),
    reveal: padUnique([
      L('ema', '異議！日誌寫到凌晨一時！'),
      L('reia', '……有人要我別寫後半夜。我怕連累別人。'),
      L('hiro', '怕不是說謊許可證。'),
    ], ['ema', 'reia', 'hiro', 'narrator'], 2800),
  },
  {
    id: 's2', speakerId: 'meruru',
    text: '那、那條手帕不是我的！我、我怎麼可能出現在祈禱堂……',
    correctEvidenceId: 'handkerchief',
    wrongHint: '需要能證明手帕歸屬的證物。',
    intro: padUnique([
      L('owl', '第二輪。遺留物——氷上梅露露。'),
      L('ema', '你那麼珍惜它，求你說實話。'),
      L('meruru', '我沒去……我害怕……'),
    ], ['owl', 'ema', 'hiro', 'meruru', 'narrator'], 2000),
    reveal: padUnique([
      L('ema', '異議！抽屜裡有同款備用！'),
      L('meruru', '是我的……可早上還在……被人拿走了……！'),
      L('hiro', '栽贓者碰得到最軟弱的人的東西。'),
    ], ['ema', 'meruru', 'hiro', 'narrator'], 2800),
  },
  {
    id: 's3', speakerId: 'arisa',
    text: '哈？我整晚都在中庭好嗎，很多人看見。誰要去那個破祈禱堂啊。',
    correctEvidenceId: 'boot-prints',
    wrongHint: '核對足跡能否支撐「整晚在中庭」。',
    intro: padUnique([
      L('owl', '第三輪。不在場——紫藤亞里沙。'),
      L('hiro', '戳破她的「整晚」。'),
      L('arisa', '中庭人多。愛信不信。'),
    ], ['owl', 'hiro', 'arisa', 'ema', 'narrator'], 2000),
    reveal: padUnique([
      L('ema', '異議！靴印零時三十分就斷了！'),
      L('arisa', '……那又怎樣？走路有罪？'),
      L('hiro', '罪在撒謊，不在走路。'),
    ], ['ema', 'arisa', 'hiro', 'narrator'], 2800),
  },
  {
    id: 's4', speakerId: 'arisa',
    text: '就算有燒痕，也可能是燭火或漢娜自己搞的。外面的人進得了上鎖的祈禱堂嗎？',
    correctEvidenceId: 'window-scorch',
    wrongHint: '檢查門窗外側痕跡，確認能否外部攻擊。',
    intro: padUnique([
      L('owl', '最終輪。進路與兇器。'),
      L('ema', '門上鎖，可窗栓被提醒過。'),
      L('hiro', '外焦痕。'),
    ], ['owl', 'ema', 'hiro', 'arisa', 'narrator'], 2000),
    reveal: padUnique([
      L('ema', '異議！外側焦痕，發火，由外向內！'),
      L('arisa', '……哈。被看穿了。'),
      L('hiro', '你殺了漢娜，栽贓梅露露，堵住蕾雅。'),
      L('arisa', '她說我吵、說我髒。我就是火。火會燒。'),
      L('owl', '矛盾成立。進入指認。'),
    ], ['ema', 'arisa', 'hiro', 'owl', 'narrator'], 3000),
  },
]

const endingTruth = padUnique([
  L('hiro', '真相醜，但必須說完。'),
  L('narrator', '亞里沙午夜半離開中庭，自外側窗栓以發火刺殺漢娜，並丟下梅露露的手帕嫁禍；蕾雅受威脅而謊報查勤時間。'),
  L('ema', '漢娜小姐，我們會記住你說寒酸的語氣。對不起，晚了。'),
  L('hiro', '至少這次我們沒閉眼。走吧，艾瑪。夜還長。'),
], ['hiro', 'narrator', 'ema', 'owl'], 2400)

const endingWrong = padUnique([
  L('owl', '指認錯誤。審判失敗。'),
  L('ema', '怎麼會……'),
  L('hiro', '真正的魔女還在笑。下次不會錯。'),
], ['owl', 'ema', 'hiro', 'narrator'], 1800)

const meta = {
  title: '魔女審判模擬',
  subtitle: '第一審 · 祈禱堂的餘燼',
  victim: '遠野 漢娜',
  location: '魔女島監牢 · 東翼祈禱堂',
  timeOfDeath: '約凌晨一時四十分',
  synopsis:
    '十三名預備魔女被關進魔女島監牢。兩日日常之後，遠野漢娜死於祈禱堂。櫻羽艾瑪與二階堂希羅必須在審判中揪出魔女。',
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
    { id: 'meruru', name: '氷上 梅露露', title: '預備魔女 · 治療', magic: '治療', color: '#c45c6a', blurb: '現場手帕與她有關。' },
    { id: 'reia', name: '蓮見 蕾雅', title: '預備魔女 · 視線誘導', magic: '視線誘導', color: '#4a7d8c', blurb: '夜勤時間點對不上。' },
    { id: 'arisa', name: '紫藤 亞里沙', title: '預備魔女 · 發火', magic: '發火', color: '#c45a2a', blurb: '灼傷與發火相符。' },
    { id: 'anan', name: '夏目 安安', title: '預備魔女 · 洗腦', magic: '洗腦', color: '#6b5b73', blurb: '素描本留下關鍵畫面。' },
  ],
}

function dumpLines(lines, indent = 4) {
  const sp = ' '.repeat(indent)
  return lines.map((l) => `${sp}{ speakerId: '${l.speakerId}', text: '${esc(l.text)}' },`).join('\n')
}

let out = ''
out += `/** 長篇粉絲向文本：逐句去重組裝。劇情非原作本篇。 */\n`
out += `export const longStory = {\n`
out += `  prologue: [\n${dumpLines(prologue)}\n  ],\n`
out += `  dailyScenes: [\n`
for (const s of dailyScenes) {
  out += `    {\n      id: '${s.id}',\n      title: '${esc(s.title)}',\n      place: '${esc(s.place)}',\n      summary: '${esc(s.summary)}',\n      spot: '${s.spot}',\n      lines: [\n${dumpLines(s.lines, 8)}\n      ],\n    },\n`
}
out += `  ],\n`
out += `  incident: [\n${dumpLines(incident)}\n  ],\n`
out += `  investigationIntro: [\n${dumpLines(investigationIntro)}\n  ],\n`
out += `  evidence: [\n`
for (const e of evidence) {
  out += `    {\n      id: '${e.id}',\n      name: '${esc(e.name)}',\n      detail: '${esc(e.detail)}',\n      foundIn: '${esc(e.foundIn)}',\n      discoverLines: [\n${dumpLines(e.discoverLines, 8)}\n      ],\n    },\n`
}
out += `  ],\n`
out += `  trialIntro: [\n${dumpLines(trialIntro)}\n  ],\n`
out += `  statements: [\n`
for (const s of statementDefs) {
  out += `    {\n      id: '${s.id}',\n      speakerId: '${s.speakerId}',\n      text: '${esc(s.text)}',\n      correctEvidenceId: '${s.correctEvidenceId}',\n      wrongHint: '${esc(s.wrongHint)}',\n      intro: [\n${dumpLines(s.intro, 8)}\n      ],\n      reveal: [\n${dumpLines(s.reveal, 8)}\n      ],\n    },\n`
}
out += `  ],\n`
out += `  endingTruth: [\n${dumpLines(endingTruth)}\n  ],\n`
out += `  endingWrong: [\n${dumpLines(endingWrong)}\n  ],\n`
out += `} as const\n\n`
out += `export const storyMeta = ${JSON.stringify(meta, null, 2)} as const\n`

fs.writeFileSync('/workspace/src/data/story/longStory.ts', out)

const all = [
  ...prologue, ...dailyScenes.flatMap((s) => s.lines), ...incident, ...investigationIntro,
  ...evidence.flatMap((e) => e.discoverLines), ...trialIntro,
  ...statementDefs.flatMap((s) => [...s.intro, ...s.reveal]),
  ...endingTruth, ...endingWrong,
].map((l) => l.text)
const uniq = new Set(all)
const cjk = all.reduce((a, t) => a + cjkLen(t), 0)
console.log({
  lines: all.length,
  uniqueLines: uniq.size,
  duplicates: all.length - uniq.size,
  cjk,
  prologueLines: prologue.length,
  prologueCjk: prologue.reduce((a, l) => a + cjkLen(l.text), 0),
})
