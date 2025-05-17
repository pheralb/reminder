import type { ReactNode } from "react";
import SidebarClient from "./sidebar";
import SidebarContent from "./sidebarContent";

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider = (props: SidebarProviderProps) => {
  return (
    <SidebarClient>
      <SidebarContent/>
      {props.children}
    </SidebarClient>
  );
};

export default SidebarProvider;
