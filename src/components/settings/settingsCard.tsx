import type { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  children: ReactNode;
}

const SettingsCard = (props: SettingsCardProps) => {
  return (
    <div>
      <p>{props.title}</p>
      {props.children}
    </div>
  );
};

export default SettingsCard;
