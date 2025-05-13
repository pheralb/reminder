import { cn } from "@/utils/cn";

import Link from "next/link";
import UserMenu from "@/components/auth/userMenu";
import ExternalLink from "@/ui/externalLink";
import { buttonVariants } from "@/ui/button";
import GitHub from "../logos/github";
import { appConfig } from "@/config";
import { ArrowUpRight } from "lucide-react";

interface SidebarContentProps {
  close: boolean;
}

const SidebarContent = ({ close }: SidebarContentProps) => {
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full",
        "overflow-x-hidden overflow-y-auto",
        "bg-zinc-100 dark:bg-zinc-900",
        "transition-all duration-300 ease-in-out",
        close ? "w-0 opacity-0" : "w-56 opacity-100",
      )}
    >
      <nav className="flex h-full flex-col px-4 pt-6 pb-5">
        <div className="flex flex-1">
          <Link
            href="/"
            className="font-instrument-sans h-fit text-2xl font-medium"
          >
            <span>Reminder</span>
          </Link>
        </div>
        <div className="flex flex-col space-y-3">
          <ExternalLink
            href={appConfig.repositoryUrl}
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "justify-between text-sm",
            )}
          >
            <div className="flex items-center space-x-2">
              <GitHub width={16} height={16} />
              <span>Repository</span>
            </div>
            <ArrowUpRight size={14} className="text-zinc-500" />
          </ExternalLink>
          <div
            className={cn(
              "border border-zinc-200 dark:border-zinc-800",
              "overflow-hidden rounded-md p-2.5 shadow-sm",
            )}
          >
            <UserMenu />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SidebarContent;
