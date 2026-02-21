import browser from "webextension-polyfill";

import { authAPIService } from "@/entities/auth/api";
import type { BackendLoginResponse } from "@/entities/auth/model/auth.type";
import { tokenStore } from "@/lib/token-store";
import {
  addBrowserSession,
  closeBrowserSession,
  deleteBrowserSession,
  getBrowserSessionById,
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
  getBrowserSessionById(String(tabId)).then((session) => {
    console.log("Background: Tab removed >>>>>", {
      ...session,
      tabId,
      isClosed: true,
    });
    deleteBrowserSession(String(tabId));
  });
});

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  const closedSession = await closeBrowserSession();
  if (Object.keys(closedSession).length > 0) {
    console.log(
      "Background: Tab activated : Closed session api payload >>>>>",
      {
        ...closedSession,
        tabId,
      },
    );
    await visitBrowserSession(String(tabId));
  }
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
