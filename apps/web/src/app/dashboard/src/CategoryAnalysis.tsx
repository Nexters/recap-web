import React from "react";
import { Badge } from "@recap/ui";

import { BubbleCloudFalling } from "@/app/dashboard/src/BubbleCloud";

const CategoryAnalysis = () => {
  return (
    <div className="flex rounded-[1.25rem] bg-white">
      <div className="w-full p-10">
        <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
          카테고리별 분석
        </h2>

        <h3 className="text-title-1 mt-2 whitespace-nowrap text-gray-900">
          <span className="text-blue-400">쇼핑</span>에{" "}
          <span className="text-blue-400">3시간 30분</span> 몰두했어요
        </h3>

        <BubbleCloudFalling />

        <div className="mt-9 flex items-center gap-1.5">
          <Badge>전체</Badge>
          <Badge variant="secondary">생활 / 편의</Badge>
          <Badge variant="secondary">커뮤니티</Badge>
          <Badge variant="secondary">디자인</Badge>
          <Badge variant="secondary">콘텐츠</Badge>
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalysis;
