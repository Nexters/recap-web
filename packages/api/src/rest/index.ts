import { RestAPI, RestAPIInstance } from "./rest";
import type { RestAPIConfig, RestAPIProtocol } from "./types";

type GenerateRestAPIOptions = {
  baseURL: string;
  isForm?: boolean;
  withCredentials?: boolean;
  headers?: Record<string, string>;
};

const defaultJsonInstance = (
  baseURL: string,
  withCredentials: boolean,
  headers?: Record<string, string>,
) =>
  new RestAPIInstance(baseURL, {
    withCredentials,
    headers: { Accept: "application/json", ...(headers ?? {}) },
  });

const formInstance = (
  baseURL: string,
  withCredentials: boolean,
  headers?: Record<string, string>,
) =>
  new RestAPIInstance(baseURL, {
    withCredentials,
    headers: { ...(headers ?? {}) },
  });

export function generateRestAPI(
  config: RestAPIConfig,
  opts: GenerateRestAPIOptions,
): RestAPIProtocol {
  const { baseURL, isForm = false, withCredentials = false, headers } = opts;

  const instance = isForm
    ? formInstance(baseURL, withCredentials, headers)
    : defaultJsonInstance(baseURL, withCredentials, headers);

  return new RestAPI(instance, config);
}
