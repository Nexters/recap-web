"use client";

import { useMemo, useState } from "react";
import { Badge, type WeeklyBarDatum } from "@recap/ui";

import { ScreenTimeWeeklyBarChart } from "@/components/ScreenTimeWeeklyBarChart";

type ViewMode = "today" | "week";

const ScreenTime = () => {
  const [mode, setMode] = useState<ViewMode>("week");

  const todayData: WeeklyBarDatum[] = useMemo(() => {
    const blocks = Array.from({ length: 12 }, (_, i) => {
      const startHour = i * 2;
      return {
        key: `today-${startHour}`,
        label: String(startHour),
        subLabel: `오늘 ${String(startHour).padStart(2, "0")}:00 - ${String(
          startHour + 2,
        ).padStart(2, "0")}:00`,
        totalMinutes: 0,
        avgMinutes: 0,
      };
    });

    if (blocks[4]) blocks[4].totalMinutes = 30;
    if (blocks[5]) blocks[5].totalMinutes = 80;
    if (blocks[6]) blocks[6].totalMinutes = 120;
    if (blocks[7]) blocks[7].totalMinutes = 60;
    blocks.forEach((b) => (b.avgMinutes = b.totalMinutes));

    return blocks;
  }, []);

  const weekData: WeeklyBarDatum[] = useMemo(() => {
    const labels = ["일", "월", "화", "수", "목", "금", "토"];

    const blocks = labels.map((label, idx) => ({
      key: `week-${idx}-${label}`,
      label,
      subLabel: "01.01 - 01.07",
      totalMinutes: 0,
      avgMinutes: 0,
    }));

    if (blocks[0]) blocks[0].totalMinutes = 60;
    if (blocks[1]) blocks[1].totalMinutes = 180;
    if (blocks[2]) blocks[2].totalMinutes = 240;
    if (blocks[3]) blocks[3].totalMinutes = 120;
    if (blocks[4]) blocks[4].totalMinutes = 90;
    if (blocks[5]) blocks[5].totalMinutes = 30;
    if (blocks[6]) blocks[6].totalMinutes = 200;
    blocks.forEach((b) => (b.avgMinutes = b.totalMinutes));

    return blocks;
  }, []);

  const chartData = mode === "today" ? todayData : weekData;

  return (
    <div className="flex rounded-[1.25rem] bg-white">
      <div className="p-10">
        <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
          이번주 평균 스크린타임
        </h2>

        <h3 className="text-title-1 mt-2 whitespace-nowrap text-gray-900">
          하루 109시간 2분
        </h3>
      </div>

      <div className="w-full px-6 pt-10 pb-3">
        <div className="flex items-center gap-2">
          <Badge
            variant={mode === "today" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setMode("today")}
          >
            오늘
          </Badge>
          <Badge
            variant={mode === "week" ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setMode("week")}
          >
            주간
          </Badge>
        </div>

        <div className="mt-12">
          <ScreenTimeWeeklyBarChart
            data={chartData}
            height={140}
            minBarHeight={10}
            striped
          />
        </div>
      </div>
    </div>
  );
};

export default ScreenTime;
