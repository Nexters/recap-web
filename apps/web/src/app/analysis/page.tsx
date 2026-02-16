import CategoryAnalysis from "@/app/analysis/src/components/CategoryAnalysis";
import ScreenTime from "@/app/analysis/src/components/ScreenTime";
import TodayTimeThief from "@/app/analysis/src/components/TodayTimeThief";
import TopVisitedSites from "@/app/analysis/src/components/TopVisitedSites";
import WorkPattern from "@/app/analysis/src/components/WorkPattern";

export default function AnalysisPage() {
  return (
    <>
      <ScreenTime />
      <CategoryAnalysis />
      <div className="grid grid-cols-2 gap-7">
        <WorkPattern />
        <TodayTimeThief />
      </div>
      <TopVisitedSites />
    </>
  );
}
