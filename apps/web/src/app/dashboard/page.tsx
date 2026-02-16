import CategoryAnalysis from "@/app/dashboard/src/CategoryAnalysis";
import ScreenTime from "@/app/dashboard/src/ScreenTime";
import TodayTimeThief from "@/app/dashboard/src/TodayTimeThief";
import TopVisitedSites from "@/app/dashboard/src/TopVisitedSites";
import WorkPattern from "@/app/dashboard/src/WorkPattern";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import GNB from "@/components/GNB";

export default function DashboardPage() {
  return (
    <div className="mt-20 mb-35 flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <GNB />

        <div className="bg-gray-75 cursor-pointer rounded-full border border-solid border-gray-200 p-2 shadow-[inset_4px_5px_9.5px_0_#9CA5AF33]">
          <div className="flex items-center gap-1 py-1.5 pr-1 pl-2.5">
            <p className="text-subtitle-2-rg text-gray-900">2026.01.03</p>
            <ArrowDownIcon />
          </div>
        </div>
      </div>

      <ScreenTime />

      <CategoryAnalysis />

      <div className="grid grid-cols-2 gap-7">
        <WorkPattern />

        <TodayTimeThief />
      </div>

      <TopVisitedSites />
    </div>
  );
}
