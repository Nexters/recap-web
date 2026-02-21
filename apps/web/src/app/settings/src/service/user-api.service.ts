import type { RestAPIProtocol } from "@recap/api";

export class UserAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  getUserProfile() {
    return this.fetch.get({
      url: "users/me/profiles",
    });
  }
}
