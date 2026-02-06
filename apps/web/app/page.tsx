// import { createQueryClient } from "@recap/react-query";
// import { dehydrateState } from "@recap/react-query";
// import { HydrationBoundary } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@recap/ui";

// export default async function Page() {

//   return <HydrationBoundary state={state}>page</HydrationBoundary>;
// "use client";

export default function Page() {
  //   const qc = createQueryClient();

  // // await qc.prefetchQuery({ queryKey: ["me"], queryFn: fetchMe });

  // const state = dehydrateState(qc);
  return (
    <Tabs defaultValue="a">
      <TabsList className="bg-surface border border-border2">
        <TabsTrigger value="a">A</TabsTrigger>
        <TabsTrigger value="b">B</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
