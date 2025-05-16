"use client";

import { cn } from "@/utils/cn";
import { buttonVariants } from "@/ui/button";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

import { UserIcon, ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { Skeleton } from "@/ui/skeleton";

const UserMenu = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center gap-0.5">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="flex flex-col space-y-0.5">
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <Link
        href="/auth"
        className={cn(
          buttonVariants({
            variant: "outline",
          }),
          "w-fit justify-between",
        )}
      >
        <div className="flex items-center space-x-2">
          <UserIcon size={14} />
          <span>Sign In</span>
        </div>
        <ChevronRightIcon size={14} className="text-zinc-500" />
      </Link>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center gap-0.5">
        <UserButton />
        <ChevronDownIcon
          size={14}
          className="rounded-full bg-zinc-300 p-0.5 dark:bg-zinc-700/50"
        />
      </div>
      <div className="flex flex-col space-y-0.5">
        <p className="max-w-32 truncate text-sm font-medium">{user.fullName}</p>
        <p className="max-w-32 truncate text-xs font-medium text-zinc-600 dark:text-zinc-400">
          {user.emailAddresses[0]?.emailAddress}
        </p>
      </div>
    </div>
  );
};

export default UserMenu;
