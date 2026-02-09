import { createQueryClient } from "@recap/react-query";
import { dehydrateState } from "@recap/react-query";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function Page() {
  const qc = createQueryClient();

  // await qc.prefetchQuery({ queryKey: ["me"], queryFn: fetchMe });

  const state = dehydrateState(qc);

  return <HydrationBoundary state={state}>page</HydrationBoundary>;
}
