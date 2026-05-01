/**
 * device-chart.tsx
 *
 * Graphique en barres empilées : sessions Desktop vs Mobile par mois.
 * "use client" requis pour recharts.
 */

"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import type { DeviceDataPoint } from "@/types/analytics";

// ---------------------------------------------------------------------------
// Config graphique
// ---------------------------------------------------------------------------

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

const MONTH_LABELS = ["Jan", "Fév", "Mar", "Avr"];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DeviceChartProps {
  data: DeviceDataPoint[];
}

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------

export function DeviceChart({ data }: DeviceChartProps) {
  function formatMonth(value: string): string {
    const [, monthStr] = value.split("-");
    const index = parseInt(monthStr, 10) - 1;
    return MONTH_LABELS[index] ?? value;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Desktop vs Mobile</CardTitle>
        <CardDescription>Répartition des sessions par appareil</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11 }}
              tickFormatter={formatMonth}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={1}
              content={
                <ChartTooltipContent
                  hideLabel
                  className="w-[160px]"
                  formatter={(value, name, item, index) => (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                        style={{ background: `var(--color-${name})` }}
                      />
                      {chartConfig[name as keyof typeof chartConfig]?.label ??
                        name}
                      <div className="ml-auto font-mono font-medium tabular-nums text-foreground">
                        {Number(value).toLocaleString("fr-FR")}
                      </div>
                      {index === 1 && (
                        <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                          Total
                          <div className="ml-auto font-mono tabular-nums">
                            {(
                              (item.payload as DeviceDataPoint).desktop +
                              (item.payload as DeviceDataPoint).mobile
                            ).toLocaleString("fr-FR")}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                />
              }
            />
            <Bar
              dataKey="desktop"
              stackId="a"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="var(--color-mobile)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
