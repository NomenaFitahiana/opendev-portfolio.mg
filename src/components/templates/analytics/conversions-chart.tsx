/**
 * conversions-chart.tsx
 *
 * Graphique radial semi-circulaire : conversions contact + newsletter du mois.
 * "use client" requis pour recharts.
 */

"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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
import type { ConversionDataPoint } from "@/types/analytics";

// ---------------------------------------------------------------------------
// Config graphique
// ---------------------------------------------------------------------------

const chartConfig = {
  contact: { label: "Contact", color: "var(--chart-1)" },
  newsletter: { label: "Newsletter", color: "var(--chart-2)" },
} satisfies ChartConfig;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ConversionsChartProps {
  data: ConversionDataPoint[];
}

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------

export function ConversionsChart({ data }: ConversionsChartProps) {
  const latest = data[0] ?? { month: "—", contact: 0, newsletter: 0 };
  const total = latest.contact + latest.newsletter;
  const contactRate =
    total > 0 ? ((latest.contact / total) * 100).toFixed(1) : "—";

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Conversions</CardTitle>
        <CardDescription>Formulaires — {latest.month}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[220px]"
        >
          <RadialBarChart
            data={[latest]}
            endAngle={180}
            innerRadius={70}
            outerRadius={100}
          >
            <RadialBar
              dataKey="contact"
              fill="var(--color-contact)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="newsletter"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-newsletter)"
              className="stroke-transparent stroke-2"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                    return null;
                  }
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) - 14}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {total}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 4}
                        className="fill-muted-foreground text-xs"
                      >
                        soumissions
                      </tspan>
                    </text>
                  );
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-1.5 text-sm pb-4">
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-[2px] bg-[var(--chart-1)]" />
            Contact ({latest.contact})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-[2px] bg-[var(--chart-2)]" />
            Newsletter ({latest.newsletter})
          </span>
        </div>
        <p className="text-muted-foreground text-xs leading-none">
          Taux moyen : {contactRate}%
        </p>
      </CardFooter>
    </Card>
  );
}
