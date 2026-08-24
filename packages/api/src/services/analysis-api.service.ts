import {
  type GetDashboardQueryType,
  GetDashboardResponseSchema,
} from "../domains/analysis/dashboard.schema";
import type { RestAPIProtocol } from "../rest/types";

export class AnalysisAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  getDashboard(query?: GetDashboardQueryType) {
    return this.fetch.get({
      url: "users/me/dashboard",
      query: {
        ...query,
      },
      validate: GetDashboardResponseSchema.parse,
    });
  }
}
