import type { TimeZoneSchemaType } from "@recap/api";
import { SERVER_TIMEZONE } from "@recap/lib";
import browser from "webextension-polyfill";

import { TIMEZONE_STORAGE_KEY } from "@/entities/language/config/time-zone.const";

export const browserTimeZone = {
  get: async (): Promise<TimeZoneSchemaType> => {
    const result = await browser.storage.local.get(TIMEZONE_STORAGE_KEY);
    const timeZone = result[TIMEZONE_STORAGE_KEY];

    if (
      timeZone === SERVER_TIMEZONE.SEOUL ||
      timeZone === SERVER_TIMEZONE.PACIFIC
    ) {
      return timeZone;
    }

    return SERVER_TIMEZONE.PACIFIC;
  },
  set: async (timeZone: TimeZoneSchemaType) => {
    await browser.storage.local.set({ [TIMEZONE_STORAGE_KEY]: timeZone });
  },
};
