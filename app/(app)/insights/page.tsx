import { fetchAnalyticsData } from "@/lib/analytics/client";
import type { Metadata } from "next";
import { Insights } from "./insights";

export const metadata: Metadata = {
  title: "Analytique — Dashboard",
  description: "Statistiques de visite du portfolio",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Page() {
  const analytics = await fetchAnalyticsData("30j");

  return <Insights initialData={analytics} />;
}
