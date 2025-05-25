import { Button } from "@/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { Theme, useTheme } from "remix-themes";

const ModeOptions = [
  {
    name: "Light",
    theme: Theme.LIGHT,
    icon: <SunIcon size={16} />,
  },
  {
    name: "Dark",
    theme: Theme.DARK,
    icon: <MoonIcon size={16} />,
  },
];

const ModeToggle = () => {
  const [theme, setTheme] = useTheme();

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center space-x-1.5">
      {ModeOptions.map((mode) => (
        <Button
          key={mode.theme}
          variant={theme === mode.theme ? "default" : "outline"}
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
