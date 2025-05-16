"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/utils/cn";
import SidebarContent from "@/components/layout/sidebarContent";
import { Button } from "@/ui/button";
import { SidebarOpenIcon } from "lucide-react";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div className={cn("flex h-screen")}>
      <SidebarContent isOpen={isOpen} />
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
        <Button onClick={() => setIsOpen(!isOpen)}>
          <SidebarOpenIcon size={16} />
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
