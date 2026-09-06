import { z } from "zod";

import { TimeZoneSchema } from "../../schemas/enum.schema";

export const CreateHistorySchema = z.object({
  url: z.string(),
  startedAt: z.number(),
  timeZone: TimeZoneSchema,
  title: z.string(),
  description: z.string().nullish(),
  faviconUrl: z.string().nullish(),
});

export type CreateHistoryDTO = z.infer<typeof CreateHistorySchema>;

export const CreateHistoryResponseSchema = z.object({
  historyId: z.string(),
});

export type CreateHistoryResponse = z.infer<typeof CreateHistoryResponseSchema>;
