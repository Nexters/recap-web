import * as React from "react";
import { cn } from "@recap/ui";

import ArrowDownSvg from "@/assets/icons/arrow-down.svg?react";
import ArrowUpSvg from "@/assets/icons/arrow-up.svg?react";
import FigmaSvg from "@/assets/icons/figma.svg?react";

export type IconName = "arrow-up" | "arrow-down" | "figma";

const iconRegistry: Record<
  IconName,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  "arrow-up": ArrowUpSvg,
  "arrow-down": ArrowDownSvg,
  figma: FigmaSvg,
};

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
}

const Icon = ({ name, className, ...props }: IconProps) => {
  const IconComponent = iconRegistry[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in registry`);
    return null;
  }

  return <IconComponent className={cn(className)} {...props} />;
};

export default Icon;
