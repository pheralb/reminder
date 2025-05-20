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
import {
  CalendarIcon,
  ChevronDown,
  ChevronDownIcon,
  CornerDownRightIcon,
  LoaderIcon,
  PlusIcon,
} from "lucide-react";
import { toast } from "@pheralb/toast";
import { Calendar } from "@/ui/calendar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/collapsible";

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
  const [openDueDate, setOpenDueDate] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<InsertReminder>({
    resolver: zodResolver(reminderZodSchema),
    defaultValues: {
      collectionId: collectionId,
    },
  });

  const handleCreateReminder = async (data: InsertReminder) => {
    setIsLoading(true);
    try {
      await insertReminder({
        ...data,
        collectionId: collectionId,
      });
      form.reset();
      setIsOpen(false);
      setIsLoading(false);
      toast.success({
        text: "Reminder created successfully",
      });
    } catch (error) {
      console.error("⚠️ createReminder - Error creating reminder:", error);
      toast.error({
        text: "Failed to create reminder",
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
            className="mt-2 space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
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
            <Collapsible open={openDueDate} onOpenChange={setOpenDueDate}>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <CalendarIcon size={14} />
                  <span>Due Date</span>
                </div>
                <ChevronDown
                  size={14}
                  className={cn(
                    openDueDate ? "rotate-180" : "rotate-0",
                    "transition-transform duration-200 ease-in-out",
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col items-center justify-center">
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <Calendar
                        initialFocus
                        className="mt-2 w-full p-0"
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CollapsibleContent>
            </Collapsible>
            <div className="flex items-center justify-end space-x-2">
              <Button
                type="button"
                onClick={() => handleOnClose(false)}
                variant="outline"
              >
                <span>Cancel</span>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <LoaderIcon className="animate-spin" size={16} />
                ) : (
                  <PlusIcon size={16} />
                )}
                <span>{isLoading ? "Creating..." : "Create"}</span>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReminder;
