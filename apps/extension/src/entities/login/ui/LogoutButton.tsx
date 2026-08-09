import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";
import { Button } from "@recap/ui";

import { authAPIService } from "@/entities/auth/api/auth-api";
import { useAuth } from "@/entities/auth/ui";
import { USER_KEYS } from "@/features/setting/api/query-keys";
import analytics from "@/shared/api/google-analytics/google-analytics.service";
import RightIcon from "@/shared/assets/icons/arrow-right-muted.svg?react";

const LogoutButton = () => {
  const { t } = useLocale("settings");
  const { unLogin } = useAuth();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await authAPIService.logout();
      await unLogin();

      analytics.fireEvent("logout", {});
      queryClient.removeQueries({
        queryKey: USER_KEYS.details(),
      });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="md"
      className="flex w-full items-center justify-center gap-2 px-4 py-2"
      onClick={handleLogout}
    >
      {t("account.logout")}
      <RightIcon />
    </Button>
  );
};

export default LogoutButton;
