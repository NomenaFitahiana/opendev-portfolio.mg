"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
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

type Props = {
  data: {
    name: string;
    count: number;
    category: string;
  }[];
};

const CATEGORY_COLORS: Record<string, string> = {
  FRONTEND: "var(--chart-1)",
  BACKEND: "var(--chart-2)",
  DATABASE: "var(--chart-3)",
  MOBILE: "var(--chart-4)",
  DEVOPS: "var(--chart-5)",
  DESIGN: "oklch(0.7 0.1 200)",
  OTHER: "oklch(0.6 0.1 300)",
};

const chartConfig = {
  count: {
    label: "Nombre de projets",
  },
} satisfies ChartConfig;

export function ProjectsByTechChart({ data }: Props) {
  const enriched = data.map((item) => ({
    ...item,
    fill: CATEGORY_COLORS[item.category] ?? CATEGORY_COLORS.OTHER,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technologies dominantes</CardTitle>
        <CardDescription>
          Répartition des projets par technologie utilisée (Top 5)
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart
            data={enriched}
            layout="vertical"
            margin={{ left: 2, right: 16 }}
          >
            <CartesianGrid horizontal={false} />

            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={100}
            />

            <XAxis type="number" tickLine={false} axisLine={false} />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Bar dataKey="count" radius={6}>
              {enriched.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
