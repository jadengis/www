/**
 * The contact address, kept encoded and decoded only in response to a click,
 * so it never appears in server-rendered HTML for scrapers to collect. It
 * still ships in the client bundle; this stops basic HTML scraping, not a
 * determined bot.
 */
const ENCODED = 'am9obkBkZW5nLmlz'

export function decodeEmail(): string {
  return atob(ENCODED)
}
