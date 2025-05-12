"use client";

import type { ReactNode } from "react";

import { cn } from "@/utils/cn";
import SidebarContent from "@/components/sidebar/sidebarContent";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className={cn("flex h-screen")}>
      <SidebarContent />
      <div
        className={cn(
          "h-[calc(100dvh-12px)] w-screen",
          "bg-zinc-50 dark:bg-zinc-800/40",
          "border border-zinc-300 dark:border-zinc-800",
          "mt-3 ml-56 rounded-tl-lg",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
