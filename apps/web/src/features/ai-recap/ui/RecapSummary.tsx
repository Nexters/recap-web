"use client";

import Image from "next/image";
import type { RecapData } from "@recap/api";
import { useLocale } from "@recap/i18n";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
  Divider,
  Flex,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
  Stack,
} from "@recap/ui";

import {
  formatMeasuredRange,
  formatScreenTime,
} from "@/features/ai-recap/lib/format-date";
import AIRecapIcon from "@/shared/assets/icons/recap-ai.svg";
import RecapImg from "@/shared/assets/img/recap-1.png";
import { AI_RECAP_IMAGE } from "@/shared/config/recap.const";

const RecapSummary = ({ recap }: { recap: RecapData }) => {
  const { t } = useLocale("ai-recap");
  const { t: tc } = useLocale("common");

  const detail = recap.recap;
  const sections = recap.sections ?? [];
  const totalSeconds = recap.timelines?.reduce(
    (sum, timeline) => sum + timeline.duration,
    0,
  );

  const title = detail?.title?.trim() || "-";
  const summary = detail?.summary?.trim() || "-";
  const recapImage =
    (detail?.image && AI_RECAP_IMAGE[detail.image]) ?? RecapImg;

  return (
    <Card className="gap-0 overflow-hidden rounded-[1.25rem] bg-white p-0 shadow-none">
      <CardHeader className="gap-0 p-5 md:p-6 xl:p-10">
        <Flex
          direction="column"
          className="items-stretch gap-6 md:flex-row md:items-end md:justify-between"
        >
          <Stack gap="none" className="min-w-0 flex-1 gap-2">
            <p className="text-heading-md text-blue-400">
              {t("screenTime.todayRecapTitle")}
            </p>
            <CardTitle className="text-display-2 text-gray-900">
              {title}
            </CardTitle>
          </Stack>

          <Flex align="flex-end" className="shrink-0 flex-nowrap gap-4">
            <Stack gap="none" className="w-fit min-w-38 shrink-0 gap-1">
              <CardDescription className="text-subtitle-2-rg text-gray-500">
                {t("todayRecap.totalScreenTimeLabel")}
              </CardDescription>
              <p className="text-heading-rg m-0 text-gray-900">
                {formatScreenTime(tc, totalSeconds ?? 0)}
              </p>
            </Stack>

            <Divider orientation="vertical" className="h-18" />

            <Stack gap="none" className="w-fit min-w-38 shrink-0 gap-1">
              <CardDescription className="text-subtitle-2-rg text-gray-500">
                {t("todayRecap.measurementTimeLabel")}
              </CardDescription>
              <p className="text-heading-rg m-0 text-gray-900">
                {formatMeasuredRange(tc, detail?.startedAt, detail?.endedAt)}
              </p>
            </Stack>
          </Flex>
        </Flex>

        <Item className="mt-8 w-full max-w-full flex-nowrap items-start gap-4 self-stretch rounded-2xl border-0 bg-blue-50 p-0 px-2.5 py-2 shadow-none xl:mt-12">
          <ItemContent className="flex min-w-0 flex-1 flex-row flex-nowrap items-start gap-4 p-0">
            <div className="flex shrink-0 items-center gap-2">
              <AIRecapIcon className="size-6 shrink-0" />
              <ItemTitle className="text-subtitle-1-sb leading-6.5 whitespace-nowrap text-gray-900">
                {t("todayRecap.dailySummaryLabel")}
              </ItemTitle>
            </div>

            <ItemDescription className="text-body-2 min-w-0 flex-1 leading-6.5 break-words text-gray-800">
              {summary}
            </ItemDescription>
          </ItemContent>
        </Item>
      </CardHeader>

      <CardContent className="grid grid-cols-1 border-t border-solid border-gray-100 p-0 xl:grid-cols-[1fr_464px]">
        <div className="relative order-1 aspect-[464/420] min-h-0 w-full max-w-full overflow-hidden md:aspect-auto md:h-[388px] xl:order-2 xl:h-[420px] xl:w-[464px] xl:max-w-[464px] xl:shrink-0">
          <Image
            src={recapImage}
            alt="recapImg"
            fill
            sizes="(max-width: 1279px) 100vw, 464px"
            className="size-full object-cover object-center"
          />
        </div>

        {sections.length === 0 ? (
          <div className="order-2 px-5 py-6 md:px-6 md:pt-6 md:pr-9 md:pb-13 xl:order-1 xl:px-10">
            <p className="text-body-1 text-gray-500">
              {t("todayRecap.summarySectionsEmpty")}
            </p>
          </div>
        ) : (
          <ItemGroup className="order-2 gap-0 xl:order-1">
            {sections.map((section, index) => (
              <Item
                key={`${section.title}-${index}`}
                className={cn(
                  "flex-col items-stretch rounded-none border-0 bg-transparent p-0 px-5 py-6 shadow-none md:pt-6 md:pr-9 md:pb-13 md:pl-6 xl:pl-10",
                  index > 0 && "border-t border-solid border-gray-200",
                )}
              >
                <ItemContent className="gap-0 p-0">
                  <ItemDescription className="text-subtitle-2-sb text-gray-500">
                    {String(index + 1).padStart(2, "0")}
                  </ItemDescription>
                  <ItemTitle className="text-headline-sb mt-1 text-gray-900">
                    {section.title}
                  </ItemTitle>
                  <p className="text-body-1 mt-4 text-gray-900">
                    {section.content}
                  </p>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        )}
      </CardContent>
    </Card>
  );
};

export default RecapSummary;
