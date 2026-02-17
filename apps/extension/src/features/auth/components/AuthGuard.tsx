import type { PropsWithChildren } from "react";

import DateRangePicker from "@/components/DateRangePicker";
import { NAVIGATION_TAB } from "@/const/navigation.const";
import GoogleLoginButton from "@/features/auth/components/GoogleLoginButton";
import NavigationTabs from "@/features/layout/components/NavigationTabs";
import PageContent from "@/features/layout/components/PageContent";
import PageHeader from "@/features/layout/components/PageHeader";
import { MESSAGE_TYPE } from "@/types/messages";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const isLoggedIn = false;
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
    <>
      <PageHeader>
        <NavigationTabs defaultValue={NAVIGATION_TAB.ANALYSIS} />
      </PageHeader>
      <PageContent>
        <div className="flex h-full flex-col bg-gray-75">
          <DateRangePicker />
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="size-40 bg-gray-100" />
            <h1 className="text-display-1 mt-6">ReToday</h1>
            <GoogleLoginButton className="mt-9" onClick={handleGoogleLogin} />
          </div>
        </div>
      </PageContent>
    </>
  );
};

export default AuthGuard;
