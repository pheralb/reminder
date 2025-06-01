import type { GetCollections, GetReminders } from "@/database/types";

import { useState } from "react";
import { Link } from "react-router";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/collapsible";
import { Flower } from "@/ui/shapes";
import { badgeVariants } from "@/ui/badge";

import { cn } from "@/utils/cn";
import { ChevronUpIcon } from "lucide-react";

import ReminderItem from "@/components/reminders/reminderItem";
import CreateReminder from "@/components/reminders/createReminder";
import CollectionOptions from "@/components/collections/collectionOptions";

interface ShowCollectionProps {
  collection: GetCollections;
  reminders: GetReminders[];
  workspace?: {
    id: string | null;
    name: string | null;
    slug: string | null;
  };
}

const ShowCollection = ({
  collection,
  workspace,
  reminders,
}: ShowCollectionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          "flex w-full items-center justify-center space-x-2",
          "border-b border-zinc-200 pb-1.5 dark:border-zinc-800",
        )}
      >
        <div className="flex items-center space-x-2">
          {collection.colors && (
            <div className={cn(collection.colors, "h-4 w-4 rounded-full")} />
          )}
          {workspace?.id && (
            <Link
              to={`/app/${workspace.slug}`}
              title={`Go to ${workspace.name} workspace`}
              className={cn(
                badgeVariants({
                  variant: "outline",
                }),
                "cursor-pointer text-xs",
              )}
            >
              <p className="max-w-30 truncate">{workspace.name}</p>
            </Link>
          )}
        </div>
        <CollapsibleTrigger
          title={`Collapse/Expand ${collection.name}`}
          className={cn(
            "flex w-full cursor-pointer items-center justify-between pr-2",
            "text-zinc-600 dark:text-zinc-400",
            isOpen && "text-zinc-900 dark:text-zinc-50",
            "hover:text-zinc-700 dark:hover:text-zinc-300",
            "transition-colors duration-100 ease-in-out",
          )}
        >
          <span>{collection.name}</span>
          <ChevronUpIcon
            size={14}
            className={cn("transition-transform", isOpen && "rotate-180")}
          />
        </CollapsibleTrigger>
        <CreateReminder
          collectionId={collection.id || ""}
          collectionName={collection.name || ""}
          collectionColor={collection.colors}
        />
        <CollectionOptions collection={collection} />
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
          <div className="mt-4 flex flex-col space-y-2">
            {reminders.map((reminder) => (
              <ReminderItem reminderData={reminder} key={reminder.id} />
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ShowCollection;
