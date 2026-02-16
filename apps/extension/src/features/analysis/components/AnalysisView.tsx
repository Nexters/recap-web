import DateRangePicker from "@/components/DateRangePicker";
import WeeklyScreenTimeSection from "@/features/analysis/components/WeeklyScreenTimeSection";

const AnalysisView = () => {
  return (
    <div>
      <DateRangePicker />
      <WeeklyScreenTimeSection />
    </div>
  );
};

export default AnalysisView;
