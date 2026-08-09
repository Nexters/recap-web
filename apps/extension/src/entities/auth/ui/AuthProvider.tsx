import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQueryClient } from "@recap/react-query";

import { tokenStore } from "@/entities/auth/model/token-store";
import { MESSAGE_TYPE } from "@/entities/history/model/messages.type";
import { useLanguageStore } from "@/entities/language";
import { browserTimeZone } from "@/entities/language/lib/browser-time-zone";
import { USER_KEYS } from "@/features/setting/api/query-keys";
import { usePatchUserProfile } from "@/features/setting/api/user-query";
import { LANGUAGE_TO_PROFILE } from "@/features/setting/config/language.const";
import useBrowserMessage from "@/shared/lib/browser/use-browser-message";

import { AuthContext, type AuthValue } from "./auth-context";
import { useAuth } from "./use-auth";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthChangedEffects = () => {
  const { refreshAuth } = useAuth();
  const queryClient = useQueryClient();
  const { mutateAsync: patchUserProfile } = usePatchUserProfile();

  const handleAuthChanged = useCallback(async () => {
    queryClient.removeQueries({ queryKey: USER_KEYS.details() });

    const language = useLanguageStore.getState().localize;
    await patchUserProfile(LANGUAGE_TO_PROFILE[language]);
    void browserTimeZone.set(LANGUAGE_TO_PROFILE[language].timeZone);

    await refreshAuth();
    await queryClient.resetQueries({ queryKey: USER_KEYS.details() });
  }, [patchUserProfile, queryClient, refreshAuth]);

  const onAuthChanged = useCallback(() => {
    void handleAuthChanged();
  }, [handleAuthChanged]);

  useBrowserMessage(MESSAGE_TYPE.AUTH_CHANGED, onAuthChanged);

  return null;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshAuth = useCallback(async () => {
    try {
      setIsLoggedIn(Boolean(await tokenStore.getRefresh()));
    } catch {
      setIsLoggedIn(false);
    } finally {
      setIsReady(true);
    }
  }, []);

  const unLogin = useCallback(async () => {
    await tokenStore.clear();
    setIsLoggedIn(false);
  }, []);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const value = useMemo<AuthValue>(
    () => ({ isReady, isLoggedIn, refreshAuth, unLogin, login }),
    [isReady, isLoggedIn, refreshAuth, unLogin, login],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
