/** 把證詞拆成可圈選片段；保證 lieToken 獨立成一段。 */
export function splitStatementTokens(text: string, lieToken: string): string[] {
  const idx = text.indexOf(lieToken)
  if (idx < 0) return [text]

  const before = text.slice(0, idx)
  const after = text.slice(idx + lieToken.length)
  const parts = [...splitClauses(before), lieToken, ...splitClauses(after)]
  return parts.map((p) => p.trim()).filter(Boolean)
}

function splitClauses(chunk: string): string[] {
  if (!chunk.trim()) return []
  return chunk
    .split(/(?<=[。！？；…])|(?<=[，、])(?=[^，、。！？；…]{4,})/)
    .map((s) => s.trim())
    .filter(Boolean)
}
