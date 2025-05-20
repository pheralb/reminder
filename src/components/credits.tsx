import Clerk from "@/ui/logos/clerk";
import { badgeVariants } from "@/ui/badge";
import { ExternalLink } from "@/ui/externalLink";

import { cn } from "@/utils/cn";
import { ArrowUpRightIcon, SparklesIcon } from "lucide-react";

const CreditsFooter = () => {
  return (
    <footer className={cn("absolute right-4 bottom-4")}>
      <div className="flex items-center space-x-2">
        <ExternalLink
          href="https://github.com/midudev/hackaton-clerk-2025"
          className={cn(
            badgeVariants({
              variant: "outline",
              size: "sm",
            }),
            "cursor-pointer",
          )}
        >
          <Clerk width={14} height={14} />
          <span>Clerk Hackathon</span>
          <ArrowUpRightIcon size={12} className="text-zinc-500" />
        </ExternalLink>
        <ExternalLink
          href="https://pheralb.dev/"
          className={cn(
            badgeVariants({
              variant: "outline",
              size: "sm",
            }),
            "cursor-pointer",
          )}
        >
          <SparklesIcon width={14} height={14} />
          <span>Built by pheralb</span>
          <ArrowUpRightIcon size={12} className="text-zinc-500" />
        </ExternalLink>
      </div>
    </footer>
  );
};

export default CreditsFooter;
