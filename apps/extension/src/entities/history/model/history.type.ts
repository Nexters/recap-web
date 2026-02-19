export type CreateHistoryDTO = {
  tabId: number;
  url: string;
  visitedAt: number;
  closedAt: number;
  title: string;
  metadata: {
    description: string;
    faviconUrl: string;
  };
  isClosed: boolean;
  scrollDepth: number;
};
