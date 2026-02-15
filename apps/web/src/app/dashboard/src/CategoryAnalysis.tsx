import React from "react";
import { Badge, cn } from "@recap/ui";

import { BubbleCloudFalling } from "@/app/dashboard/src/BubbleCloud";

type AppIcon = {
  key: string;
  label: string;
  bgClassName: string;
  textClassName?: string;
};

const COLS = 2;

const DEFAULT_APPS: AppIcon[] = [
  { key: "zigzag", label: "Z", bgClassName: "bg-fuchsia-400" },
  {
    key: "wconcept",
    label: "W",
    bgClassName: "bg-yellow-300",
    textClassName: "text-gray-900",
  },
  { key: "coupang", label: "쿠", bgClassName: "bg-red-500" },
  { key: "naver", label: "N", bgClassName: "bg-emerald-500" },
  { key: "steam", label: "S", bgClassName: "bg-slate-900" },
];

const CategoryAnalysis = () => {
  const items = [...Array(6)];

  const rowCount = Math.ceil(items.length / COLS);

  return (
    <div className="flex rounded-[1.25rem] bg-white">
      <div className="w-full p-10">
        <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
          카테고리별 분석
        </h2>

        <h3 className="text-title-1 mt-2 whitespace-nowrap text-gray-900">
          <span className="text-blue-400">쇼핑</span>에{" "}
          <span className="text-blue-400">3시간 30분</span> 몰두했어요
        </h3>

        <BubbleCloudFalling />

        <div className="mt-9 flex items-center gap-1.5">
          <Badge>전체</Badge>
          <Badge variant="secondary">생활 / 편의</Badge>
          <Badge variant="secondary">커뮤니티</Badge>
          <Badge variant="secondary">디자인</Badge>
          <Badge variant="secondary">콘텐츠</Badge>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-8">
          {items.map((_, idx) => {
            const rowIndex = Math.floor(idx / COLS);
            const isLastRow = rowIndex === rowCount - 1;

            return (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-between py-4",
                  !isLastRow && "border-b border-gray-200",
                )}
              >
                <div className="flex items-center gap-2">
                  <div className="flex size-4.5 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                    1
                  </div>

                  <p className="text-subtitle-1-sb text-gray-900">생활/편의</p>

                  <p className="text-subtitle-2-rg text-gray-800">20분</p>
                </div>

                <div className="flex items-center">
                  {DEFAULT_APPS.map((icon, idx) => (
                    <div key={icon.key} className={cn(idx !== 0 && "-ml-1")}>
                      <AppIconPill icon={icon} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalysis;

function AppIconPill({ icon }: { icon: AppIcon }) {
  return (
    <div
      className={[
        "flex h-7 w-7 items-center justify-center rounded-full",
        "ring-2 ring-white",
        icon.bgClassName,
        icon.textClassName ?? "text-white",
      ].join(" ")}
      title={icon.key}
    >
      <span className="text-xs font-bold">{icon.label}</span>
    </div>
  );
}
