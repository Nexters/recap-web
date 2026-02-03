import { getPageSnapshot } from "src/content/get-page-metrics";
import { type PageVisitedMessage } from "src/types/messages";

function sendPageVisited() {
  const pageData = getPageSnapshot();

  const message: PageVisitedMessage = {
    type: "PAGE_VISITED",
    data: pageData,
  };

  chrome.runtime.sendMessage(message).catch((error) => {
    if (!error.message?.includes("message port closed")) {
      console.error("Failed to send message:", error);
    }
  });
}

function init() {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    sendPageVisited();
  } else {
    document.addEventListener("DOMContentLoaded", sendPageVisited);
  }
}

init();
