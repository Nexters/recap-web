import { useEffect, useState } from "react";
import browser from "webextension-polyfill";

import { MESSAGE_TYPE } from "../types/messages";
import type { StorageSession } from "../types/storage";

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isActive(session: StorageSession): boolean {
  return !session.closedAt || session.closedAt === session.visitedAt;
}

export function SidePanel() {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [sessions, setSessions] = useState<StorageSession[]>([]);

  useEffect(() => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const tab = tabs[0];
      if (tab?.url) {
        setCurrentUrl(tab.url);
      }
    });

    browser.runtime
      .sendMessage({ type: MESSAGE_TYPE.GET_PAGE_VISITED })
      .then((response: unknown) => {
        console.log("Sessions response:", response);
        if (
          response &&
          typeof response === "object" &&
          "data" in response &&
          Array.isArray((response as { data: StorageSession[] }).data)
        ) {
          setSessions((response as { data: StorageSession[] }).data);
        }
      })
      .catch((error) => {
        console.error("Failed to get sessions:", error);
      });
  }, []);

  return (
    <div className="w-full min-h-screen p-5 flex flex-col gap-4 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-gray-200 font-sans">
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

      <div className="flex flex-col gap-2 flex-1">
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          Pages Visited ({sessions.length}):
        </span>
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {sessions.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-2">
              No sessions yet
            </p>
          ) : (
            sessions.map((session) => {
              const active = isActive(session);
              return (
                <div
                  key={session.sessionId}
                  className="flex flex-col gap-1 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-cyan-400 line-clamp-1 flex-1">
                      {session.title || "Untitled"}
                    </span>
                    {active && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded font-medium">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5 text-[10px] text-gray-500">
                    <span>시작: {formatDateTime(session.visitedAt)}</span>
                    {active ? (
                      <span className="text-green-400">종료: Active</span>
                    ) : (
                      <span>
                        종료:{" "}
                        {session.closedAt
                          ? formatDateTime(session.closedAt)
                          : "Unknown"}
                      </span>
                    )}
                  </div>
                  {session.metadata?.description && (
                    <span className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">
                      {session.metadata.description}
                    </span>
                  )}
                  {session.metadata?.thumbnailUrl && (
                    <img
                      src={session.metadata.thumbnailUrl}
                      alt={session.title}
                      className="w-full h-16 object-cover rounded mt-1"
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <footer className="mt-auto pt-3 border-t border-white/10 text-xs text-gray-500 text-center">
        v{browser.runtime.getManifest().version}
      </footer>
    </div>
  );
}
