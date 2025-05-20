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
import { redirect } from "next/navigation";
import { LoaderIcon, TrashIcon } from "lucide-react";
import { toast } from "@pheralb/toast";

interface DeleteOrganizationProps {
  title: string;
  organizationId: string;
  children: ReactNode;
}

const DeleteOrganization = (props: DeleteOrganizationProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleDeleteOrganization = async () => {
    setIsLoading(true);
    try {
      await deleteOrganization(props.organizationId);
      await queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
      setIsOpen(false);
      setIsLoading(false);
      toast.success({
        text: "Deleted organization successfully",
      });
      redirect("/app");
    } catch (error) {
      console.error(
        "⚠️ deleteOrganization - Error deleting organization:",
        error,
      );
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
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDeleteOrganization()}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderIcon className="animate-spin" size={16} />
            ) : (
              <TrashIcon size={16} />
            )}
            <span>{isLoading ? "Deleting..." : "Delete"}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteOrganization;
