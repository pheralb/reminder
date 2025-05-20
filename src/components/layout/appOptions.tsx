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
        "z-50 py-3.5",
        "border-b border-zinc-200 dark:border-zinc-800",
        "bg-zinc-50 dark:bg-zinc-900",
        "flex w-full flex-col justify-between space-y-3 md:flex-row md:items-center md:space-y-0",
      )}
    >
      <h2 className="text-2xl font-semibold tracking-tight">
        {props.title ?? "Home"}
      </h2>
      {props.children}
    </div>
  );
};

export default AppOptions;
