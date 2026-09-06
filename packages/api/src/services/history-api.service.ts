import {
  type CreateHistoryDTO,
  CreateHistoryResponseSchema,
} from "../domains/history/create-history.schema";
import type { PatchHistoryDTO } from "../domains/history/patch-history.schema";
import type { RestAPIProtocol } from "../rest/types";

export class HistoryAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  createHistory(data: CreateHistoryDTO) {
    return this.fetch.post({
      url: "histories",
      data,
      validate: CreateHistoryResponseSchema.parse,
    });
  }

  patchHistory(historyId: string, data: PatchHistoryDTO) {
    return this.fetch.patch({
      url: "histories/:historyId",
      param: { historyId },
      data,
    });
  }
}
