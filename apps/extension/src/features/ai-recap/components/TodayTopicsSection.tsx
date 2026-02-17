const TodayTopicsSection = () => {
  return (
    <div className="py-8 px-5">
      <p className="text-subtitle-2-rg text-gray-800">오늘의 주제</p>

      <div className="relative h-60 mt-4 overflow-hidden rounded-xl bg-blue-50 px-6 py-6">
        <div className="bg-gradient-04 text-heading-sb absolute left-24 top-6 -rotate-[9.41deg] rounded-full border-8 border-white px-9 py-3 text-center text-white">
          #손흥민
        </div>
        <div className="bg-gradient-05 text-heading-sb absolute left-2 top-20 rotate-[11.17deg] rounded-full border-8 border-white px-9 py-3 text-center text-white">
          #주식시장
        </div>
        <div className="bg-gradient-06 text-heading-sb absolute left-23 top-36 -rotate-[10.56deg] rounded-full border-8 border-white px-9 py-3 text-center text-white">
          #TypeScript
        </div>
      </div>
    </div>
  );
};

export default TodayTopicsSection;
