import { HistoryAPIService } from "@recap/api";

import { createAuthedRestAPI } from "@/entities/auth/lib/create-authed-rest";

export const historyAPIService = new HistoryAPIService(
  createAuthedRestAPI(import.meta.env.VITE_BACKEND_URL || "", {
    apiBaseURL: "v1",
  }),
);
