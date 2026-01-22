import { useEffect, useState } from "react";
import browser from "webextension-polyfill";

import type { VisitCountResponseMessage } from "../types/messages";

export function Popup() {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [visitCount, setVisitCount] = useState<number>(0);

  useEffect(() => {
    // Get current tab URL
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const tab = tabs[0];
      if (tab?.url) {
        setCurrentUrl(tab.url);
      }
    });

    // Get visit count from background
    browser.runtime
      .sendMessage({ type: "GET_VISIT_COUNT" })
      .then((response: VisitCountResponseMessage) => {
        console.log("Visit count response:", response);
        if (response?.count !== undefined) {
          setVisitCount(response.count);
        }
      })
      .catch((error) => {
        console.error("Failed to get visit count:", error);
      });
  }, []);

  return (
    <div className="w-80 min-h-[200px] p-5 flex flex-col gap-4 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-gray-200 font-sans">
      <h1 className="text-xl font-semibold text-white pb-3 border-b border-white/10">
        My Extension
      </h1>

      <p className="text-sm text-gray-400">
        Welcome to your browser extension!
      </p>

      <div className="flex flex-col gap-1 p-3 bg-white/5 rounded-lg">
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          Current Tab:
        </span>
        <span className="text-sm text-cyan-400 break-all leading-relaxed">
          {currentUrl || "Loading..."}
        </span>
      </div>

      <div className="flex flex-col gap-1 p-3 bg-white/5 rounded-lg">
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          Pages Visited:
        </span>
        <span className="text-sm text-cyan-400 break-all leading-relaxed">
          {visitCount}
        </span>
      </div>

      <footer className="mt-auto pt-3 border-t border-white/10 text-xs text-gray-500 text-center">
        v{browser.runtime.getManifest().version}
      </footer>
    </div>
  );
}
