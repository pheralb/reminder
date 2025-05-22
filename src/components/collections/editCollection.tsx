import type { InsertCollection } from "@/server/db/types";

import { useState, type ReactNode } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

import { collectionZodSchema } from "@/server/schemas/collection";
import { editCollection } from "@/server/queries/collections";
import { ColorSelector } from "@/ui/colorSelector";
import { colorOptions } from "./colors";
import { toast } from "@pheralb/toast";
import { LoaderIcon, PencilLineIcon } from "lucide-react";

interface EditCollectionProps {
  title: string;
  colors: string | null;
  collectionId: string;
  children: ReactNode;
}

const EditCollection = (props: EditCollectionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
      await editCollection(props.collectionId, data);
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
          <DialogTitle>Edit Organization</DialogTitle>
          <DialogDescription>{props.title}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateCollection)}
            className="mt-2 space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder={field.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <ColorSelector
                      options={colorOptions}
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                onClick={() => handleOnClose(false)}
                variant="outline"
              >
                <span>Cancel</span>
              </Button>
              <Button
                type="submit"
                disabled={loading || !form.formState.isDirty}
              >
                {loading ? (
                  <LoaderIcon size={16} className="animate-spin" />
                ) : (
                  <PencilLineIcon size={16} />
                )}
                <span>{loading ? "Editing..." : "Edit"}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCollection;
