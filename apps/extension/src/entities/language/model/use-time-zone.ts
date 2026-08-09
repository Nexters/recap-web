import { useEffect } from "react";

import { useLanguageStore } from "@/entities/language";
import { browserTimeZone } from "@/entities/language/lib/browser-time-zone";
import { LANGUAGE_TO_PROFILE } from "@/features/setting/config/language.const";

/** 클라이언트에 저장된 언어 설정 기준으로 timeZone을 결정한다. */
const useTimeZone = () => {
  const language = useLanguageStore((s) => s.localize);
  const timeZone = LANGUAGE_TO_PROFILE[language].timeZone;

  useEffect(() => {
    void browserTimeZone.set(timeZone);
  }, [timeZone]);

  return timeZone;
};

export default useTimeZone;
