import fs from 'node:fs'
import path from 'node:path'

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    if (fs.statSync(p).isDirectory()) walk(p, acc)
    else if (/\.(ts|tsx|json)$/.test(name)) acc.push(p)
  }
  return acc
}

const roots = ['src/data']
const files = roots.flatMap((r) => walk(r))
let all = ''
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8')
  for (const m of t.matchAll(/(?:text|detail|synopsis|summary|blurb|wrongHint|name|title|place):\s*'((?:\\'|[^'])*)'/g)) {
    all += m[1].replace(/\\'/g, "'").replace(/\\n/g, '\n')
  }
  for (const m of t.matchAll(/(?:text|detail|synopsis|summary|blurb|wrongHint|name|title|place):\s*`([^`]*)`/g)) {
    all += m[1]
  }
}
const cjk = [...all].filter((ch) => /\p{Script=Han}/u.test(ch)).length
console.log(JSON.stringify({ files: files.length, totalChars: all.length, cjkChars: cjk }, null, 2))
