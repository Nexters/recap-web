import type { GoogleOAuthLoginDTO } from "app/(auth)/src/service/schema/google-oauth-login.schema";
import type { RestAPIProtocol } from "lib/api/rest/types";

export class AuthAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  googleOauthLogin(data: GoogleOAuthLoginDTO) {
    return this.fetch.post({
      url: "login",
      data,
    });
  }
}
