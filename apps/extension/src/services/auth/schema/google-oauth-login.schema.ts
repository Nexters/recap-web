export type GoogleOAuthLoginDTO = {
  oAuthToken: string;
  provider: "GOOGLE";
};

export type BackendLoginResponse = {
  accessToken: string;
  refreshToken: string;
};
