import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "./utils/cn";

const inputVariants = cva(
  "w-full rounded-xl py-[0.9375rem] px-4 border border-solid border-gray-200 text-gray-900 text-body-2 placeholder:text-gray-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
);

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input className={cn(inputVariants(), className)} ref={ref} {...props} />
  );
});
Input.displayName = "Input";

export { Input, inputVariants };
