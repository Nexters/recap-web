"use client";

import * as React from "react";
import { cn, ToggleGroup, ToggleGroupItem } from "@recap/ui";

type ScreenTimeToggleProps = React.ComponentPropsWithoutRef<typeof ToggleGroup>;
export function ScreenTimeToggle({
  className,
  ...props
}: ScreenTimeToggleProps) {
  return (
    <ToggleGroup
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-gray-100 p-1",
        className,
      )}
      {...props}
    />
  );
}

type ScreenTimeTogglePillProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupItem
>;
export const ScreenTimeTogglePill = React.forwardRef<
  React.ElementRef<typeof ToggleGroupItem>,
  ScreenTimeTogglePillProps
>(({ className, ...props }, ref) => (
  <ToggleGroupItem
    ref={ref}
    className={cn(
      // ui 기본 위에, 도메인에서 더 얹고 싶으면 여기서
      "px-3 py-1.5",
      className,
    )}
    {...props}
  />
));
ScreenTimeTogglePill.displayName = "ScreenTimeTogglePill";
