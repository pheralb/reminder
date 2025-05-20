import { cn } from "@/utils/cn";

type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
  decorative?: boolean;
};

export function Separator({
  orientation = "horizontal",
  className,
  decorative = true,
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        "bg-zinc-200 dark:bg-zinc-800",
        className,
      )}
    />
  );
}
