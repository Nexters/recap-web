import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva } from "class-variance-authority";

import { cn } from "./utils/cn";

const toggleItemVariants = cva(
  "text-gray-900 bg-white py-1 px-3 rounded-none",
  {
    variants: {
      position: {
        left: "rounded-l-[0.25rem]",
        center: "rounded-none",
        right: "rounded-r-[0.25rem]",
      },
    },
    defaultVariants: {
      position: "center",
    },
  },
);

const ToggleGroup = ToggleGroupPrimitive.Root;

type ToggleGroupItemPosition = "left" | "right" | "center";
const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & {
    position?: ToggleGroupItemPosition;
  }
>(({ className, position, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      toggleItemVariants({ position }),
      "text-subtitle-2-sb",
      className,
    )}
    {...props}
  />
));
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
