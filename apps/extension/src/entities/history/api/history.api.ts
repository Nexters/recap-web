import type { RestAPIProtocol } from "@recap/api";

import type { CreateHistoryDTO } from "@/entities/history/model/history.type";

export class HistoryAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  createHistory(data: CreateHistoryDTO) {
    return this.fetch.post({
      url: "histories",
      data,
    });
  }
}
