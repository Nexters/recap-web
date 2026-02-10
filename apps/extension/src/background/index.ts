import {
  addBrowserSession,
  closeBrowserSession,
  deleteBrowserSession,
  getBrowserSession,
  visitBrowserSession,
} from "src/services/browser-service";
import browser from "webextension-polyfill";

import { type ExtensionMessage, MESSAGE_TYPE } from "../types/messages";

console.log("Background script loaded");

browser.runtime.onInstalled.addListener((): void => {
  console.log("Extension installed");
});

browser.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    if (chrome?.sidePanel) {
      await chrome.sidePanel.open({ tabId: tab.id });
    }
  }
});

browser.tabs.onRemoved.addListener(async (tabId) => {
  console.log("Background: Tab removed >>>>>", tabId);
  deleteBrowserSession(String(tabId));
});

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  console.log("Background: Tab activated >>>>>", tabId);
  const closedSession = await closeBrowserSession();
  console.log("Closed session api payload >>>>>", closedSession);
  await visitBrowserSession(String(tabId));
});

browser.runtime.onMessage.addListener(
  (
    message: unknown,
    sender: browser.Runtime.MessageSender,
  ): Promise<unknown> | void => {
    const msg = message as ExtensionMessage;

    if (msg.type === MESSAGE_TYPE.PAGE_VISITED) {
      return addBrowserSession(String(sender.tab?.id ?? ""), msg.data);
    }

    if (msg.type === MESSAGE_TYPE.GET_PAGE_VISITED) {
      return getBrowserSession().then((sessions) => {
        return {
          type: MESSAGE_TYPE.GET_PAGE_VISITED,
          data: sessions,
        };
      });
    }

    return;
  },
);
