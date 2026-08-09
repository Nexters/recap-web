import { useLanguageStore } from "@/entities/language/model/language.store";
import { LANGUAGE_TO_PROFILE } from "@/features/settings/config/language.const";

/** 클라이언트에 저장된 언어 설정 기준으로 timeZone을 결정한다. */
const useTimeZone = () => {
  const language = useLanguageStore((s) => s.localize);

  return LANGUAGE_TO_PROFILE[language].timeZone;
};

export default useTimeZone;
