import RecapSummary from "@/app/ai-recap/src/components/RecapSummary";
import Timeline from "@/app/ai-recap/src/components/Timeline";
import TopVisitedTopics from "@/app/ai-recap/src/components/TopVisitedTopics";

export default function AIRecapPage() {
  return (
    <>
      <RecapSummary />
      <Timeline />
      <TopVisitedTopics />
    </>
  );
}
