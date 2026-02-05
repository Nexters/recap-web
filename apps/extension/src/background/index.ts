import type { StorageSession } from "src/types/storage";
import browser from "webextension-polyfill";

import { type ExtensionMessage, MESSAGE_TYPE } from "../types/messages";
import { getStorage, setStorage } from "../utils/storage";

console.log("Background script loaded");

browser.runtime.onInstalled.addListener((): void => {
  console.log("Extension installed");
});

browser.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
  console.log("Background: Tab removed >>>>>", tabId);
  console.log("removeInfo >>>>>", removeInfo);
  getStorage(["sessions"]).then(({ sessions }) => {
    if (!sessions.length) return;
    const curIdx = sessions.findIndex(
      (session) => session.tabId === String(tabId),
    );
    if (curIdx !== -1) return;
    const updatedSession = [...sessions];
    updatedSession[curIdx] = {
      ...updatedSession[curIdx],
      closedAt: new Date().toISOString(),
    } as StorageSession;
    console.log("updatedSession >>>>>>>>>>>>", updatedSession);
    setStorage({
      sessions: updatedSession,
    });
  });
});

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  console.log("Background: Tab activated >>>>>", tabId);
  getStorage(["sessions"]).then(({ sessions }) => {
    if (!sessions.length) return;
    const curIdx = sessions.findIndex(
      (session) => session.tabId === String(tabId),
    );
    const lastIdx = sessions.length - 1;
    console.log("curIdx >>>>>>>>>>>>", curIdx);
    const updatedSession = [...sessions];
    updatedSession[lastIdx] = {
      ...updatedSession[lastIdx],
      closedAt: new Date().toISOString(),
    } as StorageSession;

    if (curIdx !== -1) {
      updatedSession.push({
        ...sessions[curIdx],
        visitedAt: new Date().toISOString(),
        closedAt: null,
      } as StorageSession);
    }

    console.log("updatedSession >>>>>>>>>>>>", updatedSession);

    setStorage({
      sessions: updatedSession,
    });
  });
});

browser.runtime.onMessage.addListener(
  (
    message: unknown,
    sender: browser.Runtime.MessageSender,
  ): Promise<unknown> | void => {
    const msg = message as ExtensionMessage;

    if (msg.type === MESSAGE_TYPE.PAGE_VISITED) {
      return getStorage(["sessions"]).then(({ sessions }) => {
        const newSession = {
          ...msg.data,
          tabId: sender.tab?.id?.toString() ?? "",
          visitedAt: new Date().toISOString(),
          closedAt: null,
        };
        console.log("newSession >>>>>>>>>>>>", newSession);
        return setStorage({
          sessions: [...sessions, newSession],
        }).then(() => {
          return { success: true };
        });
      });
    }

    if (msg.type === MESSAGE_TYPE.GET_PAGE_VISITED) {
      return getStorage(["sessions"]).then(({ sessions }) => {
        return {
          type: MESSAGE_TYPE.GET_PAGE_VISITED,
          data: sessions,
        };
      });
    }

    return;
  },
);
