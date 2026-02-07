import { generateRestAPI } from "@recap/api";
import { AuthAPIService } from "app/(auth)/src/service/auth-api.service";

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
