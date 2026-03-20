"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig: ChartConfig = {
  direct: {
    label: "Direct",
    color: "var(--chart-1)",
  },
  social: {
    label: "Social",
    color: "var(--chart-2)",
  },
  organic: {
    label: "Organic",
    color: "var(--chart-3)",
  },
};

const chartData = [
  { title: "International", visitors: 8, fill: "var(--chart-1)" },
  { title: "Local", visitors: 5, fill: "var(--chart-2)" },
  { title: "Agences", visitors: 3, fill: "var(--sup-accent-color)" },
];

const totalProjects = chartData.reduce((acc, curr) => acc + curr.visitors, 0);

export const ClientTypeChart = () => {
  return (
    <Card className="flex flex-col max-md:py-4!">
      <CardHeader className="items-center pb-0 max-md:px-4!">
        <CardTitle>Types de clients</CardTitle>
        <CardDescription>
          Répartition des projets par type de client
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto -mt-6 aspect-square max-h-60 min-h-48"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="title"
              innerRadius={84}
              outerRadius={100}
              startAngle={180}
              endAngle={0}
              paddingAngle={4}
              cornerRadius={4}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 40}
                          className="fill-muted-foreground text-sm"
                        >
                          Total projets
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 8}
                          className="fill-foreground text-3xl font-semibold"
                        >
                          {totalProjects}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="-mt-26 flex-col gap-2 text-sm">
        <div className="grid w-full grid-cols-3 gap-2">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="mb-1 flex items-center gap-1.5">
                <div
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-muted-foreground max-w-15 truncate text-xs">
                  {item.title}
                </span>
              </div>
              <span className="text-lg font-semibold">{item.visitors}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};
