"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/utils/cn";
import SidebarContent from "@/components/sidebar/sidebarContent";
import { ChevronLeftIcon } from "lucide-react";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={cn("flex h-screen")}>
      <SidebarContent close={!isOpen} />
      <div
        className={cn(
          "relative w-screen",
          "bg-zinc-50 dark:bg-zinc-800/40",
          "rounded-tl-lg border border-zinc-300 dark:border-zinc-800",
          isOpen ? "mt-3 ml-56 h-[calc(100dvh-12px)]" : "h-screen",
        )}
      >
        <button
          className={cn("rounded-full p-0.5", "bg-zinc-200 dark:bg-zinc-800")}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronLeftIcon size={14} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
