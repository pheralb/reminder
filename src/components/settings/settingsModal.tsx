import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import SettingsCard from "./settingsCard";
import ModeToggle from "./modeToggle";

interface SettingsModalProps {
  children: ReactNode;
}

const SettingsModal = (props: SettingsModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Edit your Reminder settings here.
          </DialogDescription>
        </DialogHeader>
        <SettingsCard title="Theme">
          <ModeToggle />
        </SettingsCard>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
