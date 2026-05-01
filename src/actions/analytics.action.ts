"use server";

import { fetchAnalyticsData } from "@/lib/analytics/client";
import { adminAction } from "@/lib/safe-action";
import z from "zod";

const periodSchema = z.object({
  period: z.enum(["7j", "30j", "90j"]).default("30j"),
});

export const getAnalyticsAction = adminAction
  .inputSchema(periodSchema)
  .action(async ({ parsedInput }) => {
    return fetchAnalyticsData(parsedInput.period);
  });

export const getVisitorsByPeriodAction = adminAction
  .inputSchema(periodSchema)
  .action(async ({ parsedInput }) => {
    const data = await fetchAnalyticsData(parsedInput.period);
    return data.visitorsData[parsedInput.period];
  });
