"use client";

import { useCustomScrollbar } from "@/app/ai-recap/src/hooks/useCustomScrollbar";
import TimeLineBackgroundImg from "@/assets/img/timeline-bg.png";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

const Timeline = () => {
  const {
    scrollerRef,
    trackRef,
    thumbStyle,
    onThumbPointerDown,
    onThumbPointerMove,
    onThumbPointerUp,
    onTrackPointerDown,
  } = useCustomScrollbar({
    padding: 4,
    thumbWidthSize: 13,
    thumbHeightSize: 90,
  });

  const bgStyle: React.CSSProperties = {
    backgroundImage: `url(${TimeLineBackgroundImg.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed", // 핵심: 배경 정렬을 viewport 기준으로 통일
  };

  return (
    <div className="relative flex gap-9 rounded-[1.25rem] bg-white px-9 py-8">
      <div className="max-w-57 space-y-2">
        <p className="text-heading-rg text-gray-800">AI 타임라인</p>
        <h2 className="text-title-1 text-gray-900">
          Retoday가 요약한 오늘 하루의 흐름
        </h2>
      </div>

      <div
        ref={trackRef}
        className="absolute top-8 right-6 z-0 h-[calc(100%-4rem)] w-3 rounded-full bg-gray-200"
        onPointerDown={onTrackPointerDown}
      >
        <div
          className="absolute left-1/2 rounded-full bg-white shadow-sm"
          style={thumbStyle}
          onPointerDown={onThumbPointerDown}
          onPointerMove={onThumbPointerMove}
          onPointerUp={onThumbPointerUp}
          onPointerCancel={onThumbPointerUp}
        />
      </div>

      <div
        className="relative z-10 mr-4 w-full overflow-hidden rounded-[1.25rem] px-6"
        style={bgStyle}
      >
        <div className="pointer-events-none absolute top-0 bottom-0 left-11 w-0.5 bg-white" />

        <div
          ref={scrollerRef}
          className="h-96 overflow-y-auto overscroll-contain py-6"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="relative ml-3.25 space-y-4">
            {HOURS.map((h) => {
              return (
                <div className="flex items-center gap-9" key={h}>
                  <div className="relative flex items-center">
                    <div
                      className="size-4 rounded-full border border-white"
                      style={bgStyle}
                    />
                  </div>

                  <div className="bg-gray-75 flex w-full items-center justify-between rounded-xl p-4">
                    <p className="text-headline-md text-gray-900">
                      신발 쇼핑하기
                    </p>

                    <div className="flex items-center gap-2">
                      <p className="text-body-1 text-gray-500">30m</p>

                      <div className="size-1 rounded-full bg-gray-200" />

                      <p className="text-body-1 text-gray-500">00:00 - 00:30</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
