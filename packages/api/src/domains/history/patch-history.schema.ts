import { z } from "zod";

export const PatchHistorySchema = z.object({
  lastActiveAt: z.number().nullable(),
  endedAt: z.number().nullable(),
});

export type PatchHistoryDTO = z.infer<typeof PatchHistorySchema>;
