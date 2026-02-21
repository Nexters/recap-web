import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

import GoogleLoginButton from "@/features/auth/components/GoogleLoginButton";
import useBrowserMessage from "@/hooks/use-browser-message";
import { tokenStore } from "@/lib/token-store";
import { MESSAGE_TYPE } from "@/types/messages";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const checkAuth = async () => {
    const accessToken = await tokenStore.getAccess();
    setIsLoggedIn(accessToken !== null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useBrowserMessage(MESSAGE_TYPE.AUTH_CHANGED, () => {
    checkAuth();
  });

  const handleGoogleLogin = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).chrome?.runtime?.sendMessage({
      type: MESSAGE_TYPE.GOOGLE_LOGIN,
    });
  };

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full flex-col bg-gray-75">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="size-40 bg-gray-100" />
        <h1 className="text-display-1 mt-6">ReToday</h1>
        <GoogleLoginButton className="mt-9" onClick={handleGoogleLogin} />
      </div>
    </div>
  );
};

export default AuthGuard;
