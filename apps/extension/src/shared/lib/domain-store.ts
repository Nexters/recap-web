import { getStorage, setStorage } from "@/shared/lib/storage";
import { extractDomainUrl } from "@/shared/lib/url";

export const excludedDomainStore = {
  async getAll(): Promise<string[]> {
    const result = await getStorage(["excludedDomains"]);
    return result.excludedDomains ?? [];
  },

  async add(domain: string): Promise<void> {
    const domains = await this.getAll();
    await this.replaceAll([...domains, domain]);
  },

  async replaceAll(domains: string[]): Promise<void> {
    await setStorage({
      excludedDomains: domains,
    });
  },

  async remove(domain: string): Promise<void> {
    const domains = await this.getAll();
    await this.replaceAll(domains.filter((item) => item !== domain));
  },

  async clear(): Promise<void> {
    await this.replaceAll([]);
  },

  async isExcluded(url: string): Promise<boolean> {
    const domains = await this.getAll();

    const normalizedUrl = extractDomainUrl(url);
    const { host } = new URL(normalizedUrl);
    const normalizedHost = host.replace(/^www\./, "");

    return domains.some(
      (domain) => domain.replace(/^www\./, "") === normalizedHost,
    );
  },
};
