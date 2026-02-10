"use client";

import ScreenTimeWeeklyCard from "../components/ScreenTimeWeeklyCard";

// export default async function Page() {

//   return <HydrationBoundary state={state}>page</HydrationBoundary>;
// "use client";

export default function Page() {
  //   const qc = createQueryClient();

  // // await qc.prefetchQuery({ queryKey: ["me"], queryFn: fetchMe });

  // const state = dehydrateState(qc);
  return (
    <div className="mt-20 ml-20">
      {/* <GNB /> */}
      <ScreenTimeWeeklyCard />
    </div>
  );
}
