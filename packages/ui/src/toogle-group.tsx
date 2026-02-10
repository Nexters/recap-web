"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "./utils/cn";

const ToggleGroup = ToggleGroupPrimitive.Root;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      // ✅ ui 기본값(너무 도메인스럽지 않게, 그래도 usable)
      "rounded-full px-3 py-1.5 text-sm font-semibold transition",
      "text-gray-600 data-[state=on]:bg-gray-900 data-[state=on]:text-white",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30",
      className,
    )}
    {...props}
  />
));
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
