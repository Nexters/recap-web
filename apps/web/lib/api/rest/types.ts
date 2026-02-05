export type PathParams = Record<string, string | number>;
export type QueryParams = Record<
  string,
  string | number | boolean | (string | number | boolean)[] | undefined
>;

export type RestAPIConfig = {
  baseURL?: string;
};

export type RestRequestOptions<T> = {
  url: string;
  param?: PathParams;
  query?: QueryParams;
  data?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
  parseAs?: "json" | "text" | "blob";
  validate?: (input: unknown) => T;
  signal?: AbortSignal;
  credentials?: RequestCredentials;
  method?: string;
};

export interface RestAPIProtocol {
  get<T = unknown>(opts: RestRequestOptions<T>): Promise<T>;
  post<T = unknown>(opts: RestRequestOptions<T>): Promise<T>;
  put<T = unknown>(opts: RestRequestOptions<T>): Promise<T>;
  patch<T = unknown>(opts: RestRequestOptions<T>): Promise<T>;
  delete<T = unknown>(opts: RestRequestOptions<T>): Promise<T>;
}
