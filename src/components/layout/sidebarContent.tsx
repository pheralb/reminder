import { cn } from "@/utils/cn";
import { appConfig } from "@/config";

import Link from "next/link";
import { ArrowUpRight, HouseIcon, SettingsIcon } from "lucide-react";

import UserMenu from "@/components/auth/userMenu";
import SidebarLink from "@/components/layout/sidebarLink";
import SettingsModal from "@/components/settings/settingsModal";

import GitHub from "@/ui/logos/github";
import { Separator } from "@/ui/separator";
import { ExternalLink } from "@/ui/externalLink";
import { Button, buttonVariants } from "@/ui/button";
import ShowOrganizations from "../organizations/showOrganizations";

const SidebarItemStyle = cn(
  buttonVariants({
    variant: "outline",
  }),
  "justify-between text-sm",
);

const SidebarContent = () => {
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full w-56",
        "overflow-x-hidden overflow-y-auto",
        "bg-zinc-100 dark:bg-zinc-800/20",
        "transition-all duration-300 ease-in-out",
      )}
    >
      <nav className="flex h-full flex-col px-4 pt-6 pb-5">
        <div className="flex flex-1">
          <div className="flex w-full flex-col">
            <Link
              href="/"
              className={cn(
                "h-fit w-fit",
                "text-xl font-medium tracking-tight",
                "hover:text-zinc-700 dark:hover:text-zinc-300",
                "transition-colors duration-200 ease-in-out",
              )}
            >
              <span>Reminder</span>
            </Link>
            <Separator className="my-4" />
            {/* Nav Links */}
            <nav className="flex flex-col space-y-1.5">
              <SidebarLink href="/">
                <HouseIcon size={16} />
                <span>Home</span>
              </SidebarLink>
              <ShowOrganizations />
            </nav>
          </div>
        </div>
        <section>
          <Separator className="mb-4" />
          <div className="flex flex-col space-y-2">
            {/* Footer Nav Links */}
            <SettingsModal>
              <Button variant="outline" className="justify-start">
                <SettingsIcon size={16} />
                <span>Settings</span>
              </Button>
            </SettingsModal>
            <ExternalLink
              href={appConfig.repositoryUrl}
              className={SidebarItemStyle}
            >
              <div className="flex items-center space-x-2">
                <GitHub width={16} height={16} />
                <span>Repository</span>
              </div>
              <ArrowUpRight size={14} className="text-zinc-500" />
            </ExternalLink>
            <div
              className={cn(
                "rounded-md border border-zinc-200 dark:border-zinc-800",
                "overflow-hidden p-2.5 shadow-sm",
              )}
            >
              <UserMenu />
            </div>
          </div>
        </section>
      </nav>
    </aside>
  );
};

export default SidebarContent;
