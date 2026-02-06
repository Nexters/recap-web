"use client";

import { Tabs, TabsList, TabsTrigger } from "@recap/ui";

export default function Page() {
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
