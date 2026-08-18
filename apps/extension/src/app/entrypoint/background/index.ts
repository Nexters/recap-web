import browser from "webextension-polyfill";

import { authUnTokenAPIService } from "@/entities/auth/api";
import { tokenStore } from "@/entities/auth/model/token-store";
import browserHistory from "@/entities/history/model/browser.service";
import {
  type ExtensionMessage,
  MESSAGE_TYPE,
} from "@/entities/history/model/messages.type";
import analytics from "@/shared/api/google-analytics/google-analytics.service";
import { getCurrentTime } from "@/shared/lib/date";
import {
  deleteSession,
  deleteWindowTab,
  getSession,
  getSessionById,
  getWindowTabById,
  setSession,
  setWindowTab,
} from "@/shared/lib/extension-storage";

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error: unknown) => console.error(error));

browser.runtime.onInstalled.addListener((details) => {
  analytics.fireEvent("extension_lifecycle", {
    reason: details.reason,
    ...(details.previousVersion != null
      ? { previous_version: details.previousVersion }
      : {}),
  });
});

browser.windows.onRemoved.addListener(async (windowId) => {
  const tabs = await getSession();
  const now = getCurrentTime();

  for (const [tabId, session] of Object.entries(tabs)) {
    if (session.windowId !== windowId) continue;

    if (session.closedAt == null) {
      console.log("[recap] onRemoved", {
        ...session,
        closedAt: now,
        tabId: Number(tabId),
        isClosed: true,
      });
      await browserHistory.record({
        ...session,
        closedAt: now,
        tabId: Number(tabId),
        isClosed: true,
      });
    }

    await deleteSession(Number(tabId));
  }

  await deleteWindowTab(windowId);
});

browser.tabs.onRemoved.addListener(async (tabId) => {
  const session = await getSessionById(tabId);
  if (!session) return;

  // onActivated에서 이미 closedAt + record 처리된 경우
  if (session.closedAt != null) {
    await deleteSession(tabId);
    return;
  }

  console.log("[recap] onRemoved", {
    ...session,
    closedAt: getCurrentTime(),
    tabId,
    isClosed: true,
  });

  await browserHistory.record({
    ...session,
    closedAt: getCurrentTime(),
    tabId,
    isClosed: true,
  });
  await deleteSession(tabId);
});

browser.tabs.onActivated.addListener(async ({ tabId, windowId }) => {
  const previousTabId = await getWindowTabById(windowId);
  const now = getCurrentTime();

  if (previousTabId != null && previousTabId !== tabId) {
    const previousSession = await getSessionById(previousTabId);
    if (previousSession) {
      const closed = {
        ...previousSession,
        closedAt: now,
        tabId: previousTabId,
        windowId,
        isClosed: true,
      };
      await setSession(previousTabId, closed);
      await browserHistory.record(closed);
      console.log("[recap] closed (onActivated) >>>", closed);
    }
  }

  if (previousTabId !== tabId) {
    const session = await getSessionById(tabId);
    if (session) {
      const visited = {
        ...session,
        visitedAt: now,
        closedAt: null,
        tabId,
        windowId,
        isClosed: false,
      };
      await setSession(tabId, visited);
    }
  }

  await setWindowTab(windowId, tabId);
});

browser.runtime.onMessage.addListener(
  (message: unknown, sender: browser.Runtime.MessageSender) => {
    const msg = message as ExtensionMessage;

    if (msg.type === MESSAGE_TYPE.PAGE_VISITED) {
      const tabId = sender.tab?.id;
      const windowId = sender.tab?.windowId;
      if (!tabId) return;

      setSession(tabId, {
        ...msg.data,
        visitedAt: getCurrentTime(),
        closedAt: null,
        tabId,
        windowId,
      });

      if (windowId) {
        setWindowTab(windowId, tabId);
      }
      return;
    }

    if (msg.type === MESSAGE_TYPE.GOOGLE_LOGIN) {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError || !token) {
          console.error(
            chrome.runtime.lastError?.message ?? "Failed to get Google token",
          );
          return;
        }

        authUnTokenAPIService
          .googleOauthLogin({
            oAuthToken: token,
            provider: "GOOGLE",
          })
          .then(async (tokens) => {
            await tokenStore.set(tokens);
            analytics.fireEvent("login", { method: "google" });
            chrome.runtime.sendMessage({ type: MESSAGE_TYPE.AUTH_CHANGED });
          })
          .catch((error: unknown) => {
            console.error("Google login failed", error);
          });
      });
    }

    return;
  },
);
