"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

import DatePicker from "@/components/DatePicker";
import { GnbTabs, GnbTabsList, GnbTabsTrigger } from "@/components/GNBTabs";

type TabValue = "analysis" | "ai-recap" | "settings";

const TAB = {
  ANALYSIS: "analysis",
  AI_RECAP: "ai-recap",
  SETTINGS: "settings",
} as const satisfies Record<string, TabValue>;

const TAB_TO_PATH: Record<TabValue, string> = {
  analysis: "/analysis",
  "ai-recap": "/ai-recap",
  settings: "/settings",
};

const getTabFromPath = (pathname: string): TabValue => {
  if (pathname.startsWith("/ai-recap")) return "ai-recap";
  if (pathname.startsWith("/settings")) return "settings";
  return "analysis";
};

const GNB = () => {
  const router = useRouter();

  const pathname = usePathname();

  const currentTab = useMemo(() => getTabFromPath(pathname), [pathname]);

  const onTabChange = useCallback(
    (next: string) => {
      if (next !== "analysis" && next !== "ai-recap" && next !== "settings")
        return;
      router.push(TAB_TO_PATH[next], { scroll: false });
    },
    [router],
  );

  return (
    <div className="flex items-center justify-between">
      <GnbTabs value={currentTab} onValueChange={onTabChange} className="w-fit">
        <GnbTabsList>
          <GnbTabsTrigger value={TAB.ANALYSIS}>분석</GnbTabsTrigger>
          <GnbTabsTrigger value={TAB.AI_RECAP}>AI 리캡</GnbTabsTrigger>
          <GnbTabsTrigger value={TAB.SETTINGS}>설정</GnbTabsTrigger>
        </GnbTabsList>
      </GnbTabs>

      <DatePicker queryKey="date" />
    </div>
  );
};

export default GNB;
