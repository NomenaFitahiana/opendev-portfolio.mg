"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { TrafficSourceDataPoint } from "@/types/analytics";

const sourcesConfig = {
  organic: { label: "Organique", color: "var(--chart-1)" },
  direct: { label: "Direct", color: "var(--chart-2)" },
  social: { label: "Social", color: "var(--chart-3)" },
} satisfies ChartConfig;

interface TrafficSourcesChartProps {
  data: TrafficSourceDataPoint[];
}

export function TrafficSourcesChart({ data }: TrafficSourcesChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sources de trafic</CardTitle>
        <CardDescription>
          Organique · Direct · Social — 4 derniers mois
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={sourcesConfig} className="h-[200px] w-full">
          <LineChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="organic"
              type="monotone"
              stroke="var(--color-organic)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="direct"
              type="monotone"
              stroke="var(--color-direct)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="social"
              type="monotone"
              stroke="var(--color-social)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-1">
            <div className="flex items-center gap-2 font-medium leading-none">
              Organique en hausse{" "}
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-muted-foreground leading-none text-xs">
              Janvier – Avril 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}