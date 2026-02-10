"use client";

import * as React from "react";
import { cn, WeeklyBarChart, type WeeklyBarDatum } from "@recap/ui";

type Props = React.ComponentPropsWithoutRef<typeof WeeklyBarChart> & {
  data: WeeklyBarDatum[];
};

export function ScreenTimeWeeklyBarChart({ className, ...props }: Props) {
  return (
    <WeeklyBarChart
      className={cn(className)}
      {...props}
      // ✅ 스샷 느낌으로 web에서 스타일 주입
      badgeClassName={cn("bg-blue-600 text-white")}
      labelClassName={cn("text-gray-500")}
      barWrapClassName={cn(
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] overflow-hidden rounded-xl transition-transform duration-150 group-hover:-translate-y-[1px]",
      )}
      barClassName={cn(
        "bg-gradient-to-b from-cyan-200 via-sky-300 to-cyan-400",
      )}
      tooltipContentClassName={cn(
        "rounded-xl bg-white px-4 py-3 text-sm text-gray-900 shadow-lg ring-1 ring-black/10",
      )}
    />
  );
}
