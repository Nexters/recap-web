import { AuthAPIService } from "app/(auth)/src/service/auth-api.service";
import { generateRestAPI } from "lib/api/rest";

export const authAPIService = new AuthAPIService(
  generateRestAPI(
    {
      baseURL: "api/v1/auth",
    },
    false,
    process.env.NEXT_PUBLIC_BACKEND_URL,
  ),
);
