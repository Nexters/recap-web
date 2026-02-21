"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { analysisAPIService } from "@/app/analysis/src/service";

const formatMinutesFromSeconds = (seconds: number) => {
  const minutes = Math.max(0, Math.round(seconds / 60));
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h <= 0) return `${m}분`;
  if (m <= 0) return `${h}시간`;
  return `${h}시간 ${m}분`;
};

const getHostLabel = (domain: string | null) => {
  if (!domain) return null;

  const v = domain.trim();
  if (!v) return "-";
  const host = v.replace(/^https?:\/\//, "").split("/")[0];
  return host?.split(".")[0] || host;
};

const TodayTimeThief = ({ date }: { date: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getTopVisitedSite", date],
    queryFn: () => analysisAPIService.getLongestStayedWebsite({ date }),
  });

  const served = useMemo(() => {
    const site = data?.data;

    if (!site) {
      return {
        isEmpty: true,
        title: "-",
        durationText: "-",
        domainText: "-",
        faviconUrl: "",
      };
    }

    return {
      isEmpty: false,
      title: getHostLabel(site.domain),
      durationText: formatMinutesFromSeconds(site.stayDuration ?? 0),
      domainText: site.domain,
      faviconUrl: site.faviconUrl ?? "",
    };
  }, [data]);

  return (
    <div className="rounded-[1.25rem] bg-white p-10">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-rg whitespace-nowrap text-gray-800">
          오늘의 시간 도둑
        </h2>

        <p className="text-body-1 text-gray-500">
          {isLoading || served.isEmpty ? "-" : `총 ${served.durationText}`}
        </p>
      </div>

      <div className="bg-blue-75 text-title-1 mt-2 w-fit rounded-xl px-3 py-1 text-gray-900">
        {isLoading ? "-" : served.title}
      </div>

      <div className="mt-3.5 mr-20 flex justify-end">
        {served.faviconUrl ? (
          <Image
            src={served.faviconUrl}
            alt="faviconImg"
            width={80}
            height={80}
          />
        ) : null}
      </div>
    </div>
  );
};

export default TodayTimeThief;
