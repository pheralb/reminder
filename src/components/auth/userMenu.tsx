"use client";

import { cn } from "@/utils/cn";
import { buttonVariants } from "@/ui/button";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

import { UserIcon, ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { Skeleton } from "@/ui/skeleton";

const UserMenu = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
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
    <div className="relative flex">
      <UserButton />
      <div className="absolute top-2 -right-2.5 rounded-full bg-zinc-200 p-0.5 dark:bg-zinc-800">
        <ChevronDownIcon size={12} />
      </div>
    </div>
  );
};

export default UserMenu;
