import type { User } from "@clerk/react-router/ssr.server";
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

import { nanoid } from "nanoid";
import { toast } from "@pheralb/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";

import { useTRPC } from "@/database/trpc/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceZodSchema } from "@/database/formSchemas/workspace";
import ManageWorkspaceForm from "./manage.form";

interface CreateWorkspaceProps {
  children: ReactNode;
  userId: User["id"];
}

const CreateWorkspace = ({ children, userId }: CreateWorkspaceProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const insertWorkspace = useMutation(
    trpc.workspaces.insertWorkspace.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.workspaces.getWorkspaces.queryKey(),
        });
      },
    }),
  );

  const form = useForm<InsertOrganization>({
    resolver: zodResolver(workspaceZodSchema),
  });

  const handleGenerateId = () => {
    const genSlugId = nanoid(10);
    const fromUserId = userId.slice(userId.length - 5);
    const orgId = `${fromUserId}-${genSlugId}`;
    return orgId;
  };

  const handleCreateWorkspace = async (data: InsertOrganization) => {
    try {
      setIsLoading(true);
      const genId = handleGenerateId();
      await insertWorkspace.mutateAsync({ ...data, slug: genId });
      form.reset();
      setIsOpen(false);
      setIsLoading(false);
      toast.success({
        text: "Workspace created successfully",
      });
    } catch (error) {
      console.error("⚠️ CreateWorkspace - Error creating workspace:", error);
      toast.error({
        text: "Failed to create workspace",
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
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your projects.
          </DialogDescription>
        </DialogHeader>
        <ManageWorkspaceForm
          form={form}
          isLoading={isLoading}
          loadingText="Creating..."
          statusText="Create"
          icon={<PlusIcon size={16} />}
          onSendForm={handleCreateWorkspace}
          onCancelForm={() => handleOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
