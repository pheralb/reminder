import { cn } from "@/utils/cn";
import CreateCollection from "../collections/createCollection";

const AppOptions = () => {
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
      <h2 className="font-onest text-2xl font-medium tracking-tight">Today</h2>
      <CreateCollection />
    </div>
  );
};

export default AppOptions;
