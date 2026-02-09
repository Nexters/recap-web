import { dehydrate, type QueryClient } from "@tanstack/react-query";

export function dehydrateState(queryClient: QueryClient) {
  return dehydrate(queryClient, {
    shouldDehydrateQuery: (q) => q.state.status === "success",
  });
}
