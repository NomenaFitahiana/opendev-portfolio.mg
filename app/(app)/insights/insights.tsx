"use client";

import {
  ConversionsChart,
  DeviceChart,
  TopCountriesCard,
  TopPagesCard,
  TrafficSourcesChart,
  VisitorsOverviewChart,
} from "@/components/templates/analytics";
import type { AnalyticsData } from "@/types/analytics";

interface InsightsProps {
  initialData: AnalyticsData;
}

export function Insights({ initialData }: InsightsProps) {
  return (
    <div className="flex flex-col gap-6 p-3">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytique</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Statistiques de visite du portfolio
          </p>
        </div>
      </div>

      <VisitorsOverviewChart
        initialData={initialData.visitorsData}
        summary={initialData.summary}
        defaultPeriod="30j"
      />

      <div className="grid grid-cols-3 gap-4">
        <ConversionsChart data={initialData.conversions} />
        <TrafficSourcesChart data={initialData.trafficSources} />
        <DeviceChart data={initialData.deviceData} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TopPagesCard data={initialData.topPages} />
        <TopCountriesCard data={initialData.topCountries} />
      </div>
    </div>
  );
}
