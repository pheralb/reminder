"use client";

import { useState, type ReactNode } from "react";
import SidebarClient from "./sidebar";
import SidebarContent from "./sidebarContent";

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider = (props: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <SidebarClient isOpen={isOpen} setIsOpen={setIsOpen}>
      <button
        className="absolute left-0 h-full w-0.5 cursor-w-resize transition-colors duration-200 ease-in-out hover:bg-zinc-300 hover:dark:bg-zinc-700"
        onClick={() => setIsOpen(!isOpen)}
      />
      <SidebarContent isOpen={isOpen} />
      {props.children}
    </SidebarClient>
  );
};

export default SidebarProvider;
