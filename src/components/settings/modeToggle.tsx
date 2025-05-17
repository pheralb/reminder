"use client";

import { Button } from "@/ui/button";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ModeOptions = [
  {
    name: "Light",
    theme: "light",
    icon: <SunIcon size={16} />,
  },
  {
    name: "Dark",
    theme: "dark",
    icon: <MoonIcon size={16} />,
  },
  {
    name: "System",
    theme: "system",
    icon: <MonitorIcon size={16} />,
  },
];

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center space-x-2">
      {ModeOptions.map((mode) => (
        <Button
          key={mode.theme}
          variant={theme === mode.theme ? "default" : "ghost"}
          onClick={() => handleThemeChange(mode.theme)}
          className="flex items-center space-x-2"
        >
          {mode.icon}
          <span>{mode.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default ModeToggle;
