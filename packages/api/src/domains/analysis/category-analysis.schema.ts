import { z } from "zod";

import { isoDurationStringSchema } from "../../schemas";

export const CategoryEnum = z.enum([
  "STUDY",
  "SHOPPING",
  "GAMING",
  "CONTENT",
  "COMMUNITY",
  "NEWS",
  "FINANCE",
  "LIFE",
  "BROWSING",
  "DESIGN",
  "DEVELOPMENT",
  "AI",
  "ETC",
]);

export type CategoryType = z.infer<typeof CategoryEnum>;

const categorySchema = z.preprocess(
  (value) => (value == null || value === "" ? "ETC" : value),
  CategoryEnum.catch("ETC"),
);

const CategoryWebsiteAnalysisSchema = z.object({
  domain: z.string(),
  faviconUrl: z.string().nullable(),
  stayDuration: isoDurationStringSchema,
});

export type CategoryWebsiteAnalysis = z.infer<
  typeof CategoryWebsiteAnalysisSchema
>;

const CategoryAnalysisItemSchema = z.object({
  category: categorySchema,
  stayDuration: isoDurationStringSchema,
  websiteAnalyses: z.array(CategoryWebsiteAnalysisSchema),
});

export type CategoryAnalysisItem = z.infer<typeof CategoryAnalysisItemSchema>;

export const GetCategoryAnalysesSchema = z.object({
  categoryAnalyses: z.array(CategoryAnalysisItemSchema),
});

export type AnalysisCategoryData = z.infer<typeof GetCategoryAnalysesSchema>;
