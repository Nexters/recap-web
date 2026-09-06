export interface PageSnapshot {
  url: string;
  title: string;
  scrollDepth?: number;
  description?: string | null;
  faviconUrl?: string | null;
}

export interface StorageSession extends PageSnapshot {
  visitedAt: number;
  closedAt?: number | null;
  tabId?: number;
  windowId?: number;
  isClosed?: boolean;
  historyId?: string | null;
}

export interface StorageData {
  sessions: Record<string, StorageSession>;
  accessToken: string | null;
  accessTokenExpiresAt: number | null;
  refreshToken: string | null;
  refreshTokenExpiresAt: number | null;
  excludedDomains: string[];
}

export const defaultStorage: StorageData = {
  sessions: {},
  accessToken: null,
  accessTokenExpiresAt: null,
  refreshToken: null,
  refreshTokenExpiresAt: null,
  excludedDomains: [],
};
