import { Check } from "lucide-react";
import { cn } from "@/utils/cn";
import { forwardRef, type HTMLAttributes } from "react";

export interface ColorOption {
  value: string;
  gradient: string;
  name?: string;
}

export interface ColorSelectorProps extends HTMLAttributes<HTMLDivElement> {
  options: ColorOption[];
  value?: string | null;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const ColorSelector = forwardRef<HTMLDivElement, ColorSelectorProps>(
  ({ options, value, onValueChange, className, ...props }, ref) => {
    const handleColorSelect = (colorValue: string) => {
      onValueChange?.(colorValue);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8",
          className,
        )}
        {...props}
      >
        {options.map((color) => (
          <div
            key={color.value}
            className={cn(
              "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md transition-all",
              "ring-offset-background hover:scale-105",
              value === color.value && "ring-ring ring-2 ring-offset-2",
            )}
            style={{ background: color.gradient }}
            onClick={() => handleColorSelect(color.value)}
            title={color.name ?? color.value}
          >
            {value === color.value && (
              <Check className="h-4 w-4 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
            )}
          </div>
        ))}
      </div>
    );
  },
);
ColorSelector.displayName = "ColorSelector";

export { ColorSelector };
