import type { RestAPIProtocol } from "@recap/api";

import {
  type GetScreenTimeQueryType,
  GetScreenTimeResponseSchema,
} from "@/app/analysis/src/service/schema/get-screen-time.schema";

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
}
