import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils/cn";

const buttonVariants = cva(
  "w-full items-center cursor-pointer justify-center whitespace-nowrap rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gray-800 text-white hover:bg-gray-700",
        subtle: "bg-transparent hover:bg-gray-100",
        secondary: "border text-gray-800 border-solid border-gray-300 bg-white",
      },
      size: {
        sm: "text-body-3",
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
