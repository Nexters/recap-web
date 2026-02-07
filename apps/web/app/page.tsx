"use client";

import GNB from "components/GNB";

// export default async function Page() {

//   return <HydrationBoundary state={state}>page</HydrationBoundary>;
// "use client";

export default function Page() {
  //   const qc = createQueryClient();

  // // await qc.prefetchQuery({ queryKey: ["me"], queryFn: fetchMe });

  // const state = dehydrateState(qc);
  return (
    <div className="w-100 mt-20 ml-20">
      <GNB />
    </div>
  );
}
