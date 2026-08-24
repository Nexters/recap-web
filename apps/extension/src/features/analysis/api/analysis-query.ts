import type { AnalysisDashboardData, GetDashboardQueryType } from "@recap/api";
import { useQuery, type UseQueryOptions } from "@recap/react-query";

import { analysisAPIService } from "@/features/analysis/api";
import { ANALYSIS_KEYS } from "@/features/analysis/api/query-keys";

export const dashboardQueryOptions = (query: GetDashboardQueryType) => ({
  queryKey: ANALYSIS_KEYS.detail([query.period, query.date, query.timeZone]),
  queryFn: async () => {
    const envelope = await analysisAPIService.getDashboard(query);
    return envelope.data;
  },
});

export const useGetAnalysisDashboard = <TData = AnalysisDashboardData>(
  query: GetDashboardQueryType,
  options?: Omit<
    UseQueryOptions<AnalysisDashboardData, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<AnalysisDashboardData, Error, TData>({
    ...dashboardQueryOptions(query),
    ...options,
  });
};
