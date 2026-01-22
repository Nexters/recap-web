/**
 * Message types for extension communication
 */

// Content Script -> Background
export interface PageVisitedMessage {
  type: "PAGE_VISITED";
  data: {
    url: string;
    title: string;
    wordCount: number;
    linkCount: number;
    imageCount: number;
  };
}

// Popup -> Background
export interface GetVisitCountMessage {
  type: "GET_VISIT_COUNT";
}

// Background -> Popup
export interface VisitCountResponseMessage {
  type: "VISIT_COUNT_RESPONSE";
  count: number;
}

// Union type for all messages
export type ExtensionMessage =
  | PageVisitedMessage
  | GetVisitCountMessage
  | VisitCountResponseMessage;
