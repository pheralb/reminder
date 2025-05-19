"use client";

import type { GetCollections, GetReminders } from "@/server/db/types";
import { buttonVariants } from "@/ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/collapsible";
import { Flower } from "@/ui/shapes";
import { cn } from "@/utils/cn";
import { ChevronUpIcon, EllipsisIcon } from "lucide-react";
import { useState } from "react";

interface ShowCollectionProps {
  collection: GetCollections;
  reminders: GetReminders[];
}

const ShowCollection = ({ collection, reminders }: ShowCollectionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          "flex items-center justify-between gap-2",
          "border-b border-zinc-200 pb-1.5 dark:border-zinc-800",
        )}
      >
        <CollapsibleTrigger
          className={cn(
            "flex w-full cursor-pointer items-center justify-between",
            "text-zinc-600 dark:text-zinc-400",
            isOpen && "text-zinc-900 dark:text-zinc-50",
            "hover:text-zinc-900 dark:hover:text-zinc-50",
            "transition-colors duration-100 ease-in-out",
          )}
        >
          <div className="flex items-center space-x-2">
            <div className={cn(collection.colors, "h-4 w-4 rounded-full")} />
            <span>{collection.name}</span>
          </div>
          <ChevronUpIcon
            size={14}
            className={cn("transition-transform", isOpen && "rotate-180")}
          />
        </CollapsibleTrigger>
        <button
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            }),
            "h-7",
          )}
        >
          <EllipsisIcon size={16} />
        </button>
      </div>
      <CollapsibleContent>
        {reminders.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-3 py-6">
            <Flower width={30} height={30} />
            <p className="font-onest text-lg text-zinc-600 dark:text-zinc-400">
              Add some reminders to this collection
            </p>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between border-b border-zinc-200 p-2 dark:border-zinc-800"
              >
                <span>{reminder.title}</span>
              </div>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ShowCollection;
