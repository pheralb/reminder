import { Button } from "@/ui/button";
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = (props: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center px-4 py-3">
      <Button
        size="icon"
        variant="ghost"
        title="Toggle Sidebar"
        onClick={() => props.setSidebarOpen(!props.sidebarOpen)}
      >
        {props.sidebarOpen ? (
          <SidebarCloseIcon size={20} strokeWidth={1.5} />
        ) : (
          <SidebarOpenIcon size={20} strokeWidth={1.5} />
        )}
      </Button>
    </header>
  );
};

export default Header;
