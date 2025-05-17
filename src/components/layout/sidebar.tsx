import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SidebarProps {
  children: ReactNode;
}

const SidebarClient = ({ children }: SidebarProps) => {
  return (
    <div className={cn("flex h-screen")}>
      <div
        className={cn(
          "relative ml-56 w-screen",
          "bg-zinc-50 dark:bg-zinc-900",
          "border border-zinc-300 dark:border-zinc-800",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarClient;
