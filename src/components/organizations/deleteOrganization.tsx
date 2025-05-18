import { useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/ui/dialog";
import { Button } from "@/ui/button";

import { deleteOrganization } from "@/server/queries/organizations";

interface DeleteOrganizationProps {
  title: string;
  organizationId: string;
  children: ReactNode;
}

const DeleteOrganization = (props: DeleteOrganizationProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleDeleteOrganization = async () => {
    try {
      await deleteOrganization(props.organizationId);
      await queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating organization:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Organization</DialogTitle>
          <DialogDescription>
            This <strong>{props.title} organization</strong> and{" "}
            <strong>its collections</strong> will be deleted from your account.
            Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Cancel</Button>
          <Button
            onClick={() => handleDeleteOrganization()}
            variant="destructive"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteOrganization;
