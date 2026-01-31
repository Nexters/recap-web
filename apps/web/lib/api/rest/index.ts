import { RestAPI, RestAPIInstance } from "./rest";
import type { RestAPIConfig } from "./types";

export { RestAPI } from "./rest";
export type { RestAPIConfig, RestAPIProtocol } from "./types";

const defaultJsonInstance = (baseURL: string) =>
  new RestAPIInstance(baseURL, {
    withCredentials: false,
    headers: { Accept: "application/json" },
  });

const formInstance = (baseURL: string) =>
  new RestAPIInstance(baseURL, {
    withCredentials: false,
  });

export function generateRestAPI(
  config: RestAPIConfig,
  isForm: boolean = false,
  baseURL: string = process.env.NEXT_PUBLIC_BASE_URL ?? "",
) {
  const instance = isForm
    ? formInstance(baseURL)
    : defaultJsonInstance(baseURL);

  return new RestAPI(instance, config);
}
