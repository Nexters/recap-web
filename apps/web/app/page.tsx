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
    <div className="w-[400px] mt-20 ml-20">
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">분석</TabsTrigger>
          <TabsTrigger value="b">AI 리캡</TabsTrigger>
          <TabsTrigger value="c">설정</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
