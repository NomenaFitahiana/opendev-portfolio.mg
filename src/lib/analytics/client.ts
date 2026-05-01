import type {
  AnalyticsData,
  AnalyticsSummary,
  ConversionDataPoint,
  DeviceDataPoint,
  TimePeriod,
  TopCountry,
  TopPage,
  TrafficSourceDataPoint,
  VisitorsDataPoint,
} from "@/types/analytics";
import "dotenv/config";

const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";
const PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;

interface HogQLResponse {
  results: Array<Array<string | number | null>>;
  columns?: string[];
  error?: string;
}

async function hogqlQuery(sql: string): Promise<HogQLResponse> {
  if (!PROJECT_ID || !API_KEY) {
    throw new Error(
      "[Analytics] POSTHOG_PROJECT_ID ou POSTHOG_PERSONAL_API_KEY manquant dans .env",
    );
  }

  const res = await fetch(`${HOST}/api/projects/${PROJECT_ID}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ query: { kind: "HogQLQuery", query: sql } }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[Analytics] PostHog ${res.status}: ${text}`);
  }

  return res.json() as Promise<HogQLResponse>;
}

interface DateRange {
  dateFrom: string;
  dateTo: string;
  label: string;
}

function getDateRange(period: TimePeriod): DateRange {
  const now = new Date();
  const MS_PER_DAY = 86_400_000;
  const daysBack = period === "7j" ? 7 : period === "30j" ? 30 : 90;
  const from = new Date(now.getTime() - daysBack * MS_PER_DAY);

  const fmt = (d: Date) =>
    d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });

  return {
    dateFrom: from.toISOString().split("T")[0],
    dateTo: now.toISOString().split("T")[0],
    label: `${fmt(from)} – ${fmt(now)}`,
  };
}

function getPreviousDateRange(period: TimePeriod): {
  dateFrom: string;
  dateTo: string;
} {
  const MS_PER_DAY = 86_400_000;
  const daysBack = period === "7j" ? 7 : period === "30j" ? 30 : 90;
  const now = new Date();
  const currentFrom = new Date(now.getTime() - daysBack * MS_PER_DAY);
  const prevTo = new Date(currentFrom.getTime() - MS_PER_DAY);
  const prevFrom = new Date(prevTo.getTime() - daysBack * MS_PER_DAY);

  return {
    dateFrom: prevFrom.toISOString().split("T")[0],
    dateTo: prevTo.toISOString().split("T")[0],
  };
}

function periodToTruncFn(period: TimePeriod): string {
  if (period === "7j") return "toDate(timestamp)";
  if (period === "30j") return "toMonday(toDate(timestamp))";
  return "toStartOfMonth(toDate(timestamp))";
}

function formatLabel(isoDate: string, period: TimePeriod): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  if (period === "90j")
    return d.toLocaleDateString("fr-FR", { month: "short" });
  if (period === "30j")
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  return d.toLocaleDateString("fr-FR", { weekday: "short" });
}

const SEARCH_ENGINES = new Set([
  "google.com",
  "google.fr",
  "google.mg",
  "bing.com",
  "duckduckgo.com",
  "yahoo.com",
  "ecosia.org",
  "qwant.com",
  "baidu.com",
  "yandex.com",
]);

const SOCIAL_NETWORKS = new Set([
  "twitter.com",
  "x.com",
  "linkedin.com",
  "facebook.com",
  "instagram.com",
  "tiktok.com",
  "reddit.com",
  "youtube.com",
  "pinterest.com",
  "snapchat.com",
]);

type TrafficSource = "organic" | "direct" | "social" | "referral";

function classifyReferrer(domain: string | null): TrafficSource {
  if (!domain) return "direct";
  const d = domain.toLowerCase().replace(/^www\./, "");
  if (SEARCH_ENGINES.has(d)) return "organic";
  if (SOCIAL_NETWORKS.has(d)) return "social";
  return "referral";
}

const MOBILE_OS = new Set(["ios", "android"]);

function classifyOS(os: string | null): "mobile" | "desktop" {
  if (!os) return "desktop";
  return MOBILE_OS.has(os.toLowerCase()) ? "mobile" : "desktop";
}

const COUNTRY_NAMES: Record<string, string> = {
  FR: "France",
  BE: "Belgique",
  MG: "Madagascar",
  CH: "Suisse",
  CA: "Canada",
  US: "États-Unis",
  DE: "Allemagne",
  ES: "Espagne",
  IT: "Italie",
  GB: "Royaume-Uni",
  NL: "Pays-Bas",
  PT: "Portugal",
  SN: "Sénégal",
  CI: "Côte d'Ivoire",
  MA: "Maroc",
  TN: "Tunisie",
};

const COUNTRY_FLAGS: Record<string, string> = {
  FR: "🇫🇷",
  BE: "🇧🇪",
  MG: "🇲🇬",
  CH: "🇨🇭",
  CA: "🇨🇦",
  US: "🇺🇸",
  DE: "🇩🇪",
  ES: "🇪🇸",
  IT: "🇮🇹",
  GB: "🇬🇧",
  NL: "🇳🇱",
  PT: "🇵🇹",
  SN: "🇸🇳",
  CI: "🇨🇮",
  MA: "🇲🇦",
  TN: "🇹🇳",
};

async function queryVisitorTrends(
  period: TimePeriod,
): Promise<VisitorsDataPoint[]> {
  const { dateFrom, dateTo } = getDateRange(period);
  const truncFn = periodToTruncFn(period);

  const { results } = await hogqlQuery(`
    SELECT
      toString(${truncFn})     AS period,
      count()                  AS pageviews,
      countDistinct(person_id) AS unique_visitors
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= '${dateFrom}'
      AND timestamp <= '${dateTo}'
    GROUP BY period
    ORDER BY period ASC
  `);

  return results.map((row) => ({
    date: formatLabel(String(row[0]), period),
    pages: Number(row[1]),
    visitors: Number(row[2]),
  }));
}

async function queryTotalsWithTrend(period: TimePeriod): Promise<{
  totalPages: number;
  totalVisitors: number;
  pagesTrend: number | null;
  visitorsTrend: number | null;
}> {
  const { dateFrom, dateTo } = getDateRange(period);
  const prev = getPreviousDateRange(period);

  const [current, previous] = await Promise.all([
    hogqlQuery(`
      SELECT count() AS pv, countDistinct(person_id) AS uv
      FROM events
      WHERE event = '$pageview'
        AND timestamp >= '${dateFrom}'
        AND timestamp <= '${dateTo}'
    `),
    hogqlQuery(`
      SELECT count() AS pv, countDistinct(person_id) AS uv
      FROM events
      WHERE event = '$pageview'
        AND timestamp >= '${prev.dateFrom}'
        AND timestamp <= '${prev.dateTo}'
    `),
  ]);

  const totalPages = Number(current.results?.[0]?.[0] ?? 0);
  const totalVisitors = Number(current.results?.[0]?.[1] ?? 0);
  const prevPages = Number(previous.results?.[0]?.[0] ?? 0);
  const prevVisitors = Number(previous.results?.[0]?.[1] ?? 0);

  const calcTrend = (curr: number, prev: number): number | null => {
    if (prev === 0) return null;
    return Math.round(((curr - prev) / prev) * 1000) / 10; // 1 décimale
  };

  return {
    totalPages,
    totalVisitors,
    pagesTrend: calcTrend(totalPages, prevPages),
    visitorsTrend: calcTrend(totalVisitors, prevVisitors),
  };
}

async function queryTopPages(period: TimePeriod): Promise<TopPage[]> {
  const { dateFrom, dateTo } = getDateRange(period);

  const { results } = await hogqlQuery(`
    SELECT
      properties.$pathname AS path,
      count()              AS views
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= '${dateFrom}'
      AND timestamp <= '${dateTo}'
      AND properties.$pathname IS NOT NULL
    GROUP BY path
    ORDER BY views DESC
    LIMIT 6
  `);

  if (results.length === 0) return [];
  const max = Number(results[0][1]);

  return results.map((row, i) => {
    const path = String(row[0]);
    return {
      path,
      label: path === "/" ? "Accueil" : path.replace(/^\//, ""),
      views: Number(row[1]),
      pct: i === 0 ? 100 : Math.round((Number(row[1]) / max) * 100),
    };
  });
}

async function queryTopCountries(period: TimePeriod): Promise<TopCountry[]> {
  const { dateFrom, dateTo } = getDateRange(period);

  const { results } = await hogqlQuery(`
    SELECT
      properties.$geoip_country_code AS country_code,
      countDistinct(person_id)        AS visitors
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= '${dateFrom}'
      AND timestamp <= '${dateTo}'
      AND properties.$geoip_country_code IS NOT NULL
    GROUP BY country_code
    ORDER BY visitors DESC
    LIMIT 6
  `);

  if (results.length === 0) return [];
  const max = Number(results[0][1]);

  return results.map((row, i) => {
    const code = String(row[0]);
    return {
      country: COUNTRY_NAMES[code] ?? code,
      flag: COUNTRY_FLAGS[code] ?? "🌍",
      visitors: Number(row[1]),
      pct: i === 0 ? 100 : Math.round((Number(row[1]) / max) * 100),
    };
  });
}

async function queryTrafficSources(
  period: TimePeriod,
): Promise<TrafficSourceDataPoint[]> {
  const { dateFrom, dateTo } = getDateRange(period);
  const truncFn = periodToTruncFn(period);

  const { results } = await hogqlQuery(`
    SELECT
      toString(${truncFn})              AS period,
      properties.$referring_domain      AS referrer,
      count()                           AS views
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= '${dateFrom}'
      AND timestamp <= '${dateTo}'
    GROUP BY period, referrer
    ORDER BY period ASC
  `);

  const periodMap = new Map<
    string,
    { organic: number; direct: number; social: number; referral: number }
  >();

  for (const row of results) {
    const rawPeriod = String(row[0]);
    const label = formatLabel(rawPeriod, period);
    const referrer = row[1] ? String(row[1]) : null;
    const views = Number(row[2]);
    const source = classifyReferrer(referrer);

    if (!periodMap.has(label)) {
      periodMap.set(label, { organic: 0, direct: 0, social: 0, referral: 0 });
    }
    periodMap.get(label)![source] += views;
  }

  return Array.from(periodMap.entries()).map(([date, counts]) => ({
    date,
    ...counts,
  }));
}

async function queryDeviceData(period: TimePeriod): Promise<DeviceDataPoint[]> {
  const { dateFrom, dateTo } = getDateRange(period);
  const truncFn = periodToTruncFn(period);

  const { results } = await hogqlQuery(`
    SELECT
      toString(${truncFn})   AS period,
      properties.$os         AS os,
      count()                AS views
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= '${dateFrom}'
      AND timestamp <= '${dateTo}'
    GROUP BY period, os
    ORDER BY period ASC
  `);

  const periodMap = new Map<string, { desktop: number; mobile: number }>();

  for (const row of results) {
    const rawPeriod = String(row[0]);
    const label = formatLabel(rawPeriod, period);
    const os = row[1] ? String(row[1]) : null;
    const views = Number(row[2]);
    const deviceType = classifyOS(os);

    if (!periodMap.has(label)) {
      periodMap.set(label, { desktop: 0, mobile: 0 });
    }
    periodMap.get(label)![deviceType] += views;
  }

  return Array.from(periodMap.entries()).map(([date, counts]) => ({
    date,
    ...counts,
  }));
}

async function queryEventCount(
  period: TimePeriod,
  eventName: string,
): Promise<number> {
  const { dateFrom, dateTo } = getDateRange(period);

  const { results } = await hogqlQuery(`
    SELECT count() AS total
    FROM events
    WHERE event = '${eventName}'
      AND timestamp >= '${dateFrom}'
      AND timestamp <= '${dateTo}'
  `);

  return Number(results?.[0]?.[0] ?? 0);
}

function buildFallbackVisitors(period: TimePeriod): VisitorsDataPoint[] {
  const configs: Record<
    TimePeriod,
    { count: number; label: (i: number) => string }
  > = {
    "7j": { count: 7, label: (i) => `J-${7 - i}` },
    "30j": { count: 8, label: (i) => `S${i + 1}` },
    "90j": { count: 3, label: (i) => ["Jan", "Fév", "Mar"][i] ?? `M${i}` },
  };
  const { count, label } = configs[period];
  return Array.from({ length: count }, (_, i) => ({
    date: label(i),
    visitors: 0,
    pages: 0,
  }));
}

export async function fetchAnalyticsData(
  period: TimePeriod = "30j",
): Promise<AnalyticsData> {
  const { label: periodLabel } = getDateRange(period);

  const [
    visitorTrends,
    totalsWithTrend,
    topPages,
    topCountries,
    trafficSources,
    deviceData,
    contactCount,
    newsletterCount,
  ] = await Promise.all([
    queryVisitorTrends(period).catch((): VisitorsDataPoint[] => []),
    queryTotalsWithTrend(period).catch(() => ({
      totalPages: 0,
      totalVisitors: 0,
      pagesTrend: null,
      visitorsTrend: null,
    })),
    queryTopPages(period).catch((): TopPage[] => []),
    queryTopCountries(period).catch((): TopCountry[] => []),
    queryTrafficSources(period).catch((): TrafficSourceDataPoint[] => []),
    queryDeviceData(period).catch((): DeviceDataPoint[] => []),
    queryEventCount(period, "contact_submitted").catch(() => 0),
    queryEventCount(period, "newsletter_subscribed").catch(() => 0),
  ]);

  const summary: AnalyticsSummary = {
    uniqueVisitors: totalsWithTrend.totalVisitors,
    uniqueVisitorsTrend: totalsWithTrend.visitorsTrend as number,
    pagesViews: totalsWithTrend.totalPages,
    pagesViewsTrend: totalsWithTrend.pagesTrend as number,
    periodLabel,
  };

  const visitorsDataForPeriod =
    visitorTrends.length > 0 ? visitorTrends : buildFallbackVisitors(period);

  const visitorsData: Record<TimePeriod, VisitorsDataPoint[]> = {
    "7j": period === "7j" ? visitorsDataForPeriod : [],
    "30j": period === "30j" ? visitorsDataForPeriod : [],
    "90j": period === "90j" ? visitorsDataForPeriod : [],
  };

  const currentMonth = new Date().toLocaleDateString("fr-FR", {
    month: "long",
  });

  const conversions: ConversionDataPoint[] = [
    { month: currentMonth, contact: contactCount, newsletter: newsletterCount },
  ];

  return {
    summary,
    visitorsData,
    topPages,
    topCountries,
    trafficSources,
    deviceData,
    conversions,
  };
}
