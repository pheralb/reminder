"use client";

import type { GetReminders } from "@/server/db/types";

import { useState } from "react";
import { motion } from "motion/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { updateReminderStatus } from "@/server/queries/client";
import { cn } from "@/utils/cn";

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
        "border border-zinc-300 dark:border-zinc-800",
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
  const queryClient = useQueryClient();
  const [optimisticIsCompleted, setOptimisticIsCompleted] = useState(
    reminderData.isCompleted,
  );

  const mutation = useMutation({
    mutationFn: async (isCompleted: boolean) => {
      const updateReminder = await updateReminderStatus({
        id: reminderData.id,
        createdBy: reminderData.createdBy!,
        isCompleted,
      });
      return updateReminder;
    },
    onMutate: async (newIsCompleted) => {
      await queryClient.cancelQueries({ queryKey: ["reminders"] });
      const previousReminders = queryClient.getQueryData<Reminder[]>([
        "reminders",
      ]);
      queryClient.setQueryData<Reminder[]>(["reminders"], (old) =>
        old?.map((r) =>
          r.id === reminderData.id ? { ...r, isCompleted: newIsCompleted } : r,
        ),
      );
      setOptimisticIsCompleted(newIsCompleted);
      return { previousReminders };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousReminders) {
        queryClient.setQueryData(["reminders"], context.previousReminders);
        setOptimisticIsCompleted(reminderData.isCompleted);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });

  return (
    <div className="flex w-full items-center gap-3 py-2">
      <Checkbox
        reminderId={reminderData.id}
        checked={optimisticIsCompleted ?? false}
        onCheckedChange={mutation.mutate}
      />
      <div className="grid gap-1.5">
        <label
          htmlFor={reminderData.id}
          className="text-sm leading-none font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
        >
          {reminderData.title}
        </label>
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
