import { useState } from "react";

import { NAVIGATION_TAB } from "@/const/navigation.const";
import AiRecapView from "@/features/ai-recap/components/AiRecapView";
import AnalysisView from "@/features/analysis/components/AnalysisView";
import AuthGuard from "@/features/auth/components/AuthGuard";
import Footer from "@/features/layout/components/Footer";
import NavigationTabs from "@/features/layout/components/NavigationTabs";
import PageContent from "@/features/layout/components/PageContent";
import PageHeader from "@/features/layout/components/PageHeader";
import TopBar from "@/features/layout/components/TopBar";
import SettingView from "@/features/setting/components/SettingView";

export function SidePanel() {
  const [activeTab, setActiveTab] = useState<string>(NAVIGATION_TAB.ANALYSIS);

  return (
    <>
      <PageHeader>
        {activeTab === NAVIGATION_TAB.SETTINGS && <TopBar />}
        <NavigationTabs value={activeTab} onValueChange={setActiveTab} />
      </PageHeader>

      <AuthGuard>
        <PageContent
          className={
            activeTab === NAVIGATION_TAB.SETTINGS ? "pt-[10.5rem] pb-0" : ""
          }
        >
          {activeTab === NAVIGATION_TAB.ANALYSIS && <AnalysisView />}
          {activeTab === NAVIGATION_TAB.AI_RECAP && <AiRecapView />}
          {activeTab === NAVIGATION_TAB.SETTINGS && <SettingView />}
        </PageContent>
      </AuthGuard>
      {activeTab !== NAVIGATION_TAB.SETTINGS && <Footer />}
    </>
  );
}
