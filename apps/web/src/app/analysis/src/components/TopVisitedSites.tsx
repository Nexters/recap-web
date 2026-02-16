const TopVisitedSites = () => {
  return (
    <div className="rounded-[1.25rem] bg-white p-10">
      <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
        자주 방문한 사이트
      </h2>

      <div className="mt-6 flex flex-col gap-2">
        {[...Array(3)].map((_, idx) => (
          <div
            className="bg-gray-75 flex items-center justify-between rounded-full p-2"
            key={idx}
          >
            <div className="flex items-center gap-3">
              <div className="size-6 rounded-full bg-gray-300" />
              <p className="text-body-1 text-gray-500">https://www.figma.com</p>
            </div>

            <p className="text-body-1 text-gray-900">20분</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopVisitedSites;
