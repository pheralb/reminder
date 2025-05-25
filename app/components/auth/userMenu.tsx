import { UserButton } from "@clerk/react-router";
import { ChevronDownIcon } from "lucide-react";

interface UserMenuProps {
  fullName?: string;
  emailAddresses?: string;
}

const UserMenu = ({ fullName, emailAddresses }: UserMenuProps) => {
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
        <p className="max-w-32 truncate text-sm font-medium">{fullName}</p>
        <p className="max-w-32 truncate text-xs font-medium text-zinc-600 dark:text-zinc-400">
          {emailAddresses}
        </p>
      </div>
    </div>
  );
};

export default UserMenu;
