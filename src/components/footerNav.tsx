"use client";

import { appConfig } from "@/config";
import { badgeVariants } from "@/ui/badge";
import { ExternalLink } from "@/ui/externalLink";
import GitHub from "@/ui/logos/github";
import { cn } from "@/utils/cn";
import { ArrowUpRightIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const FooterNav = () => {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <nav className={cn("absolute bottom-4 left-4 hidden md:block")}>
      <div className="flex items-center space-x-2">
        <ExternalLink
          href={appConfig.repositoryUrl}
          className={cn(
            badgeVariants({
              variant: "outline",
              size: "sm",
            }),
            "cursor-pointer",
          )}
        >
          <GitHub width={14} height={14} />
          <span>GitHub</span>
          <ArrowUpRightIcon size={12} className="text-zinc-500" />
        </ExternalLink>
        <button
          onClick={handleChangeTheme}
          className={cn(
            badgeVariants({
              variant: "outline",
              size: "sm",
            }),
            "cursor-pointer",
          )}
        >
          <Sun
            size={14}
            className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
          />
          <Moon
            size={14}
            className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
          />
          <span>Theme</span>
        </button>
      </div>
    </nav>
  );
};

export default FooterNav;
