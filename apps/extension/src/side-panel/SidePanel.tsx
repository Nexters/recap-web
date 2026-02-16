import { useState } from "react";

import { NAVIGATION_TAB } from "@/const/navigation.const";
import AiRecapView from "@/features/ai-recap/components/AiRecapView";
import AnalysisView from "@/features/analysis/components/AnalysisView";
import AuthGuard from "@/features/auth/components/AuthGuard";
import NavigationTabs from "@/features/layout/components/NavigationTabs";
import SettingView from "@/features/setting/components/SettingView";

export function SidePanel() {
  const [activeTab, setActiveTab] = useState<string>(NAVIGATION_TAB.ANALYSIS);

  return (
    <>
      <NavigationTabs value={activeTab} onValueChange={setActiveTab} />
      <AuthGuard>
        {activeTab === NAVIGATION_TAB.ANALYSIS && <AnalysisView />}
        {activeTab === NAVIGATION_TAB.AI_RECAP && <AiRecapView />}
        {activeTab === NAVIGATION_TAB.SETTINGS && <SettingView />}
      </AuthGuard>
    </>
  );
}
