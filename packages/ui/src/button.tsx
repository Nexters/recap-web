import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils/cn";

const buttonVariants = cva(
  "w-full items-center cursor-pointer justify-center whitespace-nowrap rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gray-800 text-white hover:bg-gray-700",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 ",
      },
      size: {
        sm: "py-1.5 text-label-2",
        md: "py-4 text-subtitle-1-md",
        lg: "py-5 text-subtitle-2-sb",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
