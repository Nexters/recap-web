import type { RestAPIProtocol } from "@recap/api";

import {
  type GetScreenTimeQueryType,
  GetScreenTimeResponseSchema,
} from "@/app/analysis/src/service/schema/get-screen-time.schema";
import {
  type GetWorkPatternQueryType,
  GetWorkPatternResponseSchema,
} from "@/app/analysis/src/service/schema/get-work-pattern.schema";

export class AnalysisAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  getScreenTime(query?: GetScreenTimeQueryType) {
    return this.fetch.get({
      url: "users/me/screen-times",
      query: {
        ...query,
      },
      validate: GetScreenTimeResponseSchema.parse,
    });
  }

  getWorkPattern(query?: GetWorkPatternQueryType) {
    return this.fetch.get({
      url: "users/me/work-pattern",
      query: {
        ...query,
      },
      validate: GetWorkPatternResponseSchema.parse,
    });
  }
}
