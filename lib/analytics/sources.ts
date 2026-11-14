/**
 * Readable names for GA4 traffic sources (sessionSource / sessionMedium), so the
 * dashboard says "Google Search" and "X (Twitter)" rather than "google / organic"
 * and "t.co / referral". Rows that map to the same name are merged.
 */

const KNOWN_SOURCES: ReadonlyArray<readonly [RegExp, string]> = [
  [/^(google|(www\.)?google\.[a-z.]+)$/, "Google"],
  [/^(bing|((www|cn)\.)?bing\.com)$/, "Bing"],
  [/^(duckduckgo|duckduckgo\.com)$/, "DuckDuckGo"],
  [/^(yahoo|(search\.)?yahoo\.com)$/, "Yahoo"],
  [/^(ecosia|(www\.)?ecosia\.org)$/, "Ecosia"],
  [/^(linkedin|lnkd\.in|(www\.)?linkedin\.com|com\.linkedin\.android)$/, "LinkedIn"],
  [/^(x|t\.co|twitter|((www|mobile)\.)?twitter\.com|x\.com)$/, "X (Twitter)"],
  [/^(facebook|fb|((www|m|l|lm|web)\.)?facebook\.com)$/, "Facebook"],
  [/^(instagram|ig|(l\.)?instagram\.com)$/, "Instagram"],
  [/^(whatsapp|wa\.me|(web|api)\.whatsapp\.com)$/, "WhatsApp"],
  [/^(youtube|((www|m)\.)?youtube\.com)$/, "YouTube"],
  [/^(chatgpt|chatgpt\.com|chat\.openai\.com)$/, "ChatGPT"],
  [/^(perplexity|(www\.)?perplexity\.ai)$/, "Perplexity"],
  [/^gemini\.google\.com$/, "Gemini"],
  [/^claude\.ai$/, "Claude"],
  [/^copilot\.microsoft\.com$/, "Copilot"],
];

const SEARCH_ENGINES = new Set(["Google", "Bing", "DuckDuckGo", "Yahoo", "Ecosia"]);
const PAID_MEDIUMS = new Set(["cpc", "ppc", "paid", "paidsearch", "paid_social"]);
const UNKNOWN_SOURCES = new Set(["", "(not set)", "(data not available)"]);

/** "google" + "organic" -> "Google Search"; "t.co" + "referral" -> "X (Twitter)". */
export function describeSource(source: string, medium: string): string {
  const key = source.trim().toLowerCase();
  const kind = medium.trim().toLowerCase();

  if (key === "(direct)") return "Direct";
  if (UNKNOWN_SOURCES.has(key)) return "Not set";

  const known = KNOWN_SOURCES.find(([pattern]) => pattern.test(key))?.[1];
  // Unknown sources keep their own name: a domain as-is ("nairametrics.com"),
  // a plain word capitalised ("klaviyo" -> "Klaviyo").
  const name = known ?? (key.includes(".") ? key.replace(/^www\./, "") : key[0].toUpperCase() + key.slice(1));

  if (kind === "organic" && SEARCH_ENGINES.has(name)) return `${name} Search`;
  if (PAID_MEDIUMS.has(kind)) return `${name} Ads`;
  if (kind === "email") return `${name} (email)`;
  return name;
}
