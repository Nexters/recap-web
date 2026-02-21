import Icon from "@/components/Icon";

const TodayTimeThiefSection = () => {
  return (
    <div className="bg-white px-5 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-subtitle-2-rg whitespace-nowrap text-gray-800">
          오늘의 시간 도둑
        </h2>

        <div className="bg-blue-75 text-label-1 w-fit rounded-xl px-3 py-1 text-gray-900">
          Figma
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <Icon name="figma" className="size-10" />
      </div>
    </div>
  );
};

export default TodayTimeThiefSection;
