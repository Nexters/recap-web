"use client";

import { Tabs, TabsList, TabsTrigger } from "@recap/ui";

export default function Page() {
  return (
    <Tabs defaultValue="a">
      <TabsList className="bg-surface border border-border2">
        <TabsTrigger value="a">A</TabsTrigger>
        <TabsTrigger value="b">B</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
