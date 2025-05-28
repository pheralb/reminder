import type { GetOrganizations } from "@/database/types";
import type { User } from "@clerk/react-router/ssr.server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { PencilIcon, PencilLineIcon, TrashIcon } from "lucide-react";

import { SidebarLinkStyle } from "@/components/layout/sidebarLink";
import EditWorkspace from "@/components/workspaces/editWorkspace";
import DeleteWorkspace from "@/components/workspaces/deleteWorkspace";

interface WorkspaceOptionsProps {
  userId: User["id"];
  organization: GetOrganizations;
  className?: string;
}

const WorkspaceOptions = (props: WorkspaceOptionsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        title="Options"
        className={cn(
          SidebarLinkStyle,
          "w-fit px-2 py-2 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100",
          "focus:outline-none",
          isOpen && "opacity-100",
          props.className,
        )}
      >
        <PencilIcon size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <EditWorkspace workspaceData={props.organization}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <PencilLineIcon size={14} />
            <span>Rename</span>
          </DropdownMenuItem>
        </EditWorkspace>
        <DeleteWorkspace
          workspaceId={props.organization.id}
          workspaceName={props.organization.name}
        >
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <TrashIcon size={14} />
            <span>Delete</span>
          </DropdownMenuItem>
        </DeleteWorkspace>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceOptions;
