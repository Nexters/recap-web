import { QueryClient } from "@tanstack/react-query";

export type CreateQueryClientOptions = {
  staleTimeMs?: number;
  gcTimeMs?: number;
  retry?: number | ((failureCount: number, error: unknown) => boolean);
};

export function createQueryClient(opts?: CreateQueryClientOptions) {
  const staleTime = opts?.staleTimeMs ?? 30000;
  const gcTime = opts?.gcTimeMs ?? 10 * 60000;

  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime,
        gcTime,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: false,
      },
    },
  });
}
