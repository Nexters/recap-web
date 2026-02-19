import { generateRestAPI } from "@recap/api";

import { AuthAPIService } from "@/entities/auth/api/auth.api";

export const authAPIService = new AuthAPIService(
  generateRestAPI(
    {
      APIbaseURL: "api/v1/auth",
    },
    {
      baseURL: import.meta.env.VITE_BACKEND_URL || "",
    },
  ),
);
