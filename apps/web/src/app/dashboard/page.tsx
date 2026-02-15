import CategoryAnalysis from "@/app/dashboard/src/CategoryAnalysis";
import ScreenTime from "@/app/dashboard/src/ScreenTime";
import WorkPattern from "@/app/dashboard/src/WorkPattern";
import GNB from "@/components/GNB";

export default function DashboardPage() {
  return (
    <div className="mt-20 mb-20 flex flex-col gap-7">
      <GNB />

      <ScreenTime />

      <CategoryAnalysis />

      <div className="grid grid-cols-2 gap-7">
        <WorkPattern />
      </div>
    </div>
  );
}
