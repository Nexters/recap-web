/**
 * Content Script
 *
 * This script runs in the context of web pages.
 * It analyzes the page and sends data to the background script.
 *
 * Note: Content scripts cannot use ES module imports in Chrome.
 * All code must be self-contained.
 */

console.log("Content script loaded on:", window.location.href);

/**
 * Analyze the current page
 */
function analyzePage() {
  const bodyText = document.body?.innerText || "";
  const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
  const linkCount = document.querySelectorAll("a").length;
  const imageCount = document.querySelectorAll("img").length;

  return {
    url: window.location.href,
    title: document.title,
    wordCount,
    linkCount,
    imageCount,
  };
}

/**
 * Send page data to background script
 */
function sendPageVisited() {
  const pageData = analyzePage();

  const message = {
    type: "PAGE_VISITED",
    data: pageData,
  };

  // Send message without expecting response to avoid "message port closed" error
  chrome.runtime.sendMessage(message).catch((error) => {
    // Ignore "message port closed" error - it's expected when no response is sent
    if (!error.message?.includes("message port closed")) {
      console.error("Failed to send message:", error);
    }
  });

  console.log("Page data sent to background:", pageData);
}

/**
 * Initialize content script
 */
function init() {
  console.log("Content script initialized");
  // Small delay to ensure background script is ready
  setTimeout(sendPageVisited, 100);
}

// Wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
