import type { GetReminders } from "@/database/types";

import { useState } from "react";
import { motion } from "motion/react";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/utils/cn";
import { CalendarIcon } from "lucide-react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";

// import EditReminder from "@/components/reminders/editReminder";
// import DeleteReminder from "@/components/reminders/deleteReminder";
import { useTRPC } from "@/database/trpc/utils";
import { toast } from "@pheralb/toast";

type Reminder = GetReminders;

interface ReminderItemProps {
  reminderData: Reminder;
}

interface CheckboxProps {
  reminderId: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const CheckBoxAnimatedIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M5 7.5L7 9.5L7.40859 8.81902C8.13346 7.6109 9.00376 6.49624 10 5.5V5.5"
        className="stroke-white dark:stroke-black"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: 1,
        }}
        exit={{
          pathLength: 0,
        }}
        transition={{
          delay: 0.025,
          duration: 0.35,
        }}
      />
    </svg>
  );
};

const Checkbox = ({ reminderId, checked, onCheckedChange }: CheckboxProps) => {
  return (
    <RadixCheckbox.Root
      id={reminderId}
      checked={checked}
      title={checked ? "Mark as not completed" : "Mark as completed"}
      onCheckedChange={onCheckedChange}
      className={cn(
        "cursor-pointer",
        "flex h-4 w-4 flex-shrink-0 appearance-none items-center justify-center rounded outline-none",
        "bg-zinc-100 dark:bg-zinc-900",
        "border border-zinc-400 dark:border-zinc-700",
        "transition-colors ease-in-out hover:border-zinc-400 dark:hover:border-zinc-600",
      )}
    >
      <RadixCheckbox.Indicator>
        <motion.div
          className="h-[inherit] w-[inherit] rounded bg-black dark:bg-white"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <CheckBoxAnimatedIcon />
        </motion.div>
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
};

const ReminderItem = ({ reminderData }: ReminderItemProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [optimisticIsCompleted, setOptimisticIsCompleted] = useState(
    reminderData.isCompleted,
  );

  const updateReminderStatus = useMutation(
    trpc.reminders.updateReminderStatus.mutationOptions({
      onMutate: async (input) => {
        await queryClient.cancelQueries({
          queryKey: trpc.reminders.getReminders.queryKey(),
        });

        const previousReminders = queryClient.getQueryData(
          trpc.reminders.getReminders.queryKey(),
        );

        if (previousReminders) {
          const updatedReminders = previousReminders.map((reminder) =>
            reminder.id === reminderData.id
              ? { ...reminder, isCompleted: input.isCompleted }
              : reminder,
          );

          queryClient.setQueryData(
            trpc.reminders.getReminders.queryKey(),
            updatedReminders,
          );
        }
        setOptimisticIsCompleted(!optimisticIsCompleted);
        return { previousReminders };
      },

      onError: (_err, _input, context) => {
        if (context?.previousReminders) {
          queryClient.setQueryData(
            trpc.reminders.getReminders.queryKey(),
            context.previousReminders,
          );
        }
        setOptimisticIsCompleted(reminderData.isCompleted);
      },

      onSettled: () => {
        void queryClient.invalidateQueries({
          queryKey: trpc.collections.getCollectionsWithReminders.queryKey(),
        });
      },
    }),
  );

  const handleCheckReminder = async (checked: boolean) => {
    try {
      await updateReminderStatus.mutateAsync({
        reminderId: reminderData.id,
        isCompleted: checked,
      });
    } catch (error) {
      console.error("⚠️ createCollection - Error creating collection:", error);
      toast.error({
        text: "Failed to create collection.",
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="flex w-full items-center gap-3.5 py-2">
      <Checkbox
        reminderId={reminderData.id}
        checked={optimisticIsCompleted ?? false}
        onCheckedChange={handleCheckReminder}
      />
      <div className="group grid gap-1.5">
        <div className="flex w-full items-center space-x-3">
          <label
            htmlFor={reminderData.id}
            className="text-sm font-medium text-pretty text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
          >
            {reminderData.title}
          </label>
          {/* <div className="flex shrink-0 items-center space-x-2.5 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
            <EditReminder reminderData={reminderData} />
            <DeleteReminder
              reminderId={reminderData.id}
              title={reminderData.title}
            />
          </div> */}
        </div>
        {reminderData.dueDate && (
          <div className="flex items-center space-x-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            <CalendarIcon size={14} />
            <span>{format(new Date(reminderData.dueDate), "dd MMM yyyy")}</span>
          </div>
        )}
        {reminderData.description && (
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {reminderData.description}
          </span>
        )}
      </div>
    </div>
  );
};

export default ReminderItem;
