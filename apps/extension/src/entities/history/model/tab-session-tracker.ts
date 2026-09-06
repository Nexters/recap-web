import { tokenStore } from "@/entities/auth/model/token-store";
import { historyAPIService } from "@/entities/history/api";
import type { StorageSession } from "@/entities/history/model/storage.type";
import { browserTimeZone } from "@/entities/language/lib/browser-time-zone";
import { getCurrentTime } from "@/shared/lib/date";
import { excludedDomainStore } from "@/shared/lib/domain-store";
import { getSessionById, setSession } from "@/shared/lib/extension-storage";
import { extractDomainUrl } from "@/shared/lib/url";

const CREATE_DELAY_MS = 10 * 1000;
const HEARTBEAT_MS = 5 * 60 * 1000;

type ActiveTracking = {
  tabId: number;
  url: string;
  enteredAt: number;
  historyId: string | null;
  createTimer: ReturnType<typeof setTimeout> | null;
  heartbeatInterval: ReturnType<typeof setInterval> | null;
};

let active: ActiveTracking | null = null;

const clearTimers = (tracking: ActiveTracking) => {
  if (tracking.createTimer) clearTimeout(tracking.createTimer);
  if (tracking.heartbeatInterval) clearInterval(tracking.heartbeatInterval);
};

const canTrack = async (session: StorageSession) => {
  if (await excludedDomainStore.isExcluded(session.url)) return false;
  if (!(await tokenStore.isAuthenticated())) return false;
  return true;
};

const createHistory = async (tabId: number) => {
  if (!active || active.tabId !== tabId || active.historyId) return;

  const session = await getSessionById(tabId);
  if (!session || session.url !== active.url) return;

  try {
    const timeZone = await browserTimeZone.get();

    const { historyId } = await historyAPIService.createHistory({
      url: extractDomainUrl(session.url),
      startedAt: active.enteredAt,
      timeZone,
      title: session.title,
      description: session.description,
      faviconUrl: session.faviconUrl,
    });

    active.historyId = historyId;
    await setSession(tabId, { ...session, historyId });

    active.heartbeatInterval = setInterval(() => {
      sendHeartbeat(tabId);
    }, HEARTBEAT_MS);
  } catch (error) {
    console.error("[recap] create history failed", error);
  }
};

const sendHeartbeat = async (tabId: number) => {
  const historyId = active?.historyId;
  if (!historyId || active?.tabId !== tabId) return;

  try {
    await historyAPIService.patchHistory(historyId, {
      lastActiveAt: getCurrentTime(),
    });
  } catch (error) {
    console.error("[recap] history heartbeat failed", error);
  }
};

const endHistory = async (historyId: string) => {
  try {
    const endedAt = getCurrentTime();

    await historyAPIService.patchHistory(historyId, {
      lastActiveAt: endedAt,
      endedAt,
    });
  } catch (error) {
    console.error("[recap] end history failed", error);
  }
};

export const tabSessionTracker = {
  async enter(
    tabId: number,
    session: StorageSession,
    options?: { force?: boolean },
  ) {
    if (
      !options?.force &&
      active?.tabId === tabId &&
      active.url === session.url
    ) {
      return;
    }

    await tabSessionTracker.leave();

    if (!(await canTrack(session))) return;

    const enteredAt = getCurrentTime();
    await setSession(tabId, {
      ...session,
      visitedAt: enteredAt,
      closedAt: null,
      historyId: null,
      isClosed: false,
      tabId,
    });

    active = {
      tabId,
      url: session.url,
      enteredAt,
      historyId: null,
      createTimer: setTimeout(() => {
        createHistory(tabId);
      }, CREATE_DELAY_MS),
      heartbeatInterval: null,
    };
  },

  async leave(forTabId?: number) {
    if (!active) return;
    if (forTabId != null && active.tabId !== forTabId) return;

    const { tabId, historyId } = active;
    clearTimers(active);
    active = null;

    if (historyId) {
      await endHistory(historyId);
    }

    const session = await getSessionById(tabId);
    if (session) {
      await setSession(tabId, {
        ...session,
        closedAt: getCurrentTime(),
        historyId: null,
        isClosed: true,
      });
    }
  },
};
