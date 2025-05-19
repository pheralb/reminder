import type { GetOrganizations } from "@/server/db/types";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { cn } from "@/utils/cn";
import { PencilIcon, PencilLineIcon, TrashIcon } from "lucide-react";

import { SidebarLinkStyle } from "@/components/layout/sidebarLink";
import EditOrganization from "@/components/organizations/editOrganization";
import DeleteOrganization from "@/components/organizations/deleteOrganization";

interface OrganizationOptionsProps {
  organization: GetOrganizations;
  className?: string;
}

const OrganizationOptions = (props: OrganizationOptionsProps) => {
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
        <EditOrganization
          title={props.organization.name}
          organizationId={props.organization.id}
        >
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <PencilLineIcon size={14} />
            <span>Rename</span>
          </DropdownMenuItem>
        </EditOrganization>
        <DeleteOrganization
          title={props.organization.name}
          organizationId={props.organization.id}
        >
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <TrashIcon size={14} />
            <span>Delete</span>
          </DropdownMenuItem>
        </DeleteOrganization>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrganizationOptions;
