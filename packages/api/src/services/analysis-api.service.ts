import {
  EMPTY_ANALYSIS_DASHBOARD,
  HISTORY_NOT_FOUND_CODE,
} from "../domains/analysis/dashboard.const";
import {
  type GetDashboardQueryType,
  GetDashboardResponseSchema,
} from "../domains/analysis/dashboard.schema";
import { APIError } from "../errors/APIError";
import type { RestAPIProtocol } from "../rest/types";

export class AnalysisAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  async getDashboard(query?: GetDashboardQueryType) {
    try {
      return await this.fetch.get({
        url: "users/me/dashboard",
        query: {
          ...query,
        },
        validate: GetDashboardResponseSchema.parse,
      });
    } catch (error) {
      if (error instanceof APIError && error.code === HISTORY_NOT_FOUND_CODE) {
        return {
          success: true,
          data: EMPTY_ANALYSIS_DASHBOARD,
        };
      }

      throw error;
    }
  }
}
