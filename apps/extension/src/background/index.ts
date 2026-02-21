import browser from "webextension-polyfill";

import { authAPIService } from "@/entities/auth/api";
import type { BackendLoginResponse } from "@/entities/auth/model/auth.type";
import { tokenStore } from "@/lib/token-store";
import {
  addBrowserSession,
  closeBrowserSession,
  deleteBrowserSession,
  visitBrowserSession,
} from "@/services/browser.service";

import { type ExtensionMessage, MESSAGE_TYPE } from "../types/messages";

console.log("Background script loaded");

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

    if (msg.type === MESSAGE_TYPE.GOOGLE_LOGIN) {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        authAPIService
          .googleOauthLogin({
            oAuthToken: token,
            provider: "GOOGLE",
          })
          .then((data: unknown) => {
            tokenStore.set(data as BackendLoginResponse);
            chrome.runtime.sendMessage({ type: MESSAGE_TYPE.AUTH_CHANGED });
          });
      });
    }

    return;
  },
);
