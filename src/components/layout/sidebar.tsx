import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SidebarProps {
  isOpen: boolean;
  children: ReactNode;
}

const SidebarClient = ({ isOpen, children }: SidebarProps) => {
  return (
    <div className={cn("relative flex h-screen")}>
      <div
        className={cn(
          "relative w-screen overflow-y-auto",
          "bg-zinc-50 dark:bg-zinc-900",
          isOpen ? "ml-60" : "ml-0",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarClient;
