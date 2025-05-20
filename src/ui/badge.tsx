import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center cursor-default gap-1.5 font-medium rounded-full border transition-colors hover:text-black dark:hover:text-white ease-in-out",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700",
        primary:
          "bg-zinc-800 text-zinc-50 border-zinc-700 dark:bg-zinc-700 dark:text-zinc-50 dark:border-zinc-600",
        secondary:
          "bg-zinc-200 text-zinc-700 border-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-600",
        success:
          "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800",
        warning:
          "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800",
        danger:
          "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800",
        outline:
          "bg-transparent border border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-400",
      },
      size: {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-2.5 py-0.5",
        lg: "text-base px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: ReactNode;
}

export function Badge({
  children,
  variant,
  size,
  icon,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
