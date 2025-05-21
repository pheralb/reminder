import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/ui/dialog";
import { Button } from "@/ui/button";

import { cn } from "@/utils/cn";
import { toast } from "@pheralb/toast";
import { LoaderIcon, TrashIcon } from "lucide-react";
import { deleteReminder } from "@/server/queries/reminders";

interface DeleteReminderProps {
  title: string;
  reminderId: string;
  className?: string;
}

const DeleteReminder = (props: DeleteReminderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteReminder = async () => {
    setIsLoading(true);
    try {
      await deleteReminder(props.reminderId);
      setIsOpen(false);
      setIsLoading(false);
      toast.success({
        text: "Deleted reminder successfully",
      });
    } catch (error) {
      console.error("⚠️ DeleteReminder - Error deleting reminder:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        title="Delete reminder"
        className={cn(
          "text-zinc-700 dark:text-zinc-300",
          "hover:text-zinc-900 dark:hover:text-zinc-50",
          "transition-colors duration-100 ease-in-out",
          props.className,
        )}
      >
        <TrashIcon size={12} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Reminder</DialogTitle>
          <DialogDescription>
            This <strong>{props.title}</strong> reminder will be deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDeleteReminder()}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderIcon className="animate-spin" size={16} />
            ) : (
              <TrashIcon size={16} />
            )}
            <span>{isLoading ? "Deleting..." : "Confirm"}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteReminder;
