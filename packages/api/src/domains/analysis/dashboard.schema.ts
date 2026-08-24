import { z } from "zod";

import { CreateResponseSchema } from "../../schemas";
import { TimeZoneSchema } from "../../schemas/enum.schema";

import { GetCategoryAnalysesSchema } from "./category-analysis.schema";
import { GetWebsiteAnalysesSchema } from "./frequently-visited-websites.schema";
import { TopVisitedSiteSchema } from "./longest-stayed-website.schema";
import {
  GetScreenTimeSchema,
  ScreenTimePeriodEnum,
} from "./screen-time.schema";
import { GetWorkPatternSchema } from "./work-pattern.schema";

export const GetDashboardSchema = z.object({
  getScreenTimeResponse: GetScreenTimeSchema,
  getCategoryAnalysesResponse: GetCategoryAnalysesSchema,
  getFrequentlyVisitedWebsitesResponse: GetWebsiteAnalysesSchema,
  getWorkPatternResponse: GetWorkPatternSchema,
  getLongestStayedWebsiteResponse: TopVisitedSiteSchema,
});

export const GetDashboardResponseSchema =
  CreateResponseSchema(GetDashboardSchema);

export const GetDashboardQuerySchema = z.object({
  date: z.string(),
  timeZone: TimeZoneSchema,
  period: ScreenTimePeriodEnum,
});

export type GetDashboardQueryType = z.infer<typeof GetDashboardQuerySchema>;
export type AnalysisDashboardData = z.infer<typeof GetDashboardSchema>;
