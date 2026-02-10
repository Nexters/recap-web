"use client";

import * as React from "react";
import { formatDayHhMmFromWeekAvg, type WeeklyBarDatum } from "@recap/ui";

import { ScreenTimeWeeklyBarChart } from "./ScreenTimeWeeklyBarChart";

type WeekDatum = {
  weekLabel: string;
  rangeLabel: string;
  totalMinutes: number;
  avgMinutes: number;
  highlight?: boolean;
};

export default function ScreenTimeWeeklyCard() {
  const data: WeekDatum[] = [
    {
      weekLabel: "1주",
      rangeLabel: "01.01 - 01.07",
      totalMinutes: 6800,
      avgMinutes: 6542,
    },
    {
      weekLabel: "2주",
      rangeLabel: "01.08 - 01.14",
      totalMinutes: 3200,
      avgMinutes: 3100,
    },
    {
      weekLabel: "3주",
      rangeLabel: "01.15 - 01.21",
      totalMinutes: 1800,
      avgMinutes: 1700,
    },
    {
      weekLabel: "4주",
      rangeLabel: "01.22 - 01.28",
      totalMinutes: 7200,
      avgMinutes: 6900,
      highlight: true,
    },
  ];

  const selectedIndex = 0;
  const weekAvgForTitle = data[selectedIndex]?.avgMinutes ?? 0;

  const chartData: WeeklyBarDatum[] = data.map((d, idx) => ({
    key: `${idx}-${d.weekLabel}`,
    weekLabel: d.weekLabel,
    rangeLabel: d.rangeLabel,
    totalMinutes: d.totalMinutes,
    avgMinutes: d.avgMinutes,
  }));

  return (
    <div className="w-full max-w-[980px] rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-6 p-6">
        <div className="min-w-[260px]">
          <div className="text-[15px] font-medium text-gray-700">
            이번주 평균 스크린타임
          </div>
          <div className="mt-2 text-[28px] font-semibold tracking-tight text-gray-900">
            {formatDayHhMmFromWeekAvg(weekAvgForTitle)}
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-start"></div>

          <div className="mt-5">
            <ScreenTimeWeeklyBarChart
              data={chartData}
              height={140}
              minBarHeight={10}
              striped
            />
          </div>
        </div>
      </div>
    </div>
  );
}
