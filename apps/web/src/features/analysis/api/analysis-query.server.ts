import type { AnalysisDashboardData, GetDashboardQueryType } from "@recap/api";
import { AnalysisAPIService } from "@recap/api";
import { type FetchQueryOptions, queryOptions } from "@tanstack/react-query";

import { createServerAuthedRestAPI } from "@/entities/auth/lib/create-server-authed-rest";

import { ANALYSIS_KEYS } from "./query-keys";

type DashboardQueryKey = ReturnType<typeof ANALYSIS_KEYS.detail>;

const serverAnalysisAPIService = new AnalysisAPIService(
  createServerAuthedRestAPI(undefined, { apiBaseURL: "v1" }),
);

export const serverDashboardQueryOptions = (
  query: GetDashboardQueryType,
): FetchQueryOptions<
  AnalysisDashboardData,
  Error,
  AnalysisDashboardData,
  DashboardQueryKey
> =>
  queryOptions<
    AnalysisDashboardData,
    Error,
    AnalysisDashboardData,
    DashboardQueryKey
  >({
    queryKey: ANALYSIS_KEYS.detail([query.period, query.date, query.timeZone]),
    queryFn: async () => {
      const envelope = await serverAnalysisAPIService.getDashboard(query);
      return envelope.data;
    },
  });
