const WORDS_PER_MINUTE = 220

/**
 * Estimate minutes to read an MDX source. Hand-rolled on purpose: strips
 * frontmatter, code blocks, and markup punctuation, then counts words.
 * Runs at build time via the remark plugin in vite.config.ts, which injects
 * the result as a `readingTime` export on every post module.
 */
export function readingTimeMinutes(source: string): number {
  const text = source
    .replace(/^---\n[\s\S]*?\n---/, ' ') // frontmatter block
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links → label
    .replace(/<[^>]+>/g, ' ') // JSX/HTML tags
    .replace(/[`*_#>~|]+/g, ' ') // markdown punctuation
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
