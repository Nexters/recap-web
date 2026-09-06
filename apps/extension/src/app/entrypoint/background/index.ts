import browser from "webextension-polyfill";

import { authUnTokenAPIService } from "@/entities/auth/api";
import { tokenStore } from "@/entities/auth/model/token-store";
import {
  type ExtensionMessage,
  MESSAGE_TYPE,
} from "@/entities/history/model/messages.type";
import { tabSessionTracker } from "@/entities/history/model/tab-session-tracker";
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

  for (const [tabId, session] of Object.entries(tabs)) {
    if (session.windowId !== windowId) continue;
    await tabSessionTracker.leave(Number(tabId));
    await deleteSession(Number(tabId));
  }

  await deleteWindowTab(windowId);
});

browser.tabs.onRemoved.addListener(async (tabId) => {
  await tabSessionTracker.leave(tabId);
  await deleteSession(tabId);
});

/**
 * 같은 창 (window) 안에서 활성 탭이 바뀔 때 발생하는 이벤트
 */
browser.tabs.onActivated.addListener(async ({ tabId, windowId }) => {
  const previousTabId = await getWindowTabById(windowId);

  if (previousTabId !== tabId) {
    await tabSessionTracker.leave();
    const session = await getSessionById(tabId);
    if (session) {
      await tabSessionTracker.enter(tabId, session);
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

      const session = {
        ...msg.data,
        visitedAt: getCurrentTime(),
        closedAt: null,
        tabId,
        windowId,
      };

      setSession(tabId, session).then(async () => {
        if (windowId) {
          await setWindowTab(windowId, tabId);
        }
        await tabSessionTracker.enter(tabId, session, { force: true });
      });
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
            socialProvider: "GOOGLE",
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
