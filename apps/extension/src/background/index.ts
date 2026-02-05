import {
  addBrowserSession,
  addPrevBrowserSession,
  closeBrowserSession,
  closeLastBrowserSession,
  getBrowserSession,
} from "src/services/browser-service";
import browser from "webextension-polyfill";

import { type ExtensionMessage, MESSAGE_TYPE } from "../types/messages";

console.log("Background script loaded");

browser.runtime.onInstalled.addListener((): void => {
  console.log("Extension installed");
});

browser.tabs.onRemoved.addListener(async (tabId) => {
  console.log("Background: Tab removed >>>>>", tabId);
  closeBrowserSession(String(tabId));
});

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  console.log("Background: Tab activated >>>>>", tabId);
  await closeLastBrowserSession();
  await addPrevBrowserSession(String(tabId));
});

browser.runtime.onMessage.addListener(
  (
    message: unknown,
    sender: browser.Runtime.MessageSender,
  ): Promise<unknown> | void => {
    const msg = message as ExtensionMessage;

    if (msg.type === MESSAGE_TYPE.PAGE_VISITED) {
      return addBrowserSession(sender.tab?.id?.toString() ?? "", msg.data);
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
