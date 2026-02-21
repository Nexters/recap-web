import dayjs from "dayjs";

export function calculateTimeDiff(
  visitedAt: number | undefined,
  closedAt: number | undefined | null,
): number {
  if (!visitedAt || !closedAt) {
    return 0;
  }
  const visited = dayjs.unix(visitedAt);
  const closed = dayjs.unix(closedAt);
  return closed.diff(visited, "second", true);
}
