import type { PropsWithChildren } from "react";
import { cn } from "@recap/ui";

const PageHeader = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        "fixed top-0 z-50 left-0 right-0 bg-white border-b border-gray-200",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PageHeader;
