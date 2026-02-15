import type { PageSnapshot, StorageSession } from "src/types/storage";

export const MESSAGE_TYPE = {
  PAGE_VISITED: "PAGE_VISITED",
  GET_PAGE_VISITED: "GET_PAGE_VISITED",
  GOOGLE_LOGIN: "GOOGLE_LOGIN",
} as const;

export type MessageType = (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE];

export type PageVisitedMessage = {
  type: typeof MESSAGE_TYPE.PAGE_VISITED;
  data: PageSnapshot;
};

export type GetPageVisitedMessage = {
  type: typeof MESSAGE_TYPE.GET_PAGE_VISITED;
  data: StorageSession[];
};

export type GoogleLoginMessage = {
  type: typeof MESSAGE_TYPE.GOOGLE_LOGIN;
};

export type ExtensionMessage =
  | PageVisitedMessage
  | GetPageVisitedMessage
  | GoogleLoginMessage;
