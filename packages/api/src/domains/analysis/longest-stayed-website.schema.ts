import { z } from "zod";

import { isoDurationStringSchema } from "../../schemas";

export const TopVisitedSiteSchema = z.object({
  domain: z.string().nullable(),
  faviconUrl: z.string().nullable(),
  stayDuration: isoDurationStringSchema,
});

export type LongestWebSiteData = z.infer<typeof TopVisitedSiteSchema>;
