export type TranslateFn = (
  key: string,
  options?: Record<string, unknown>,
) => string;

export type DurationFormat = "long" | "short";

export type FormatDurationOptions = {
  format?: DurationFormat;
};

const DURATION_KEY_PREFIX: Record<DurationFormat, string> = {
  long: "common:duration",
  short: "common:durationCompact",
};

export const formatDuration = (
  seconds: number,
  t: TranslateFn,
  options: FormatDurationOptions = {},
): string => {
  const format = options.format ?? "long";
  const unitKey = (unit: "hour" | "minute" | "second") =>
    `${DURATION_KEY_PREFIX[format]}.${unit}`;

  if (seconds <= 0 || Number.isNaN(seconds)) {
    return t(unitKey("second"), { count: 0 });
  }

  const totalSeconds = Math.floor(seconds);

  if (totalSeconds < 60) {
    return t(unitKey("second"), { count: totalSeconds });
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(t(unitKey("hour"), { count: hours }));
  }

  if (minutes > 0) {
    parts.push(t(unitKey("minute"), { count: minutes }));
  }

  if (secs > 0 || parts.length === 0) {
    parts.push(t(unitKey("second"), { count: secs }));
  }

  return parts.slice(0, 2).join(" ");
};
