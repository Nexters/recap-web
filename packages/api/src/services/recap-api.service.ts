import type { RecapData } from "../domains/recap/generate-recap.schema";
import { GetRecapResponseSchema } from "../domains/recap/generate-recap.schema";
import { RECAP_NOT_FOUND_CODE } from "../domains/recap/recap.const";
import { APIError } from "../errors/APIError";
import type { RestAPIProtocol } from "../rest/types";
import type { Envelope } from "../schemas/common.schema";
import type { DateQueryType } from "../schemas/enum.schema";

export class RecapAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  async getRecap(query?: DateQueryType): Promise<Envelope<RecapData | null>> {
    try {
      return await this.fetch.get({
        url: "users/me/recaps",
        query: {
          ...query,
        },
        validate: GetRecapResponseSchema.parse,
      });
    } catch (error) {
      if (error instanceof APIError && error.code === RECAP_NOT_FOUND_CODE) {
        return {
          success: true,
          data: null,
        };
      }

      throw error;
    }
  }
}
