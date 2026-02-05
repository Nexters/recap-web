import type { PageSnapshot, StorageSession } from "src/types/storage";
import { getStorage, setStorage } from "src/utils/storage";

async function getBrowserSession() {
  const storage = await getStorage(["sessions"]);
  return storage.sessions;
}

async function setBrowserSession(sessions: StorageSession[]) {
  await setStorage({ sessions });
}

async function clearBrowserSession() {
  await setStorage({ sessions: [] });
}

async function addBrowserSession(tabId: string, data: PageSnapshot) {
  const sessions = await getBrowserSession();
  const newSession: StorageSession = {
    ...data,
    tabId,
    visitedAt: new Date().toISOString(),
    closedAt: null,
  };
  console.log("addBrowserSession >>>>>>>>>>>>", newSession);
  await setBrowserSession([...sessions, newSession]);
}

async function closeBrowserSession(tabId: string) {
  const sessions = await getBrowserSession();
  console.log("close sessions", sessions, tabId);
  if (!sessions.length) return;

  const sessionIdx = sessions.findIndex((session) => session.tabId === tabId);
  if (sessionIdx < 0) return;

  const updatedSession = [...sessions];

  updatedSession[sessionIdx] = {
    ...updatedSession[sessionIdx],
    closedAt: new Date().toISOString(),
  } as StorageSession;

  console.log("closeBrowserSession >>>>>>>>>>>>", updatedSession);
  await setBrowserSession(updatedSession);
}

async function addPrevBrowserSession(tabId: string) {
  const sessions = await getBrowserSession();
  if (!sessions.length) return;

  const sessionIdx = sessions.findIndex((session) => session.tabId === tabId);
  if (sessionIdx < 0) return;

  await addBrowserSession(tabId, sessions[sessionIdx] as PageSnapshot);
}

async function closeLastBrowserSession() {
  const sessions = await getBrowserSession();
  if (!sessions.length) return;
  const updatedSession = [...sessions];

  updatedSession[updatedSession.length - 1] = {
    ...updatedSession[updatedSession.length - 1],
    closedAt: new Date().toISOString(),
  } as StorageSession;

  console.log("closeLastBrowserSession >>>>>>>>>>>>", updatedSession);

  await setBrowserSession(updatedSession);
}

export {
  addBrowserSession,
  addPrevBrowserSession,
  clearBrowserSession,
  closeBrowserSession,
  closeLastBrowserSession,
  getBrowserSession,
  setBrowserSession,
};
