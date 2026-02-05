import {
  defaultStorage,
  type PageSnapshot,
  type StorageSession,
} from "src/types/storage";
import { getStorage, setStorage } from "src/utils/storage";

async function getBrowserSession() {
  const storage = await getStorage(["sessions"]);
  return storage.sessions ?? {};
}

async function getBrowserSessionById(tabId: string) {
  const sessions = await getBrowserSession();
  return sessions[tabId];
}

async function setBrowserSession(sessions: Record<string, StorageSession>) {
  await setStorage({ sessions });
}

async function clearBrowserSession() {
  await setStorage(defaultStorage);
}

async function deleteBrowserSession(tabId: string) {
  if (!tabId) return;
  const sessions = await getBrowserSession();
  console.log("deleteBrowserSession >>>>>>>>>>>>", sessions, tabId);
  delete sessions[tabId];
  await setBrowserSession(sessions);
}

async function addBrowserSession(tabId: string, data: PageSnapshot) {
  if (!tabId) return;
  const sessions = await getBrowserSession();
  console.log("addBrowserSession >>>>>>>>>>>>", sessions, tabId, data);
  sessions[tabId] = {
    ...data,
    visitedAt: new Date().toISOString(),
    closedAt: null,
  };

  await setBrowserSession(sessions);
}

async function closeBrowserSession() {
  let result = {};
  const sessions = await getBrowserSession();
  console.log("closeBrowserSession >>>>>>>>>>>>", sessions);
  for (const session of Object.values(sessions)) {
    if (session.closedAt === null) {
      session.closedAt = new Date().toISOString();
      result = session;
    }
  }
  await setBrowserSession(sessions);
  return result;
}

async function visitBrowserSession(tabId: string) {
  const sessions = await getBrowserSession();
  console.log("visitBrowserSession >>>>>>>>>>>>", sessions, tabId);
  if (!sessions[tabId]) return;
  sessions[tabId].visitedAt = new Date().toISOString();
  sessions[tabId].closedAt = null;
  await setBrowserSession(sessions);
}

export {
  addBrowserSession,
  clearBrowserSession,
  closeBrowserSession,
  deleteBrowserSession,
  getBrowserSession,
  getBrowserSessionById,
  setBrowserSession,
  visitBrowserSession,
};
