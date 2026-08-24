import { z } from "zod";

import { isoDurationStringSchema } from "../../schemas";

const WebsiteAnalysisSchema = z.object({
  domain: z.string(),
  faviconUrl: z.string().nullable(),
  visitCount: z.number(),
  stayDuration: isoDurationStringSchema,
});

export const GetWebsiteAnalysesSchema = z.object({
  websiteAnalyses: z.array(WebsiteAnalysisSchema),
});

export type FrequencyVisitedSitesData = z.infer<
  typeof GetWebsiteAnalysesSchema
>;
