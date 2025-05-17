"use client";

import type { ReactNode } from "react";

import Link from "next/link";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  children: ReactNode;
}

const SidebarLink = (props: SidebarLinkProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={props.href}
      className={cn(
        "flex w-full items-center space-x-2",
        "rounded-md px-4 py-2 text-sm",
        "hover:bg-zinc-200 dark:hover:bg-zinc-800",
        "transition-colors duration-200 ease-in-out",
        pathname === props.href && "bg-zinc-200 dark:bg-zinc-800",
      )}
    >
      {props.children}
    </Link>
  );
};

export default SidebarLink;
