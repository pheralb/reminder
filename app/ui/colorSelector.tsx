import { cn } from "@/utils/cn";
import { forwardRef, type HTMLAttributes } from "react";

export interface ColorOption {
  gradient: string;
  name?: string;
}

export interface ColorSelectorProps extends HTMLAttributes<HTMLDivElement> {
  options: ColorOption[];
  value?: string | null;
  defaultValue?: string;
  onValueChange?: (gradient: string) => void;
}

const ColorSelector = forwardRef<HTMLDivElement, ColorSelectorProps>(
  ({ options, value, onValueChange, className, ...props }, ref) => {
    const handleColorSelect = (gradient: string) => {
      onValueChange?.(gradient);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-5 gap-3 sm:grid-cols-2 md:grid-cols-4",
          className,
        )}
        {...props}
      >
        {options.map((color) => (
          <button
            type="button"
            key={color.gradient}
            className={cn(
              "flex cursor-pointer flex-col overflow-hidden rounded-md transition-colors duration-200 ease-in-out select-none",
              "border border-zinc-200 dark:border-zinc-800",
              "hover:border-zinc-300 dark:hover:border-zinc-700",
              value === color.gradient &&
                "ring-ring ring-2 ring-zinc-500 dark:ring-zinc-400",
            )}
            onClick={() => handleColorSelect(color.gradient)}
            title={color.name ?? color.gradient}
          >
            <div className={cn(color.gradient, "h-6 w-full")} />
            <div className="flex flex-col p-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
              <p>{color.name}</p>
            </div>
          </button>
        ))}
      </div>
    );
  },
);
ColorSelector.displayName = "ColorSelector";

export { ColorSelector };
