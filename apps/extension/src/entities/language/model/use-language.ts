import { useCallback } from "react";
import type { PatchUserProfileDTO } from "@recap/api";
import type { LanguageType } from "@recap/i18n";
import type { UseMutationOptions } from "@recap/react-query";

import { useLanguageStore } from "@/entities/language";
import { usePatchUserProfile } from "@/features/setting/api/user-query";
import { LANGUAGE_TO_PROFILE } from "@/features/setting/config/language.const";

type PatchLanguageOptions = Omit<
  UseMutationOptions<void, Error, PatchUserProfileDTO>,
  "mutationFn"
>;

const useLanguage = () => {
  const language = useLanguageStore((s) => s.localize);
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  const { mutate } = usePatchUserProfile();

  const patchLanguage = useCallback(
    (nextLanguage?: LanguageType, options?: PatchLanguageOptions) => {
      const target = nextLanguage ?? useLanguageStore.getState().localize;
      mutate(LANGUAGE_TO_PROFILE[target], options);
    },
    [],
  );

  return {
    language,
    setLanguage,
    patchLanguage,
  };
};

export default useLanguage;
