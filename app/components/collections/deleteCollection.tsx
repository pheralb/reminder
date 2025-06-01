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
import { useTRPC } from "@/database/trpc/utils";

interface DeleteCollectionProps {
  title: string;
  collectionId: string;
  children: ReactNode;
}

const DeleteCollection = (props: DeleteCollectionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const deleteCollection = useMutation(
    trpc.collections.deleteCollection.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.workspaces.getWorkspaces.queryKey(),
        });
      },
    }),
  );

  const handleDeleteCollection = async () => {
    try {
      await deleteCollection.mutateAsync({
        collId: props.collectionId,
      });
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
          <DialogTitle>Delete Collection</DialogTitle>
          <DialogDescription>
            This <strong>{props.title} collection</strong> and{" "}
            <strong>its reminders</strong> will be deleted from your account.
            Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Cancel</Button>
          <Button
            onClick={() => handleDeleteCollection()}
            variant="destructive"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCollection;
