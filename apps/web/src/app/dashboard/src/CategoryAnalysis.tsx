import React from "react";

const CategoryAnalysis = () => {
  return (
    <div className="flex rounded-[1.25rem] bg-white">
      <div className="p-10">
        <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
          카테고리별 분석
        </h2>

        <h3 className="text-title-1 mt-2 whitespace-nowrap text-gray-900">
          <span className="text-blue-400">쇼핑</span>에{" "}
          <span className="text-blue-400">3시간 30분</span> 몰두했어요
        </h3>
      </div>
    </div>
  );
};

export default CategoryAnalysis;
