import { buttonVariants } from "@/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { cn } from "@/utils/cn";
import { SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <Popover>
      <PopoverTrigger
        title="Settings"
        className={cn(
          buttonVariants({
            size: "icon",
            variant: "ghost",
          }),
        )}
      >
        <SettingsIcon size={20} />
        <span className="sr-only">Settings</span>
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};

export default Settings;
