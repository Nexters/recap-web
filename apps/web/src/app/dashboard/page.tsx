import CategoryAnalysis from "@/app/dashboard/src/CategoryAnalysis";
import ScreenTime from "@/app/dashboard/src/ScreenTime";
import TodayTimeThief from "@/app/dashboard/src/TodayTimeThief";
import TopVisitedSites from "@/app/dashboard/src/TopVisitedSites";
import WorkPattern from "@/app/dashboard/src/WorkPattern";
import GNB from "@/components/GNB";

export default function DashboardPage() {
  return (
    <div className="mt-20 mb-35 flex flex-col gap-7">
      <GNB />

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
