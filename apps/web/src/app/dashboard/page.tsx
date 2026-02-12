import CategoryAnalysis from "@/app/dashboard/src/CategoryAnalysis";
import ScreenTime from "@/app/dashboard/src/ScreenTime";
import GNB from "@/components/GNB";

export default function DashboardPage() {
  return (
    <div className="mt-20 flex flex-col gap-7">
      <GNB />

      <ScreenTime />

      <CategoryAnalysis />
    </div>
  );
}
