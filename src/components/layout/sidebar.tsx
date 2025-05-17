"use client";

import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
}

const SidebarClient = ({ children, isOpen, setIsOpen }: SidebarProps) => {
  return (
    <div className={cn("flex h-screen")}>
      <div
        className={cn(
          "relative w-screen",
          "bg-zinc-50 dark:bg-zinc-900",
          "border border-zinc-300 dark:border-zinc-800",
          isOpen ? "ml-56" : "ml-0",
        )}
      >
        <button
          className={cn(
            "absolute left-0 h-full w-0.5",
            "hover:bg-zinc-300 hover:dark:bg-zinc-700",
            "cursor-w-resize",
            "transition-colors duration-200 ease-in-out",
          )}
          onClick={() => setIsOpen(!isOpen)}
        />
        {children}
      </div>
    </div>
  );
};

export default SidebarClient;
