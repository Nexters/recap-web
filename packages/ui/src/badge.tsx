import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils/cn";

const badgeVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-[1rem] px-4 py-1.5 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-white text-subtitle-2-sb",
        secondary: "bg-gray-100 text-gray-900 text-subtitle-2-rg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
