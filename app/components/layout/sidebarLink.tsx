import type { ReactNode } from "react";

import { cn } from "@/utils/cn";
import { NavLink } from "react-router";

interface SidebarLinkProps {
  href: string;
  title?: string;
  children: ReactNode;
}

const SidebarLinkStyle = cn(
  "cursor-pointer flex w-full items-center space-x-2",
  "rounded-md px-4 py-1.5 text-sm",
  "hover:bg-zinc-200 dark:hover:bg-zinc-800",
  "text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white",
  "transition-colors duration-200 ease-in-out",
);

const SidebarLink = (props: SidebarLinkProps) => {
  return (
    <NavLink
      to={props.href}
      title={props.title}
      className={({ isActive }) =>
        cn(
          SidebarLinkStyle,
          isActive && "bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white",
        )
      }
    >
      {props.children}
    </NavLink>
  );
};

export { SidebarLink, SidebarLinkStyle };
