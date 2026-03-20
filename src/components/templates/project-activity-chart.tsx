"use client";

import { useState } from "react";
import {
  ArrowDownToLineIcon,
  FileJsonIcon,
  MoreHorizontalIcon,
  RefreshCwIcon,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const generateData = () => {
  return Array.from({ length: 20 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split("T")[0],
      delivered: Math.floor(Math.random() * 8) + 1,
      inProgress: Math.floor(Math.random() * 5) + 1,
    };
  });
};

const chartConfig: ChartConfig = {
  visitors: { label: "Projets" },
  delivered: {
    label: "Livrés",
    color: "var(--chart-2)",
  },
  inProgress: {
    label: "En cours",
    color: "var(--chart-1)",
  },
};

export const ProjectActivityChart = () => {
  const [chartData, setChartData] = useState(generateData());

  return (
    <Card className="@container/card max-md:py-4!">
      <CardHeader className="max-md:px-4">
        <CardTitle>Activité des projets</CardTitle>
        <CardDescription>
          Projets livrés et en cours sur les 30 derniers jours
        </CardDescription>
        <CardAction className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            className="max-sm:hidden"
            aria-label="Rafraîchir"
            onClick={() => setChartData(generateData())}
          >
            <RefreshCwIcon />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="max-sm:hidden"
            aria-label="Exporter"
          >
            <ArrowDownToLineIcon />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon-sm">
                <MoreHorizontalIcon />
                <span className="sr-only">Options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setChartData(generateData())}>
                  <RefreshCwIcon />
                  <span>Rafraîchir</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileJsonIcon />
                  <span>Exporter CSV</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
        <div className="mt-4 flex items-center gap-6">
          <div className="space-y-1.5">
            <p className="text-muted-foreground text-sm font-medium">Total livrés</p>
            <p className="text-lg leading-none font-bold sm:text-2xl">12</p>
          </div>
          <div className="bg-border h-10 w-px" />
          <div className="space-y-1.5">
            <p className="text-muted-foreground text-sm font-medium">En cours</p>
            <p className="text-lg leading-none font-bold sm:text-2xl">4</p>
          </div>
          <div className="bg-border h-10 w-px max-sm:hidden" />
          <div className="space-y-1.5 max-sm:hidden">
            <p className="text-muted-foreground text-sm font-medium">Taux de livraison</p>
            <p className="text-lg leading-none font-bold sm:text-2xl">+94%</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("fr-FR", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={4} width={35} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("fr-FR", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Bar dataKey="delivered" stackId="a" fill="var(--color-delivered)" radius={6} className="stroke-background" strokeWidth={3} />
            <Bar dataKey="inProgress" stackId="a" fill="var(--color-inProgress)" radius={6} className="stroke-background" strokeWidth={3} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
