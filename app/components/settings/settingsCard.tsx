import type { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  children: ReactNode;
}

const SettingsCard = (props: SettingsCardProps) => {
  return (
    <div className="border-l border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-sm mb-2 font-medium tracking-tight text-zinc-700 dark:text-zinc-300">{props.title}</p>
      {props.children}
    </div>
  );
};

export default SettingsCard;
