import { useState } from "react";

import { ScreenTimeWeeklyBarChart } from "@/components/ScreenTimeWeeklyBarChart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ToggleGroup";
import { DUMMY_CHART_DATA } from "@/features/ai-recap/const/dummy.const";

type ViewMode = "today" | "week";

const WeeklyScreenTimeSection = () => {
  const [mode, setMode] = useState<ViewMode>("week");

  return (
    <div className="w-full bg-white flex flex-col py-4 px-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-subtitle-2-rg whitespace-nowrap text-gray-800">
            이번주 평균 스크린타임
          </h2>
          <h3 className="text-headline-sb mt-2 whitespace-nowrap text-gray-900">
            하루 109시간 2분
          </h3>
        </div>
        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={(value) => {
            if (value.length === 0) return;
            setMode(value as ViewMode);
          }}
        >
          <ToggleGroupItem value="today" position="left">
            오늘
          </ToggleGroupItem>
          <ToggleGroupItem value="week" position="right">
            주간
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="h-6" />

      <ScreenTimeWeeklyBarChart
        data={DUMMY_CHART_DATA}
        height={100}
        className="mt-20"
        minBarHeight={10}
        striped
      />
    </div>
  );
};

export default WeeklyScreenTimeSection;
