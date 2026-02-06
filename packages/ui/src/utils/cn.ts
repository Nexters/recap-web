import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-display-1",
        "text-display-2",
        "text-display-3",
        "text-title-1",
        "text-title-2",
        "text-heading-sb",
        "text-heading-md",
        "text-heading-rg",
        "text-headline-sb",
        "text-headline-md",
        "text-headline-rg",
        "text-subtitle-1-sb",
        "text-subtitle-1-md",
        "text-subtitle-2-sb",
        "text-subtitle-2-rg",
        "text-body-1",
        "text-body-2",
        "text-body-3",
        "text-label-1",
        "text-label-2",
        "text-caption-1",
        "border-gray-75",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
