import type { PropsWithChildren } from "react";
import { cn } from "@recap/ui";

const PageContent = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={cn("pt-12 pb-[7rem]", className)}>{children}</div>;
};
export default PageContent;
