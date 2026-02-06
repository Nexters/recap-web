"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "./utils/cn";

/** Root */
const Tabs = TabsPrimitive.Root;

/** List */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "relative flex items-center gap-1 rounded-full border border-border2 bg-surface shadow-1",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

/** Trigger */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative z-10 inline-flex items-center justify-center rounded-full px-4 py-2",
      "select-none outline-none transition-colors",
      "text-subtext data-[state=active]:text-white",
      "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

/** Content */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export { cn, Tabs, TabsContent, TabsList, TabsTrigger };
