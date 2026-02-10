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
  weekLabel: string;
  rangeLabel: string;
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
  stripeAssetUrl?: string;
  flexWeights?: number[];

  // 스타일 오버라이드
  barWrapClassName?: string;
  barClassName?: string;
  badgeClassName?: string;
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
  stripeAssetUrl,
  flexWeights,

  barWrapClassName,
  barClassName,
  badgeClassName,
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
                        aria-label={`${d.weekLabel} 스크린타임`}
                      >
                        {d.highlightLabel && (
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                            <span
                              className={cn(
                                "inline-flex h-6 items-center rounded-full px-2 text-xs font-semibold shadow-sm",
                                badgeClassName,
                              )}
                            >
                              {d.highlightLabel}
                            </span>
                          </div>
                        )}

                        <div
                          className={cn(
                            "relative mx-auto w-full overflow-hidden rounded-xl",
                            barWrapClassName,
                          )}
                          style={{ height: barH }}
                        >
                          <div
                            className={cn("absolute inset-0", barClassName)}
                          />

                          {striped && (
                            <StripeOverlay stripeAssetUrl={stripeAssetUrl} />
                          )}

                          {/* optional shine layer: web에서 barWrapClassName에 넣어도 됨 */}
                        </div>
                      </button>
                    </TooltipTrigger>

                    <TooltipContent className={cn(tooltipContentClassName)}>
                      <div className="text-xs font-medium text-gray-500">
                        {d.rangeLabel}
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
                    {d.weekLabel}
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

function StripeOverlay({ stripeAssetUrl }: { stripeAssetUrl?: string }) {
  if (stripeAssetUrl) {
    return (
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `url(${stripeAssetUrl})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.65) 0px, rgba(255,255,255,0.65) 6px, rgba(255,255,255,0) 6px, rgba(255,255,255,0) 12px)",
      }}
    />
  );
}
