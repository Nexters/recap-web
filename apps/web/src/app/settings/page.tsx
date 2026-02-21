"use client";

import { useMemo, useState } from "react";
import { cn, Switch, SwitchThumb } from "@recap/ui";

import { SimpleSelect } from "@/app/settings/src/components/SimpleSelect";
import RightIcon from "@/assets/icons/arrow-right.svg";
import MailIcon from "@/assets/icons/mail.svg";
import TimeBlueIcon from "@/assets/icons/time-blue.svg";

export default function SettingPage() {
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");

  const [domain, setDomain] = useState("");

  const hourOptions = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const v = String(i).padStart(2, "0");
        return { value: v, label: v };
      }),
    [],
  );

  const minuteOptions = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => {
        const v = String(i).padStart(2, "0");
        return { value: v, label: v };
      }),
    [],
  );

  return (
    <>
      <div className="rounded-[1.25rem] bg-white px-9 py-8">
        <h2 className="text-heading-rg text-gray-800">내 계정</h2>

        <div className="my-6 h-px w-full bg-gray-200" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-16 rounded-full bg-gray-200" />

            <div className="space-y-1">
              <p className="text-headline-sb text-gray-800">계정 이름</p>

              <div className="flex items-center gap-1">
                <MailIcon />
                <p className="text-body-1 text-gray-800">sample@gmail.com</p>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-1 rounded-xl border border-solid border-gray-300 bg-white px-6 py-4">
            로그아웃
            <RightIcon />
          </button>
        </div>
      </div>

      <div className="rounded-[1.25rem] bg-white px-9 py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-rg text-gray-800">리캡 주기 설정</h2>

          <Switch size="sm">
            <SwitchThumb size="sm" />
          </Switch>
        </div>

        <p className="text-body-1 mt-2 text-gray-900">
          지정된 시간에 리캡이 생성됩니다. 설정을 끌 경우 매일 자정에 배달
          됩니다.
        </p>

        <div className="mt-6 rounded-xl bg-blue-50 p-5">
          <div className="flex items-center gap-2">
            <TimeBlueIcon />

            <p className="text-headline-md text-gray-900">리캡 배송 시간</p>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <SimpleSelect
              value={hour}
              onValueChange={setHour}
              options={hourOptions}
              placeholder="시간"
              className="w-30"
            />

            <SimpleSelect
              value={minute}
              onValueChange={setMinute}
              options={minuteOptions}
              placeholder="분"
              className="w-30"
            />

            <p className="text-body-1 text-gray-800">
              매일 이 시간에 리캡을 받습니다
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[1.25rem] bg-white px-9 py-8">
        <h2 className="text-heading-rg text-gray-800">추적금지 도메인</h2>

        <p className="text-body-1 mt-2 text-gray-900">
          브라우저 사용 기록 집계에서 제외할 도메인을 관리합니다.
        </p>

        <div className="mt-6 space-y-1">
          {[1, 2].map((_, index) => (
            <div
              className="bg-gray-75 flex items-center justify-between rounded-full px-4 py-2"
              key={index}
            >
              <p className="text-body-1 text-gray-500">https://www.figma.com</p>

              <button className="text-body-1 text-[#ff4242]">삭제</button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <input
            className="text-body-2 w-full rounded-xl border border-solid border-gray-200 px-3 py-4 text-gray-900 placeholder:text-gray-500"
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="도메인 입력 ( 예 : abc.com sample.kr)"
          />

          <button
            className={cn(
              "text-subtitle-1-md rounded-xl px-6 py-4 whitespace-nowrap text-gray-100",
              domain.length === 0 ? "bg-gray-500" : "bg-gray-800",
            )}
          >
            추가하기
          </button>
        </div>
      </div>
    </>
  );
}
