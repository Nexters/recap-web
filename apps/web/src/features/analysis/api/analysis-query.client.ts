import type { AnalysisDashboardData, GetDashboardQueryType } from "@recap/api";
import { useQuery, type UseQueryOptions } from "@recap/react-query";
import { queryOptions } from "@tanstack/react-query";

import { analysisAPIService } from "@/features/analysis/api";
import { ANALYSIS_KEYS } from "@/features/analysis/api/query-keys";

type DashboardQueryKey = ReturnType<typeof ANALYSIS_KEYS.detail>;

type UseGetAnalysisDashboardOptions<TData = AnalysisDashboardData> = Omit<
  UseQueryOptions<AnalysisDashboardData, Error, TData, DashboardQueryKey>,
  "queryKey" | "queryFn"
>;

const dashboardQueryOptions = (query: GetDashboardQueryType) =>
  queryOptions<
    AnalysisDashboardData,
    Error,
    AnalysisDashboardData,
    DashboardQueryKey
  >({
    queryKey: ANALYSIS_KEYS.detail([query.period, query.date, query.timeZone]),
    queryFn: async () => {
      const envelope = await analysisAPIService.getDashboard(query);
      return envelope.data;
    },
  });

const useGetAnalysisDashboard = <TData = AnalysisDashboardData>(
  query: GetDashboardQueryType,
  options: UseGetAnalysisDashboardOptions<TData> = {},
) => {
  return useQuery<AnalysisDashboardData, Error, TData, DashboardQueryKey>({
    ...(dashboardQueryOptions(query) as UseQueryOptions<
      AnalysisDashboardData,
      Error,
      TData,
      DashboardQueryKey
    >),
    ...options,
  });
};

export { dashboardQueryOptions, useGetAnalysisDashboard };
