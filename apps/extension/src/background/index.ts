import browser from "webextension-polyfill";

import { type ExtensionMessage, MESSAGE_TYPE } from "../types/messages";
import { getStorage, setStorage } from "../utils/storage";

console.log("Background script loaded");

browser.runtime.onInstalled.addListener((): void => {
  console.log("Extension installed");
});

browser.runtime.onMessage.addListener(
  (
    message: unknown,
    _sender: browser.Runtime.MessageSender,
  ): Promise<unknown> | void => {
    const msg = message as ExtensionMessage;
    if (msg.type === MESSAGE_TYPE.PAGE_VISITED) {
      console.log("Background: Page message received", msg);

      return getStorage(["sessions"]).then(({ sessions }) => {
        const now = new Date().toISOString();
        return setStorage({
          sessions: [
            ...sessions,
            {
              ...msg.data,
              sessionId: Date.now().toString(),
              visitedAt: now,
              closedAt: now,
            },
          ],
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
