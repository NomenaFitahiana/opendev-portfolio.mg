"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  count: {
    label: "Projets livrés",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type RawEntry = {
  createdAt: Date;
  _count: { id: number };
};

type Props = { data: RawEntry[] };

export function ProjectsChartOverTime({ data }: Props) {
  const [range, setRange] = useState("12m");

  const chartData = useMemo(() => {
    const now = new Date();
    const months = range === "6m" ? 6 : range === "3m" ? 3 : 12;

    const buckets: Record<string, number> = {};
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      buckets[key] = 0;
    }

    for (const entry of data) {
      const d = new Date(entry.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (key in buckets) {
        buckets[key] += entry._count.id;
      }
    }

    return Object.entries(buckets).map(([month, count]) => ({
      month,
      count,
      label: new Date(month + "-01").toLocaleDateString("fr-FR", {
        month: "short",
        year: "2-digit",
      }),
    }));
  }, [data, range]);

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Projets livrés dans le temps</CardTitle>
          <CardDescription>Évolution mensuelle du portfolio</CardDescription>
        </div>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="hidden w-[140px] rounded-lg sm:ml-auto sm:flex">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="3m" className="rounded-lg">
              3 derniers mois
            </SelectItem>
            <SelectItem value="6m" className="rounded-lg">
              6 derniers mois
            </SelectItem>
            <SelectItem value="12m" className="rounded-lg">
              12 derniers mois
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillProjects" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) =>
                    payload?.[0]?.payload?.label ?? ""
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="count"
              type="natural"
              fill="url(#fillProjects)"
              stroke="var(--color-count)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
