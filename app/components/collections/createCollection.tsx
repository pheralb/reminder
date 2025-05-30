import type { InsertCollection } from "@/database/types";
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
import { PlusIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { collectionZodSchema } from "@/database/formSchemas/collections";
import ManageCollectionsForm from "@/components/collections/manage.form";

import { useTRPC } from "@/database/trpc/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateCollectionProps {
  children: ReactNode;
  workspaceId?: string;
}

const CreateCollection = ({ children, workspaceId }: CreateCollectionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const insertCollection = useMutation(
    trpc.collections.createCollection.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.collections.getCollectionsWithReminders.queryKey(),
        });
      },
    }),
  );

  const form = useForm<InsertCollection>({
    resolver: zodResolver(collectionZodSchema),
  });

  const handleCreateCollection = async (data: InsertCollection) => {
    setLoading(true);
    try {
      await insertCollection.mutateAsync({
        ...data,
        workspaceId,
      });
      form.reset();
      setIsOpen(false);
      setLoading(false);
      toast.success({
        text: "Collection created successfully",
      });
    } catch (error) {
      console.error("⚠️ createCollection - Error creating collection:", error);
      toast.error({
        text: "Failed to create collection.",
        description: "Please try again later.",
      });
      setLoading(false);
    }
  };

  const handleOnClose = (value: boolean) => {
    setIsOpen(value);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(value) => handleOnClose(value)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New collection</DialogTitle>
          <DialogDescription>
            Create a new collection to organize your reminders.
          </DialogDescription>
        </DialogHeader>
        <ManageCollectionsForm
          form={form}
          isLoading={loading}
          loadingText="Creating collection..."
          onSendForm={handleCreateCollection}
          onCancelForm={handleOnClose}
          icon={<PlusIcon size={16} />}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollection;
