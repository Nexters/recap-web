"use client";

import { cn } from "./utils/cn";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

export type WeeklyBarDatum = {
  key: string;
  label: string;
  subLabel?: string;
  totalMinutes: number;
  avgMinutes: number;
  highlightLabel?: string;
};

export type WeeklyBarChartProps = {
  data: WeeklyBarDatum[];
  className?: string;
  height?: number;
  minBarHeight?: number;
  striped?: boolean;
  flexWeights?: number[];

  barWrapClassName?: string;
  barClassName?: string;
  labelClassName?: string;
  tooltipContentClassName?: string;
  tooltipArrowClassName?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function formatHhMm(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}시간 ${m}분`;
}

export function formatDayHhMmFromWeekAvg(avgMinutes: number) {
  return `하루 ${formatHhMm(avgMinutes)}`;
}

export function WeeklyBarChart({
  data,
  className,
  height = 140,
  minBarHeight = 10,
  striped = true,
  flexWeights,
  barWrapClassName,
  barClassName,
  labelClassName,
  tooltipContentClassName,
  tooltipArrowClassName,
}: WeeklyBarChartProps) {
  const maxTotal = Math.max(...data.map((d) => d.totalMinutes), 1);

  return (
    <TooltipProvider delayDuration={120}>
      <div className={cn("relative w-full", className)}>
        <div className="relative" style={{ height }}>
          <div className="flex h-full w-full items-end justify-between gap-3">
            {data.map((d, idx) => {
              const ratio = d.totalMinutes / maxTotal;
              const barH = clamp(
                Math.round(ratio * (height - 10)),
                minBarHeight,
                height,
              );

              const weight =
                flexWeights && flexWeights[idx] != null ? flexWeights[idx] : 1;

              return (
                <div
                  key={d.key}
                  className="flex min-w-0 flex-col items-center gap-2"
                  style={{ flex: weight }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="group relative w-full focus:outline-none"
                        aria-label={`${d.label} 스크린타임`}
                      >
                        <div
                          className={cn(
                            "relative mx-auto w-full overflow-hidden rounded-t-xl",
                            barWrapClassName,
                          )}
                          style={{ height: barH }}
                        >
                          <div
                            className={cn("absolute inset-0", barClassName)}
                          />

                          {striped && (
                            <div
                              className="absolute inset-0 bg-blue-100"
                              style={{
                                WebkitMaskImage:
                                  "repeating-linear-gradient(135deg, #000 0px, #000 1px, transparent 1px, transparent 12px)",
                                maskImage:
                                  "repeating-linear-gradient(135deg, #000 0px, #000 1px, transparent 1px, transparent 12px)",
                                transform: "translateZ(0)",
                              }}
                            />
                          )}
                        </div>
                      </button>
                    </TooltipTrigger>

                    <TooltipContent className={cn(tooltipContentClassName)}>
                      <div className="text-xs font-medium text-gray-500">
                        {d.subLabel}
                      </div>

                      <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                        <div className="text-gray-700">누적</div>
                        <div className="text-right font-semibold">
                          {formatHhMm(d.totalMinutes)}
                        </div>

                        <div className="text-gray-700">평균</div>
                        <div className="text-right font-semibold">
                          {formatHhMm(d.avgMinutes)}
                        </div>
                      </div>

                      <TooltipArrow className={cn(tooltipArrowClassName)} />
                    </TooltipContent>
                  </Tooltip>

                  <div className={cn("text-xs font-medium", labelClassName)}>
                    {d.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
