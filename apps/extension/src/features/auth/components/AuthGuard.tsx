import type { PropsWithChildren } from "react";

import GoogleLoginButton from "@/features/auth/components/GoogleLoginButton";
import { MESSAGE_TYPE } from "@/types/messages";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const isLoggedIn = true;
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
