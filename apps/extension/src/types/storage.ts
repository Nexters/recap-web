export interface StorageSession {
  sessionId: string;
  url: string;
  title: string;
  visitedAt: string;
  closedAt: string;
  scrollDepth: number;
  metadata: {
    description: string;
    thumbnailUrl: string;
  };
}

export interface StorageData {
  sessions: StorageSession[];
}

export const defaultStorage: StorageData = {
  sessions: [],
};
