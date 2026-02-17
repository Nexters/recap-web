import type { PropsWithChildren } from "react";

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
    <div>
      Retoday Auth Login Page
      <button onClick={handleGoogleLogin}>Google Login</button>
    </div>
  );
};

export default AuthGuard;
