import Link from "next/link";

import { cn } from "@/utils/cn";
import { appConfig } from "@/config";

import { container } from "@/ui/container";
import ExternalLink from "@/ui/externalLink";
import { buttonVariants } from "@/ui/button";

import Settings from "@/components/settings";
import GitHub from "@/components/logos/github";
import UserMenu from "@/components/auth/userMenu";

const Header = () => {
  return (
    <header
      className={cn(
        "fixed top-0 h-16 w-full py-6",
        "flex items-center",
        "z-50 bg-zinc-100/40 dark:bg-zinc-900/40",
      )}
    >
      <div
        className={cn(container, "flex w-full items-center justify-between")}
      >
        <Link href="/" className="font-instrument-sans text-2xl">
          Reminder
        </Link>
        <nav className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-1">
            <Settings />
            <ExternalLink
              title="GitHub Repository"
              href={appConfig.repositoryUrl}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon",
                }),
              )}
            >
              <GitHub width={18} height={18} />
            </ExternalLink>
          </div>
          <UserMenu />
        </nav>
      </div>
    </header>
  );
};

export default Header;
