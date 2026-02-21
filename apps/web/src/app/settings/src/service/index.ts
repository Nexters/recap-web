import { createAuthedRestAPI } from "@/app/(auth)/src/lib/create-authed-rest";
import { UserAPIService } from "@/app/settings/src/service/user-api.service";

export const userAPIService = new UserAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || ""),
);
