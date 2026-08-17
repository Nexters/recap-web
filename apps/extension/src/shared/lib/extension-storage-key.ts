export const ExtensionStorageKey = {
  BrowserTab: "browserTab",
} as const;

export type ExtensionStorageKey =
  (typeof ExtensionStorageKey)[keyof typeof ExtensionStorageKey];
