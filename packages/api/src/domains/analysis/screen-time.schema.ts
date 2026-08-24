import { z } from "zod";

import { dateStringSchema, isoDurationStringSchema } from "../../schemas";

export const ScreenTimePeriodEnum = z.enum(["DAILY", "WEEKLY"]);

export type ScreenTimePeriodType = z.infer<typeof ScreenTimePeriodEnum>;

const ScreenTimeSchema = z.object({
  startedAt: dateStringSchema,
  endedAt: dateStringSchema,
  stayDuration: isoDurationStringSchema,
});

export type ScreenTimeType = z.infer<typeof ScreenTimeSchema>;

export const GetScreenTimeSchema = z.object({
  totalStayDuration: isoDurationStringSchema,
  buckets: z.array(ScreenTimeSchema),
});

export type AnalysisScreenTimeData = z.infer<typeof GetScreenTimeSchema>;
