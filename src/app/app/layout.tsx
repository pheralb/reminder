import type { ReactNode } from "react";
import SidebarProvider from "@/components/layout/sidebarProvider";

interface WebAppLayoutProps {
  children: ReactNode;
}

const WebAppLayout = ({ children }: WebAppLayoutProps) => {
  return (
    <SidebarProvider>
      <main>{children}</main>
    </SidebarProvider>
  );
};

export default WebAppLayout;
