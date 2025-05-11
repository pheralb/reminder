import { cn } from "@/utils/cn";

import Link from "next/link";
import UserMenu from "@/components/auth/userMenu";

const SidebarContent = () => {
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full",
        "overflow-x-hidden overflow-y-auto",
        "bg-zinc-100 dark:bg-zinc-900",
        "w-56",
      )}
    >
      <nav className="flex h-full flex-col px-4 pt-6 pb-5">
        <div className="flex flex-1">
          <Link
            href="/"
            className="font-instrument-sans h-fit text-2xl font-medium"
          >
            <span>Reminder</span>
          </Link>
        </div>
        <UserMenu />
      </nav>
    </aside>
  );
};

export default SidebarContent;
