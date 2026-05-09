/**
 * Live tech-news aggregator.
 *
 * Strategy (in priority order):
 *   1. GNews API     - if GNEWS_API_KEY is set. Provides title, description,
 *                      image, source, publishedAt out of the box.
 *   2. NewsAPI.org   - if NEWSAPI_KEY is set. Same shape as GNews.
 *   3. Hacker News   - free, no key required. Front-page tech stories.
 *
 * Results are cached in-process for NEWS_CACHE_TTL_MS to avoid hammering
 * upstreams (and to stay within free-tier quotas).
 */

export type NewsItem = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  source: string;
  publishedAt: string;
};

export type NewsPayload = {
  items: NewsItem[];
  fetchedAt: string;
};

const NEWS_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ITEMS = 8;
const UPSTREAM_TIMEOUT_MS = 6_000;

let cache: { payload: NewsPayload; expiresAt: number } | null = null;

const TECH_INCLUDE_TERMS = [
  "ai",
  "artificial intelligence",
  "machine learning",
  "llm",
  "openai",
  "anthropic",
  "software",
  "software development",
  "developer",
  "programming",
  "coding",
  "typescript",
  "javascript",
  "python",
  "react",
  "next.js",
  "api",
  "cloud",
  "aws",
  "azure",
  "gcp",
  "devops",
  "cybersecurity",
  "data",
  "startup",
  "saas",
  "enterprise tech",
];

const TECH_EXCLUDE_TERMS = [
  "nintendo",
  "resident evil",
  "playstation",
  "xbox",
  "gaming",
  "video game",
  "esports",
  "fortnite",
  "call of duty",
  "pokemon",
];

function safeHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function normalizeText(input: string): string {
  return input.toLowerCase().replace(/\s+/g, " ").trim();
}

function includesAny(text: string, terms: string[]): number {
  let count = 0;
  for (const term of terms) {
    if (text.includes(term)) count += 1;
  }
  return count;
}

function isRelevantTechNews(item: NewsItem): boolean {
  const text = normalizeText(
    `${item.title} ${item.description} ${item.source} ${item.url}`
  );
  const includeHits = includesAny(text, TECH_INCLUDE_TERMS);
  const excludeHits = includesAny(text, TECH_EXCLUDE_TERMS);

  if (includeHits === 0) return false;
  if (excludeHits > 0 && includeHits < 2) return false;
  return true;
}

function uniqueByUrl(items: NewsItem[]): NewsItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

async function timedFetch(
  url: string,
  init?: RequestInit & { timeoutMs?: number }
): Promise<Response> {
  const ctl = new AbortController();
  const t = setTimeout(
    () => ctl.abort(),
    init?.timeoutMs ?? UPSTREAM_TIMEOUT_MS
  );
  try {
    return await fetch(url, {
      ...init,
      signal: ctl.signal,
      headers: {
        "User-Agent": "TechBinariesNewsBot/1.0 (+https://techbinaries.com)",
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
    });
  } finally {
    clearTimeout(t);
  }
}

type GNewsArticle = {
  title?: string;
  description?: string;
  url?: string;
  image?: string | null;
  publishedAt?: string;
  source?: { name?: string; url?: string };
};

async function fromGNews(): Promise<NewsItem[] | null> {
  const key = process.env.GNEWS_API_KEY;
  if (!key) return null;

  try {
    const res = await timedFetch(
      `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&max=12&apikey=${encodeURIComponent(
        key
      )}`
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { articles?: GNewsArticle[] };
    return (data.articles ?? [])
      .filter((a) => a.title && a.url && a.publishedAt)
      .map<NewsItem>((a) => ({
        title: a.title!,
        description: a.description ?? "",
        url: a.url!,
        image: a.image ?? null,
        source: a.source?.name ?? safeHostname(a.url!),
        publishedAt: a.publishedAt!,
      }))
      .filter(isRelevantTechNews);
  } catch {
    return null;
  }
}

type NewsApiArticle = {
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string | null;
  publishedAt?: string;
  source?: { name?: string };
};

async function fromNewsApi(): Promise<NewsItem[] | null> {
  const key = process.env.NEWSAPI_KEY;
  if (!key) return null;

  try {
    const res = await timedFetch(
      "https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=12",
      { headers: { "X-Api-Key": key } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { articles?: NewsApiArticle[] };
    return (data.articles ?? [])
      .filter((a) => a.title && a.url && a.publishedAt)
      .map<NewsItem>((a) => ({
        title: a.title!,
        description: a.description ?? "",
        url: a.url!,
        image: a.urlToImage ?? null,
        source: a.source?.name ?? safeHostname(a.url!),
        publishedAt: a.publishedAt!,
      }))
      .filter(isRelevantTechNews);
  } catch {
    return null;
  }
}

type HNHit = {
  title?: string;
  url?: string;
  story_url?: string;
  points?: number;
  num_comments?: number;
  created_at?: string;
};

async function fromHackerNews(): Promise<NewsItem[]> {
  try {
    const res = await timedFetch(
      "https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=20"
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { hits?: HNHit[] };

    return (data.hits ?? [])
      .map<NewsItem | null>((h) => {
        const link = h.url ?? h.story_url ?? "";
        if (!h.title || !link) return null;
        const host = safeHostname(link);
        if (!host) return null;
        const points = typeof h.points === "number" ? h.points : 0;
        const comments = typeof h.num_comments === "number" ? h.num_comments : 0;
        const description =
          points > 0 || comments > 0
            ? `${points} points · ${comments} comments on Hacker News`
            : "Trending on Hacker News";
        return {
          title: h.title,
          description,
          url: link,
          image: null,
          source: host,
          publishedAt: h.created_at ?? new Date().toISOString(),
        };
      })
      .filter((x): x is NewsItem => x !== null)
      .filter(isRelevantTechNews);
  } catch {
    return [];
  }
}

export async function fetchLiveTechNews(): Promise<NewsPayload> {
  const now = Date.now();
  if (cache && cache.expiresAt > now) {
    return cache.payload;
  }

  let items =
    (await fromGNews()) ?? (await fromNewsApi()) ?? null;
  if (!items || items.length === 0) {
    items = await fromHackerNews();
  }

  const trimmed = uniqueByUrl(items).slice(0, MAX_ITEMS);
  const payload: NewsPayload = {
    items: trimmed,
    fetchedAt: new Date().toISOString(),
  };

  cache = { payload, expiresAt: now + NEWS_CACHE_TTL_MS };
  return payload;
}
