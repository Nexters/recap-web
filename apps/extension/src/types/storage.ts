export interface PageSnapshot {
  url: string;
  title: string;
  scrollDepth?: number;
  metadata: {
    description?: string | null;
    faviconUrl?: string | null;
  };
}

export interface StorageSession extends PageSnapshot {
  visitedAt: string;
  closedAt?: string | null;
}

export interface StorageData {
  sessions: Record<string, StorageSession>;
  accessToken: string | null;
  refreshToken: string | null;
}

export const defaultStorage: StorageData = {
  sessions: {},
  accessToken: null,
  refreshToken: null,
};
