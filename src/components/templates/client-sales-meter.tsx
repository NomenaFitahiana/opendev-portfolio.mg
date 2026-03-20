"use client";

import { useState } from "react";

import {
  CalendarDays,
  CheckIcon,
  GlobeIcon,
  UsersIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { LinkedIn, Upwork } from "developer-icons";

type TimeRangeKey = "7d" | "30d" | "90d" | "year";

interface TimeRangeOption {
  value: TimeRangeKey;
  label: string;
}

const timeRanges: TimeRangeOption[] = [
  { value: "7d", label: "This Week" },
  { value: "30d", label: "This Month" },
  { value: "90d", label: "Last 3 Months" },
  { value: "year", label: "Year to Date" },
];

type ClientSource = {
  source: string;
  leads: number;
  contracts: number;
  percent: number;
};

const clientSources: ClientSource[] = [
  { source: "linkedin", leads: 320, contracts: 18, percent: 72 },
  { source: "referral", leads: 210, contracts: 14, percent: 58 },
  { source: "upwork", leads: 180, contracts: 9, percent: 40 },
  { source: "direct", leads: 95, contracts: 4, percent: 22 },
];

const getSourceConfig = (key: string) => {
  switch (key.toLowerCase()) {
    case "linkedin":
      return {
        icon: LinkedIn,
        label: "LinkedIn",
        backgroundClass: "bg-blue-50 dark:bg-blue-800/20",
        foregroundClass: "text-blue-500",
      };
    case "upwork":
      return {
        icon: Upwork,
        label: "Upwork",
        backgroundClass: "bg-green-50 dark:bg-green-800/20",
        foregroundClass: "text-green-500",
      };
    case "referral":
      return {
        icon: UsersIcon,
        label: "Bouche à oreille",
        backgroundClass: "bg-violet-50 dark:bg-violet-800/20",
        foregroundClass: "text-violet-500",
      };
    case "direct":
      return {
        icon: GlobeIcon,
        label: "Contact direct",
        backgroundClass: "bg-slate-50 dark:bg-slate-800/40",
        foregroundClass: "text-slate-500",
      };
    default:
      return {
        icon: GlobeIcon,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        backgroundClass: "bg-slate-50 dark:bg-slate-800/40",
        foregroundClass: "text-slate-500",
      };
  }
};

export const ClientSourceMeter = () => {
  const [range, setRange] = useState<TimeRangeKey>("30d");
  const selectedLabel = timeRanges.find((r) => r.value === range)?.label;

  return (
    <Card className="gap-3 max-md:py-4!">
      <CardHeader className="max-md:px-4">
        <CardTitle>Sources clients</CardTitle>
        <CardDescription>
          Origine des leads et contrats signés par période
        </CardDescription>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 max-md:size-8">
                <CalendarDays className="text-muted-foreground size-4" />
                <span className="max-md:hidden">{selectedLabel}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {timeRanges.map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  onClick={() => setRange(item.value)}
                  className="justify-between"
                >
                  {item.label}
                  {range === item.value && <CheckIcon className="size-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-2.5 max-md:px-4">
        {clientSources.map((item) => {
          const config = getSourceConfig(item.source);
          const Icon = config.icon;
          return (
            <div key={item.source} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("flex size-9 items-center justify-center rounded-md", config.backgroundClass)}>
                    <Icon className={cn("size-5", config.foregroundClass)} />
                  </div>
                  <div>
                    <p className="text-base font-medium">{config.label}</p>
                    <p className="text-muted-foreground text-xs">
                      {item.leads.toLocaleString()} leads
                    </p>
                  </div>
                </div>
                <div className="text-end">
                  <p className="text-base font-medium">
                    {item.contracts} contrats
                    <span className="text-muted-foreground ms-1 text-xs">
                      ({item.percent}%)
                    </span>
                  </p>
                  <div className="mt-1 flex items-center gap-2.5">
                    <Progress
                      aria-label={`Taux de conversion ${config.label}`}
                      value={item.percent}
                      className="bg-muted **:data-[slot=progress-indicator]:bg-primary/70 h-1 w-30"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

