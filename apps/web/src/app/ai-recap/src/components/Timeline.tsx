"use client";

import { useCustomScrollbar } from "@/app/ai-recap/src/hooks/useCustomScrollbar";

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
  } = useCustomScrollbar({ padding: 4, thumbSize: 16 });

  return (
    <div className="flex gap-9 rounded-[1.25rem] bg-white px-9 py-8">
      <div className="max-w-57 space-y-2">
        <p className="text-heading-rg text-gray-800">AI 타임라인</p>
        <h2 className="text-title-1 text-gray-900">
          Retoday가 요약한 오늘 하루의 흐름
        </h2>
      </div>

      <div className="bg-gray-75 relative w-full overflow-hidden rounded-[1.25rem] px-6">
        <div
          ref={trackRef}
          className="absolute top-6 right-6 h-[calc(100%-48px)] w-6 rounded-full bg-gray-300"
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

        <div className="pointer-events-none absolute top-0 bottom-0 left-14.5 w-0.5 bg-gray-200" />

        <div
          ref={scrollerRef}
          className="h-96 overflow-y-auto overscroll-contain py-6 pr-12"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="relative space-y-2">
            {HOURS.map((h) => {
              return (
                <div className="flex items-center gap-1.5" key={h}>
                  <div className="text-heading-md flex h-8 w-6 shrink-0 items-center justify-center text-gray-900">
                    {h}
                  </div>

                  <div className="relative flex items-center">
                    <div className="bg-blue-75 size-2.5 rounded-full" />
                    <div className="bg-blue-75 absolute left-2 h-0.5 w-4" />
                  </div>

                  <div className="bg-blue-75 ml-2 flex w-full items-center justify-between rounded-xl px-3 py-1">
                    <div className="flex items-center gap-2">
                      <p className="text-body-3 text-blue-400">00:23 - 00:53</p>
                      <p className="text-subtitle-2-sb text-gray-800">
                        신발 쇼핑하기
                      </p>
                    </div>

                    <div className="text-label-2 rounded-lg bg-gray-800 px-6 py-1 text-white">
                      30M
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
