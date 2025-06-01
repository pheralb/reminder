import type { InsertCollection } from "@/database/types";

import { useState, type ReactNode } from "react";

import { toast } from "@pheralb/toast";
import { useForm } from "react-hook-form";
import { useTRPC } from "@/database/trpc/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/ui/dialog";
import { SaveIcon } from "lucide-react";

import { collectionZodSchema } from "@/database/formSchemas/collections";
import ManageCollectionsForm from "@/components/collections/manage.form";

interface EditCollectionProps {
  title: string;
  colors: string | null;
  collectionId: string;
  children: ReactNode;
}

const EditCollection = (props: EditCollectionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const editCollection = useMutation(
    trpc.collections.editCollection.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.collections.getCollectionsWithReminders.queryKey(),
        });
      },
    }),
  );

  const form = useForm<InsertCollection>({
    resolver: zodResolver(collectionZodSchema),
    defaultValues: {
      name: props.title,
      colors: props.colors,
    },
  });

  const handleUpdateCollection = async (data: InsertCollection) => {
    setLoading(true);
    try {
      await editCollection.mutateAsync({
        ...data,
        collId: props.collectionId,
      });
      form.reset();
      setIsOpen(false);
      setLoading(false);
      toast.success({
        text: "Collection edited successfully",
      });
    } catch (error) {
      console.error("⚠️ editCollection - Error editing collection:", error);
      toast.error({
        text: "Failed to edit collection.",
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Collection</DialogTitle>
          <DialogDescription>{props.title}</DialogDescription>
        </DialogHeader>
        <ManageCollectionsForm
          form={form}
          isLoading={loading}
          loadingText="Editing..."
          statusText="Edit"
          icon={<SaveIcon size={16} />}
          onSendForm={handleUpdateCollection}
          onCancelForm={() => handleOnClose(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditCollection;
