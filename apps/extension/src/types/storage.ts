export interface PageSnapshot {
  url: string;
  title: string;
  scrollDepth?: number;
  metadata: {
    description?: string | null;
    thumbnailUrl?: string | null;
  };
}

export interface StorageSession extends PageSnapshot {
  sessionId: string;
  visitedAt: string;
  closedAt?: string | null;
}

export interface StorageData {
  sessions: StorageSession[];
}

export const defaultStorage: StorageData = {
  sessions: [],
};
