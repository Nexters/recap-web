"use client";

import { cn, WeeklyBarChart, type WeeklyBarDatum } from "@recap/ui";

interface ScreenTimeWeeklyBarChartProps extends React.ComponentPropsWithoutRef<
  typeof WeeklyBarChart
> {
  data: WeeklyBarDatum[];
}

const ScreenTimeWeeklyBarChart = ({
  className,
  ...props
}: ScreenTimeWeeklyBarChartProps) => {
  return (
    <WeeklyBarChart
      className={cn(className)}
      {...props}
      labelClassName={cn("text-gray-500")}
      barWrapClassName={cn(
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] overflow-hidden transition-transform duration-150 group-hover:-translate-y-[1px]",
      )}
      barClassName={cn("bg-gradient-03")}
      tooltipContentClassName={cn(
        "rounded-xl bg-white px-4 py-3 text-sm text-gray-900 shadow-lg ring-1 ring-black/10",
      )}
    />
  );
};

export default ScreenTimeWeeklyBarChart;
