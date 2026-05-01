"use client";

import { getVisitorsByPeriodAction } from "@/actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  AnalyticsSummary,
  TimePeriod,
  VisitorsDataPoint,
} from "@/types/analytics";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

type ActiveMetric = "visitors" | "pages";

const chartConfig = {
  views: { label: "Vues" },
  visitors: { label: "Visiteurs", color: "var(--chart-1)" },
  pages: { label: "Vue des pages", color: "var(--chart-2)" },
} satisfies ChartConfig;

interface KpiButtonProps {
  label: string;
  value: number;
  trend: number | null;
  isActive: boolean;
  metricKey: ActiveMetric;
  onClick: (key: ActiveMetric) => void;
}

function KpiButton({
  label,
  value,
  trend,
  isActive,
  metricKey,
  onClick,
}: KpiButtonProps) {
  const isUp = trend !== null && trend > 0;
  const isNeutral = trend === null || trend === 0;

  const TrendIcon = isNeutral ? Minus : isUp ? TrendingUp : TrendingDown;
  const trendColor = isNeutral
    ? "text-muted-foreground"
    : isUp
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-red-500 dark:text-red-400";

  return (
    <button
      data-active={isActive}
      className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 p2-4 text-left even:border-r data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6 transition-colors hover:bg-muted/30"
      onClick={() => onClick(metricKey)}
    >
      <span className="text-[15px] font-semibold text-muted-foreground">
        {label}
      </span>
      <span className="text-lg font-bold leading-none sm:text-3xl tabular-nums">
        {value.toLocaleString("fr-FR")}
      </span>
      {trend !== null ? (
        <span
          className={`flex items-center gap-1 text-xs font-medium mt-0.5 ${trendColor}`}
        >
          <TrendIcon className="size-3" />
          {isUp && "+"}
          {trend}% vs période préc.
        </span>
      ) : (
        <span className="text-xs text-muted-foreground mt-0.5">
          Pas de données préc.
        </span>
      )}
    </button>
  );
}

type VisitorsOverviewChartProps = {
  initialData: Record<TimePeriod, VisitorsDataPoint[]>;
  summary: AnalyticsSummary;
  defaultPeriod?: TimePeriod;
};

export function VisitorsOverviewChart({
  initialData,
  summary,
  defaultPeriod = "30j",
}: VisitorsOverviewChartProps) {
  const [activeMetric, setActiveMetric] = useState<ActiveMetric>("visitors");
  const [period, setPeriod] = useState<TimePeriod>(defaultPeriod);

  const [cache, setCache] =
    useState<Record<TimePeriod, VisitorsDataPoint[]>>(initialData);

  const { execute, isPending } = useAction(getVisitorsByPeriodAction, {
    onSuccess: ({ data: result }) => {
      if (result) {
        setCache((prev) => ({ ...prev, [period]: result }));
      }
    },
  });

  const handlePeriodChange = (value: string) => {
    const next = value as TimePeriod;
    setPeriod(next);
    if (!cache[next]?.length) {
      execute({ period: next });
    }
  };

  const data = cache[period] ?? [];

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex">
          <KpiButton
            label="Visiteurs"
            value={summary.uniqueVisitors}
            trend={summary.uniqueVisitorsTrend}
            isActive={activeMetric === "visitors"}
            metricKey="visitors"
            onClick={setActiveMetric}
          />
          <KpiButton
            label="Vue des pages"
            value={summary.pagesViews}
            trend={summary.pagesViewsTrend}
            isActive={activeMetric === "pages"}
            metricKey="pages"
            onClick={setActiveMetric}
          />
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        {isPending ? (
          <Skeleton className="h-[250px] w-full rounded-md" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={data}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={24}
                tick={{ fontSize: 11 }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-40"
                    nameKey="views"
                    // @ts-expect-error
                    labelFormatter={(value: string) => value}
                  />
                }
              />
              <Line
                dataKey={activeMetric}
                type="monotone"
                fill={`var(--color-${activeMetric})`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
