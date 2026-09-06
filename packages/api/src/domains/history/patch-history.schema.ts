import { z } from "zod";

export const PatchHistorySchema = z.object({
  lastActiveAt: z.number(),
  endedAt: z.number().optional(),
});

export type PatchHistoryDTO = z.infer<typeof PatchHistorySchema>;
