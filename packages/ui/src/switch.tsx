import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils/cn";

const switchRootVariants = cva(
  "bg-gray-500 rounded-full relative [-webkit-tap-highlight-color:rgba(0,0,0,0)] focus:outline-none focus:shadow-none data-[state=checked]:bg-blue-200",
  {
    variants: {
      size: {
        sm: "w-12 h-6",
        md: "w-16 h-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const switchThumbVariants = cva(
  "block bg-white rounded-full shadow-[0_2px_2px_rgba(0,0,0,0.15)] transition-transform duration-100 will-change-transform cursor-default",
  {
    variants: {
      size: {
        sm: "w-[1.125rem] h-[1.125rem] translate-x-1 data-[state=checked]:translate-x-[1.625rem]",
        md: "w-6 h-6 translate-x-1 data-[state=checked]:translate-x-[2.25rem]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface SwitchProps
  extends
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchRootVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(switchRootVariants({ size }), className)}
    {...props}
  />
));
Switch.displayName = "Switch";

export interface SwitchThumbProps
  extends
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Thumb>,
    VariantProps<typeof switchThumbVariants> {}

const SwitchThumb = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Thumb>,
  SwitchThumbProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitive.Thumb
    ref={ref}
    className={cn(switchThumbVariants({ size }), className)}
    {...props}
  />
));
SwitchThumb.displayName = "SwitchThumb";

export { Switch, SwitchThumb };
