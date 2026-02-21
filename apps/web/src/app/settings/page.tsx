import { Switch, SwitchThumb } from "@recap/ui";

import RightIcon from "@/assets/icons/arrow-right.svg";
import MailIcon from "@/assets/icons/mail.svg";
import TimeBlueIcon from "@/assets/icons/time-blue.svg";

export default function SettingPage() {
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

            <p className="text-heading-medium text-gray-900">리캡 배송 시간</p>
          </div>
        </div>
      </div>
    </>
  );
}
