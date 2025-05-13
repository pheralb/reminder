import { cn } from "@/utils/cn";

import { Button } from "@/ui/button";
import { container } from "@/ui/container";
import CurrentTime from "@/components/currentTime";

const NavOptions = () => {
  return (
    <nav className={cn("w-full py-4", "bg-zinc-200/20 dark:bg-zinc-800/20")}>
      <div className={cn(container, "flex items-center justify-between")}>
        <CurrentTime />
        <Button>New Reminder</Button>
      </div>
    </nav>
  );
};

export default NavOptions;
