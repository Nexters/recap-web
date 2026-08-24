import { useSuspenseQuery } from "@tanstack/react-query";

import { useTimeZone } from "@/entities/language";
import { dashboardQueryOptions } from "@/features/analysis/api/analysis-query.client";

const useTopVisitedSiteList = (date: string) => {
  const timeZone = useTimeZone();
  const { data } = useSuspenseQuery({
    ...dashboardQueryOptions({
      date,
      timeZone,
      period: "DAILY",
    }),
    select: (dashboard) => dashboard.getFrequentlyVisitedWebsitesResponse,
  });

  return [...(data?.websiteAnalyses ?? [])]
    .sort((a, b) => (b.stayDuration ?? 0) - (a.stayDuration ?? 0))
    .slice(0, 10);
};

export { useTopVisitedSiteList };
