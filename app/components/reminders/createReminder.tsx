import type { InsertReminder } from "@/database/types";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { buttonVariants } from "@/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/utils/cn";
import { CornerDownRightIcon, PlusIcon } from "lucide-react";
import { toast } from "@pheralb/toast";

import ManageRemindersForm from "@/components/reminders/manage.form";
import { reminderZodSchema } from "@/database/formSchemas/reminders";
import { useTRPC } from "@/database/trpc/utils";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const insertReminder = useMutation(
    trpc.reminders.insertReminder.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.collections.getCollectionsWithReminders.queryKey(),
        });
      },
    }),
  );

  const form = useForm<InsertReminder>({
    resolver: zodResolver(reminderZodSchema),
    defaultValues: {
      collectionId: collectionId,
    },
  });

  const handleCreateReminder = async (data: InsertReminder) => {
    setIsLoading(true);
    try {
      await insertReminder.mutateAsync({
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
        <ManageRemindersForm
          form={form}
          isLoading={isLoading}
          loadingText="Creating..."
          statusText="Create"
          icon={<PlusIcon size={16} />}
          onSendForm={handleCreateReminder}
          onCancelForm={() => handleOnClose(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateReminder;
