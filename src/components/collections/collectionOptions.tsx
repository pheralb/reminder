"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { cn } from "@/utils/cn";
import { buttonVariants } from "@/ui/button";
import { EllipsisIcon, XIcon, PencilLineIcon, TrashIcon } from "lucide-react";
import EditCollection from "./editCollection";
import type { GetCollections } from "@/server/db/types";
import DeleteCollection from "./deleteCollection";

interface CollectionOptionsProps {
  collection: GetCollections;
}

const CollectionOptions = ({ collection }: CollectionOptionsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        title="Collection Options"
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "icon",
          }),
          "h-7",
        )}
      >
        {isOpen ? <XIcon size={16} /> : <EllipsisIcon size={16} />}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <EditCollection
          collectionId={collection.id}
          title={collection.name}
          colors={collection.colors}
        >
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <PencilLineIcon size={14} />
            <span>Edit</span>
          </DropdownMenuItem>
        </EditCollection>
        <DeleteCollection collectionId={collection.id} title={collection.name}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <TrashIcon size={14} />
            <span>Delete</span>
          </DropdownMenuItem>
        </DeleteCollection>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CollectionOptions;
