import type { GetReminders, InsertReminder } from "@/server/db/types";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Button } from "@/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/utils/cn";
import { updateReminder } from "@/server/queries/reminders";
import { reminderZodSchema } from "@/server/schemas/reminder";
import { LoaderIcon, PencilIcon, SaveIcon } from "lucide-react";
import { Textarea } from "@/ui/input";
import { toast } from "@pheralb/toast";

interface EditReminderProps {
  reminderData: GetReminders;
  className?: string;
}

const EditReminder = ({ reminderData, className }: EditReminderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<InsertReminder>({
    resolver: zodResolver(reminderZodSchema),
    defaultValues: {
      collectionId: reminderData.collectionId,
      title: reminderData.title,
    },
  });

  const handleEditReminder = async (data: InsertReminder) => {
    setIsLoading(true);
    try {
      await updateReminder(reminderData.id, {
        ...data,
        collectionId: reminderData.collectionId,
      });
      form.reset();
      setIsOpen(false);
      setIsLoading(false);
      toast.success({
        text: "Reminder updated successfully.",
      });
    } catch (error) {
      console.error("⚠️ editReminder - Error editing reminder:", error);
      toast.error({
        text: "Failed to edit reminder.",
        description: "Please try again later.",
      });
      setIsLoading(false);
    }
  };

  const handleOnClose = (value: boolean) => {
    setIsOpen(value);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(value) => handleOnClose(value)}>
      <DialogTrigger
        title="Edit reminder"
        className={cn(
          "text-zinc-600 dark:text-zinc-400",
          "hover:text-zinc-900 dark:hover:text-zinc-50",
          "transition-colors duration-100 ease-in-out",
          className,
        )}
      >
        <PencilIcon size={12} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-1.5">
            <span>Edit Reminder</span>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditReminder)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What's your plan?"
                      className="h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end space-x-2">
              <Button
                type="button"
                onClick={() => handleOnClose(false)}
                variant="outline"
              >
                <span>Cancel</span>
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !form.formState.isDirty}
              >
                {isLoading ? (
                  <LoaderIcon className="animate-spin" size={16} />
                ) : (
                  <SaveIcon size={16} />
                )}
                <span>{isLoading ? "Editing..." : "Edit"}</span>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditReminder;
