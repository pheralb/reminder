import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface CollectionGroupProps {
  children: ReactNode;
}

const CollectionGroup = (props: CollectionGroupProps) => {
  return (
    <div
      className={cn(
        "mt-3 flex flex-col space-y-14",
        "animate-in fill-mode-backwards fade-in slide-in-from-bottom-4 delay-200 duration-500",
      )}
    >
      {props.children}
    </div>
  );
};

export default CollectionGroup;
