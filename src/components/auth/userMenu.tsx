import { cn } from "@/utils/cn";
import { buttonVariants } from "@/ui/button";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import { ChevronUpIcon, UserIcon } from "lucide-react";

const UserMenu = async () => {
  const user = await currentUser();
  return (
    <div
      className={cn(
        "border border-zinc-200 dark:border-zinc-800",
        "rounded-sm p-2.5 shadow-sm",
      )}
    >
      {user ? (
        <div className="flex w-full items-center space-x-5">
          <div className="relative flex">
            <UserButton />
            <div className="absolute top-2 -right-2.5 rounded-full bg-zinc-200 p-0.5 dark:bg-zinc-800">
              <ChevronUpIcon size={12} />
            </div>
          </div>
          <div className="flex flex-col">
            <p
              title={user.fullName!}
              className="max-w-28 truncate text-sm font-semibold"
            >
              {user.fullName}
            </p>
            <p
              title={user.emailAddresses[0]?.emailAddress}
              className="max-w-28 truncate text-xs text-zinc-500 dark:text-zinc-400"
            >
              {user.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
      ) : (
        <Link
          href="/auth"
          className={buttonVariants({
            variant: "outline",
            className: "w-full justify-start",
          })}
        >
          <UserIcon size={14} />
          <span>Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default UserMenu;
