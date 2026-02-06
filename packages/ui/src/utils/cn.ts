import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-heading-bold",
        "text-heading",
        "text-title-bold",
        "text-subtitle-bold",
        "text-body-1-bold",
        "text-body-1-medium",
        "text-body-2-bold",
        "text-body-2-medium",
        "text-body-3-medium",
        "text-body-3-bold",
        "text-caption-1-bold",
        "text-caption-1-medium",
        "text-caption-2-bold",
        "text-caption-2-medium",
        "text-caption-3-medium",
        "text-label-1-medium",
        "text-label-1-bold",
        "body-medium",
        "text-new-caption-2-medium",
      ],
      rounded: [
        "rounded-1",
        "rounded-2",
        "rounded-3",
        "rounded-4",
        "rounded-5",
        "rounded-6",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
