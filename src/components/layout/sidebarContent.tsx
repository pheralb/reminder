import { cn } from "@/utils/cn";
import { appConfig } from "@/config";

import Link from "next/link";
import { ArrowUpRight, SettingsIcon } from "lucide-react";

import GitHub from "@/components/logos/github";
import UserMenu from "@/components/auth/userMenu";
import SettingsModal from "@/components/settings/settingsModal";

import { Separator } from "@/ui/separator";
import { ExternalLink } from "@/ui/externalLink";
import { Button, buttonVariants } from "@/ui/button";

interface SidebarContentProps {
  isOpen: boolean;
}

const SidebarItemStyle = cn(
  buttonVariants({
    variant: "outline",
  }),
  "justify-between text-sm",
);

const SidebarContent = ({ isOpen }: SidebarContentProps) => {
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full",
        "overflow-x-hidden overflow-y-auto",
        "bg-zinc-100 dark:bg-zinc-800/20",
        "transition-all duration-300 ease-in-out",
        isOpen ? "w-56" : "w-0",
      )}
    >
      <nav className="flex h-full flex-col px-4 pt-6 pb-5">
        <div className="flex flex-1">
          <div className="flex w-full flex-col">
            <Link
              href="/"
              className="h-fit w-fit text-xl font-medium tracking-tight"
            >
              <span>Reminder</span>
            </Link>
            <Separator className="my-4" />
          </div>
        </div>
        <section>
          <Separator className="mb-4" />
          <div className="flex flex-col space-y-2">
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
