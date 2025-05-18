import type { GetOrganizations } from "@/server/db/types";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { cn } from "@/utils/cn";
import { PencilIcon } from "lucide-react";

import { SidebarLinkStyle } from "../layout/sidebarLink";
import EditOrganization from "./editOrganization";
import DeleteOrganization from "./deleteOrganization";

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
            Rename organization
          </DropdownMenuItem>
        </EditOrganization>
        <DeleteOrganization
          title={props.organization.name}
          organizationId={props.organization.id}
        >
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Delete organization
          </DropdownMenuItem>
        </DeleteOrganization>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrganizationOptions;
