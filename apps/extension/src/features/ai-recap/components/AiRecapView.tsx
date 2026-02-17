import Divider from "@/components/Divider";
import TodayRecapDetail from "@/features/ai-recap/components/TodayRecapDetail";
import TodayRecapSection from "@/features/ai-recap/components/TodayRecapSection";

const AiRecapView = () => {
  return (
    <>
      <TodayRecapSection />
      <TodayRecapDetail />
      <Divider />
    </>
  );
};

export default AiRecapView;
