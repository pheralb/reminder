import { Button, buttonVariants } from "@/ui/button";
import { HouseIcon, SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = (props: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center space-x-2 px-4 py-3">
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
      {!props.sidebarOpen && (
        <Link
          href="/app"
          title="Home"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <HouseIcon size={20} strokeWidth={1.5} />
        </Link>
      )}
    </header>
  );
};

export default Header;
