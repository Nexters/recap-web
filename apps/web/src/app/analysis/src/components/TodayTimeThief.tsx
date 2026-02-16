import FigmaIcon from "@/assets/icons/figma.svg";

const TodayTimeThief = () => {
  return (
    <div className="rounded-[1.25rem] bg-white p-10">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
          오늘의 시간 도둑
        </h2>

        <p className="text-body-1 text-gray-500">총 5시간 25분</p>
      </div>

      <div className="bg-blue-75 text-title-1 mt-2 w-fit rounded-xl px-3 py-1 text-gray-900">
        Figma
      </div>

      <div className="mt-3.5 mr-20 flex justify-end">
        <FigmaIcon />
      </div>
    </div>
  );
};

export default TodayTimeThief;
