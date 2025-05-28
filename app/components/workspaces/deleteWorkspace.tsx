import { useTRPC } from "@/database/trpc/utils";
import { useState, type ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

import { toast } from "@pheralb/toast";
import { redirect } from "react-router";
import { LoaderIcon, TrashIcon } from "lucide-react";

interface DeleteWorkspaceProps {
  workspaceName: string;
  workspaceId: string;
  children: ReactNode;
}

const DeleteWorkspace = (props: DeleteWorkspaceProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const deleteWorkspace = useMutation(
    trpc.workspaces.deleteWorkspace.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.workspaces.getWorkspaces.queryKey(),
        });
      },
    }),
  );

  const handleDeleteWorkspace = async () => {
    setIsLoading(true);
    try {
      await deleteWorkspace.mutateAsync({
        workspaceId: props.workspaceId,
      });
      setIsOpen(false);
      setIsLoading(false);
      toast.success({
        text: "Deleted workspace successfully",
      });
      redirect("/app");
    } catch (error) {
      console.error("⚠️ DeleteWorkspace - Error deleting workspace:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete workspace</DialogTitle>
          <DialogDescription>
            This <strong>{props.workspaceName}</strong> workspace and{" "}
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
            onClick={() => handleDeleteWorkspace()}
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

export default DeleteWorkspace;
