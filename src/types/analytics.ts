export type TimePeriod = "7j" | "30j" | "90j";

export interface VisitorsDataPoint {
  date: string;
  visitors: number;
  pages: number;
}

export interface TopPage {
  path: string;
  label: string;
  views: number;
  pct: number;
}

export interface TopCountry {
  country: string;
  flag: string;
  visitors: number;
  pct: number;
}

export interface TrafficSourceDataPoint {
  date: string;
  organic: number;
  direct: number;
  social: number;
}

export interface DeviceDataPoint {
  date: string;
  desktop: number;
  mobile: number;
}

export interface ConversionDataPoint {
  month: string;
  contact: number;
  newsletter: number;
}

export interface AnalyticsSummary {
  uniqueVisitors: number;
  uniqueVisitorsTrend: number;
  pagesViews: number;
  pagesViewsTrend: number;
  bounceRate: string;
  bounceRateTrend: number;
  avgSessionDuration: string;
  avgSessionDurationTrend: number;
}

export interface AnalyticsData {
  summary: AnalyticsSummary;
  visitorsData: Record<TimePeriod, VisitorsDataPoint[]>;
  topPages: TopPage[];
  topCountries: TopCountry[];
  trafficSources: TrafficSourceDataPoint[];
  deviceData: DeviceDataPoint[];
  conversions: ConversionDataPoint[];
}

export interface VisitorsDataPoint {
  date: string;
  visitors: number;
  pages: number;
}

export interface TopPage {
  path: string;
  label: string;
  views: number;
  pct: number;
}

export interface TopCountry {
  country: string;
  flag: string;
  visitors: number;
  pct: number;
}

export interface TrafficSourceDataPoint {
  date: string;
  organic: number;
  direct: number;
  social: number;
  referral: number;
}

export interface DeviceDataPoint {
  date: string;
  desktop: number;
  mobile: number;
}

export interface ConversionDataPoint {
  month: string;
  contact: number;
  newsletter: number;
}

export interface AnalyticsData {
  summary: AnalyticsSummary;
  visitorsData: Record<TimePeriod, VisitorsDataPoint[]>;
  topPages: TopPage[];
  topCountries: TopCountry[];
  trafficSources: TrafficSourceDataPoint[];
  deviceData: DeviceDataPoint[];
  conversions: ConversionDataPoint[];
}
