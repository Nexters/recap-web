"use client";

import { Badge } from "@recap/ui";

import GNB from "@/components/GNB";

export default function Page() {
  //   const qc = createQueryClient();

  // // await qc.prefetchQuery({ queryKey: ["me"], queryFn: fetchMe });

  // const state = dehydrateState(qc);

  return (
    <div className="mt-20 ml-20">
      <GNB />
      <Badge>오늘</Badge>
      <Badge variant="secondary">주간</Badge>
      {/*  return <HydrationBoundary state={state}>page</HydrationBoundary>; */}
    </div>
  );
}
