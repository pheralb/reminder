import type { ReactNode } from "react";

import { cn } from "@/utils/cn";
import { container } from "@/ui/container";

interface AppOptionsProps {
  title?: string;
  children: ReactNode;
}

const AppOptions = (props: AppOptionsProps) => {
  return (
    <div
      className={cn(
        "sticky top-0",
        "z-40 w-full py-4",
        "bg-zinc-50 dark:bg-zinc-900",
        "flex w-full flex-col justify-between space-y-3 md:flex-row md:items-center md:space-y-0",
        "animate-in fill-mode-backwards fade-in slide-in-from-bottom-2 duration-500 delay-0",
      )}
    >
      <div
        className={cn(container, "flex w-full items-center justify-between")}
      >
        <h2 className="text-2xl font-semibold tracking-tight">
          {props.title ?? "Home"}
        </h2>
        {props.children}
      </div>
    </div>
  );
};

export default AppOptions;
