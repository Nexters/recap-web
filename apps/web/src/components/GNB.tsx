"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
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

function getTabFromPath(pathname: string): TabValue {
  if (pathname.startsWith("/ai-recap")) return "ai-recap";
  if (pathname.startsWith("/settings")) return "settings";
  return "analysis";
}

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

      <div className="bg-gray-75 cursor-pointer rounded-full border border-solid border-gray-200 p-2 shadow-[inset_4px_5px_9.5px_0_#9CA5AF33]">
        <div className="flex items-center gap-1 py-1.5 pr-1 pl-2.5">
          <p className="text-subtitle-2-rg text-gray-900">2026.01.03</p>
          <ArrowDownIcon />
        </div>
      </div>
    </div>
  );
};

export default GNB;
