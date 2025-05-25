import type { ReactNode } from "react";

import { Link } from "react-router";
import { cn } from "@/utils/cn";
import { useLocation } from "react-router";

interface SidebarLinkProps {
  href: string;
  title?: string;
  children: ReactNode;
}

const SidebarLinkStyle = cn(
  "cursor-pointer flex w-full items-center space-x-2",
  "rounded-md px-4 py-1.5 text-sm",
  "hover:bg-zinc-200 dark:hover:bg-zinc-800",
  "transition-colors duration-200 ease-in-out",
);

const SidebarLink = (props: SidebarLinkProps) => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <Link
      title={props.title}
      to={props.href}
      className={cn(
        SidebarLinkStyle,
        pathname === props.href && "bg-zinc-200 dark:bg-zinc-800",
      )}
    >
      {props.children}
    </Link>
  );
};

export { SidebarLink, SidebarLinkStyle };
