import { generateRestAPI } from "@recap/api";

import { createAuthedRestAPI } from "@/app/(auth)/src/lib/create-authed-rest";
import { AuthAPIService } from "@/app/(auth)/src/service/auth-api.service";

export const authAPIService = new AuthAPIService(
  generateRestAPI(
    {
      APIbaseURL: `api/v1/auth`,
    },
    {
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
    },
  ),
);

export const authWithTokenAPIService = new AuthAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || ""),
);
