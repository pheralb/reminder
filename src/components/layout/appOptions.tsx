import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface AppOptionsProps {
  title?: string;
  children: ReactNode;
}

const AppOptions = (props: AppOptionsProps) => {
  return (
    <div
      className={cn(
        "sticky top-0",
        "py-3",
        "border-b border-zinc-200 dark:border-zinc-800",
        "bg-zinc-50 dark:bg-zinc-900",
        "flex w-full items-center justify-between",
      )}
    >
      <h2 className="font-onest text-2xl font-medium tracking-tight">
        {props.title ?? "Home"}
      </h2>
      {props.children}
    </div>
  );
};

export default AppOptions;
