import browser from "webextension-polyfill";

/**
 * Storage schema
 */
export interface StorageData {
  visitCount: number;
  settings?: {
    enabled: boolean;
    theme: "light" | "dark" | "system";
  };
}

/**
 * Default values for storage
 */
const defaultStorage: StorageData = {
  visitCount: 0,
  settings: {
    enabled: true,
    theme: "system",
  },
};

/**
 * Get values from storage
 */
export async function getStorage<K extends keyof StorageData>(
  keys: K[],
): Promise<Pick<StorageData, K>> {
  const result = await browser.storage.sync.get(keys);

  // Apply defaults for missing keys
  const data: Partial<StorageData> = {};
  for (const key of keys) {
    data[key] = result[key] ?? defaultStorage[key];
  }

  return data as Pick<StorageData, K>;
}

/**
 * Set values in storage
 */
export async function setStorage(data: Partial<StorageData>): Promise<void> {
  await browser.storage.sync.set(data);
}

/**
 * Clear all storage
 */
export async function clearStorage(): Promise<void> {
  await browser.storage.sync.clear();
}
