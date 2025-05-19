import type { InsertReminder } from "@/server/db/types";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Button, buttonVariants } from "@/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "@/ui/input";
import { insertReminder } from "@/server/queries/reminders";
import { reminderZodSchema } from "@/server/schemas/reminder";
import { cn } from "@/utils/cn";
import { CornerDownRightIcon, PlusIcon } from "lucide-react";

interface CreateReminderProps {
  collectionName: string;
  collectionColor: string | null;
  collectionId: string;
}

const CreateReminder = ({
  collectionName,
  collectionColor,
  collectionId,
}: CreateReminderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<InsertReminder>({
    resolver: zodResolver(reminderZodSchema),
    defaultValues: {
      collectionId: collectionId,
    },
  });

  const handleCreateReminder = async (data: InsertReminder) => {
    try {
      await insertReminder({
        ...data,
        collectionId: collectionId,
      });
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  const handleOnClose = (value: boolean) => {
    setIsOpen(value);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(value) => handleOnClose(value)}>
      <DialogTrigger
        title="Add a new reminder"
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "icon",
          }),
          "h-7",
        )}
      >
        <PlusIcon size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-1.5">
            {collectionColor && (
              <div
                className={cn(collectionColor, "h-4 w-4 rounded-full", "mr-2")}
              />
            )}
            <span>New Reminder</span>
          </DialogTitle>
          <DialogDescription className="flex items-center space-x-1.5">
            <CornerDownRightIcon size={16} />
            <span>{collectionName}</span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateReminder)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Go to the gym" {...field} />
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
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReminder;
