import type { InsertOrganization } from "@/database/types";
import { useState, type ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";

import { toast } from "@pheralb/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon } from "lucide-react";

import { useTRPC } from "@/database/trpc/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceZodSchema } from "@/database/formSchemas/workspace";
import ManageWorkspaceForm from "@/components/workspaces/manage.form";

interface EditWorkspaceProps {
  children: ReactNode;
  workspaceData: InsertOrganization;
}

const EditWorkspace = ({ children, workspaceData }: EditWorkspaceProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const updateWorkspace = useMutation(
    trpc.workspaces.updateWorkspace.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.workspaces.getWorkspaces.queryKey(),
        });
      },
    }),
  );

  const form = useForm<InsertOrganization>({
    resolver: zodResolver(workspaceZodSchema),
    defaultValues: {
      name: workspaceData.name,
    },
  });

  const handleEditWorkspace = async (data: InsertOrganization) => {
    try {
      setIsLoading(true);
      await updateWorkspace.mutateAsync({
        ...data,
        workspaceId: workspaceData.id!,
      });
      form.reset();
      setIsOpen(false);
      setIsLoading(false);
      toast.success({
        text: "Workspace updated successfully",
      });
    } catch (error) {
      console.error("⚠️ EditWorkspace - Error updating workspace:", error);
      toast.error({
        text: "Failed to create workspace.",
        description: "Please try again later.",
      });
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Workspace</DialogTitle>
          <DialogDescription>
            Update the details of your workspace.
          </DialogDescription>
        </DialogHeader>
        <ManageWorkspaceForm
          form={form}
          isLoading={isLoading}
          loadingText="Editing..."
          statusText="Edit"
          icon={<SaveIcon size={16} />}
          onSendForm={handleEditWorkspace}
          onCancelForm={() => handleOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditWorkspace;
