import type { RestAPIProtocol } from "@recap/api";
import type { GoogleOAuthLoginDTO } from "src/services/auth/schema/google-oauth-login.schema";

export class AuthAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  googleOauthLogin(data: GoogleOAuthLoginDTO) {
    return this.fetch.post({
      url: "login",
      data,
    });
  }
}
