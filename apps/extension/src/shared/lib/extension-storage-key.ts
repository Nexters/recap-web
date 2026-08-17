export const ExtensionStorageKey = {
  BrowserTab: "browserTab",
  WindowTab: "windowTab",
} as const;

export type ExtensionStorageKey =
  (typeof ExtensionStorageKey)[keyof typeof ExtensionStorageKey];
