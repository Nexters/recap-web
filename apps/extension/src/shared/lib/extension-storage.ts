import browser from "webextension-polyfill";

import type { StorageSession } from "@/entities/history/model/storage.type";

import { ExtensionStorageKey } from "./extension-storage-key";

type BrowserTabStorage = Record<string, StorageSession>;
type WindowTabStorage = Record<string, number>;

const setItem = async <T>(
  key: ExtensionStorageKey,
  items: T,
): Promise<void> => {
  try {
    await browser.storage.local.set({ [key]: items });
  } catch (error) {
    console.log("extension storage error: ", error);
  }
};

const getItemOrNull = async <T>(
  key: ExtensionStorageKey,
): Promise<T | null> => {
  try {
    const result = await browser.storage.local.get(key);
    return (result[key] as T | undefined) ?? null;
  } catch (error) {
    console.log("extension storage error: ", error);
    return null;
  }
};

const getSession = async () =>
  (await getItemOrNull<BrowserTabStorage>(ExtensionStorageKey.BrowserTab)) ??
  {};

const setSession = async (
  tabId: number | undefined,
  snapshot: StorageSession,
) => {
  if (!tabId) return;

  const tabs = await getSession();
  await setItem(ExtensionStorageKey.BrowserTab, {
    ...tabs,
    [String(tabId)]: snapshot,
  });
};

const deleteSession = async (tabId: number) => {
  const tabs = await getSession();
  delete tabs[String(tabId)];
  await setItem(ExtensionStorageKey.BrowserTab, tabs);
};

const getSessionById = async (tabId: number) => {
  const tabs = await getSession();
  return tabs[String(tabId)] ?? null;
};

const getWindowTab = async () =>
  (await getItemOrNull<WindowTabStorage>(ExtensionStorageKey.WindowTab)) ?? {};

const getWindowTabById = async (windowId: number) => {
  const windowTabs = await getWindowTab();
  return windowTabs[String(windowId)] ?? null;
};

const setWindowTab = async (windowId: number, tabId: number) => {
  const windowTabs = await getWindowTab();
  await setItem(ExtensionStorageKey.WindowTab, {
    ...windowTabs,
    [String(windowId)]: tabId,
  });
};

const deleteWindowTab = async (windowId: number) => {
  const windowTabs = await getWindowTab();
  delete windowTabs[String(windowId)];
  await setItem(ExtensionStorageKey.WindowTab, windowTabs);
};

export {
  deleteSession,
  deleteWindowTab,
  getItemOrNull,
  getSession,
  getSessionById,
  getWindowTab,
  getWindowTabById,
  setItem,
  setSession,
  setWindowTab,
};
