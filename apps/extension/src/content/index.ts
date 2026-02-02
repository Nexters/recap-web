import { getPageSnapshot } from "src/content/get-page-metrics";

console.log("Content script loaded on:", window.location.href);

function sendPageVisited() {
  const pageData = getPageSnapshot();

  const message = {
    type: "PAGE_VISITED",
    data: pageData,
  };

  chrome.runtime.sendMessage(message).catch((error) => {
    if (!error.message?.includes("message port closed")) {
      console.error("Failed to send message:", error);
    }
  });

  console.log("Page data sent to background:", pageData);
}

function init() {
  console.log("Content script initialized");
  setTimeout(sendPageVisited, 100);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
