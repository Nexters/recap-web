import { historyAPIService } from "@/entities/history/api";
import type { CreateHistoryDTO } from "@/entities/history/model/history.type";
import type { StorageSession } from "@/entities/history/model/storage.type";
import { browserTimeZone } from "@/entities/language/lib/browser-time-zone";
import { excludedDomainStore } from "@/shared/lib/domain-store";
import { extractDomainUrl } from "@/shared/lib/url";

const browserHistory = {
  record: async (session: StorageSession | null) => {
    if (!session) {
      return;
    }
    if (await excludedDomainStore.isExcluded(session.url)) return;

    const timeZone = await browserTimeZone.get();

    if (
      session?.closedAt &&
      session.visitedAt &&
      session.closedAt - session.visitedAt <= 10
    ) {
      return;
    }

    historyAPIService.createHistory({
      url: extractDomainUrl(session.url),
      visitedAt: session.visitedAt,
      closedAt: session.closedAt,
      timeZone,
      title: session.title,
      description: session.description,
      faviconUrl: session.faviconUrl,
      isClosed: session?.isClosed ?? false,
    } as CreateHistoryDTO);
  },
};

export default browserHistory;
