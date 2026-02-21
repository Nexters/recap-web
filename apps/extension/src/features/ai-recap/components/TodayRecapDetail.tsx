import Divider from "@/components/Divider";

const TodayRecapDetail = () => {
  return (
    <>
      <div className="pt-4 px-6 pb-6">
        <p className="text-subtitle-2-sb text-gray-500">01</p>
        <p className="text-subtitle-2-sb mt-1 text-gray-900">
          개발하며 고군분투한 하루
        </p>
        <p className="text-body-2 mt-4 text-gray-900">
          오늘은 주로 개발과 학습에 집중하셨네요. 오전 10시부터 오후 3시까지
          가장 활발한 활동을 보였으며, 오늘은 주로 개발과 학습에 집중하셨네요.
        </p>
      </div>

      <Divider className="h-[0.0625rem] w-full" />

      <div className="pt-4 px-6 pb-6">
        <p className="text-subtitle-2-sb text-gray-500">02</p>
        <p className="text-subtitle-2-sb mt-1 text-gray-900">
          업무 효율화를 위한 여정
        </p>
        <p className="text-body-2 mt-4 text-gray-900">
          AI와 피그마를 연결하거나, 디자인 시스템 정비를 위한 MCP(Model Context
          Protocol) 활용법 등 최신 AI 툴을 업무에 녹여내려 노력했어요.
        </p>
      </div>
    </>
  );
};

export default TodayRecapDetail;
