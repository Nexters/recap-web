import Divider from "@/components/Divider";

const TodayRecapSection = () => {
  return (
    <div className="bg-white pt-4 px-5">
      <div className="space-y-2">
        <p className="text-subtitle-2-rg text-gray-800">Today’s Recap</p>
        <h2 className="text-headline-sb text-gray-900">집중적인 연구의 하루</h2>
      </div>
      <div className="mt-4 rounded-[0.75rem] bg-gray-75 flex flex-col">
        <div className="w-full h-36 bg-blue-50 rounded-t-[0.75rem]" />
        <div className="flex items-center">
          <div className="flex flex-1 flex-col py-3 pl-4 gap-1">
            <p className="text-label-2 text-gray-500">총 스크린타임</p>
            <p className="text-body-2 text-gray-900">5시간 35분</p>
          </div>
          <Divider className="w-0.5 h-12 mx-4" />
          <div className="flex flex-1 flex-col py-3 pl-4 gap-1">
            <p className="text-label-2 text-gray-500">측정시간</p>
            <p className="text-body-2 text-gray-900">08am - 12pm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayRecapSection;
