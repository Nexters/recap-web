import { Badge, type WeeklyBarDatum } from "@recap/ui";

import { ScreenTimeWeeklyBarChart } from "@/components/ScreenTimeWeeklyBarChart";

type WeekDatum = {
  weekLabel: string;
  rangeLabel: string;
  totalMinutes: number;
  avgMinutes: number;
  highlight?: boolean;
};

const ScreenTime = () => {
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

  const chartData: WeeklyBarDatum[] = data.map((d, idx) => ({
    key: `${idx}-${d.weekLabel}`,
    weekLabel: d.weekLabel,
    rangeLabel: d.rangeLabel,
    totalMinutes: d.totalMinutes,
    avgMinutes: d.avgMinutes,
  }));

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
          <Badge variant="secondary">오늘</Badge>
          <Badge>주간</Badge>
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
