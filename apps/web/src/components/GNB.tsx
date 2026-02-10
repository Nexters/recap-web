"use client";

import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

import { GnbTabs, GnbTabsList, GnbTabsTrigger } from "@/components/GNBTabs";

const TAB = {
  ANALYSIS: "analysis",
  AI_RECAP: "ai-recap",
  SETTINGS: "settings",
} as const satisfies Record<string, TabValue>;

const TAB_QUERY_KEY = "tab" as const;

const DEFAULT_TAB: TabValue = TAB.ANALYSIS;

const TabSchema = z.enum(["analysis", "ai-recap", "settings"]);

type TabValue = z.infer<typeof TabSchema>;

const GNB = () => {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const rawTab = searchParams.get(TAB_QUERY_KEY);

  const currentTab: TabValue = useMemo(() => {
    return parseTab(rawTab) ?? DEFAULT_TAB;
  }, [rawTab]);

  const onTabChange = useCallback(
    (next: string) => {
      const nextTab = parseTab(next);

      if (!nextTab) return;

      const params = new URLSearchParams(searchParams.toString());

      params.set(TAB_QUERY_KEY, nextTab);

      router.replace(buildUrl(pathname, params), { scroll: false });
    },
    [router, pathname, searchParams],
  );

  useEffect(() => {
    if (parseTab(rawTab)) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set(TAB_QUERY_KEY, DEFAULT_TAB);

    router.replace(buildUrl(pathname, params), { scroll: false });
  }, [rawTab, router, pathname, searchParams]);

  return (
    <GnbTabs value={currentTab} onValueChange={onTabChange} className="w-fit">
      <GnbTabsList>
        <GnbTabsTrigger value={TAB.ANALYSIS}>분석</GnbTabsTrigger>
        <GnbTabsTrigger value={TAB.AI_RECAP}>AI 리캡</GnbTabsTrigger>
        <GnbTabsTrigger value={TAB.SETTINGS}>설정</GnbTabsTrigger>
      </GnbTabsList>
    </GnbTabs>
  );
};

export default GNB;

const buildUrl = (pathname: string, searchParams: URLSearchParams) => {
  const queryString = searchParams.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
};

const parseTab = (raw: string | null): TabValue | null => {
  const parsed = TabSchema.safeParse(raw);

  return parsed.success ? parsed.data : null;
};
