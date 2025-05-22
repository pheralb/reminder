"use client";

import type { InsertCollection } from "@/server/db/types";
import { useState, type ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Button } from "@/ui/button";

import { toast } from "@pheralb/toast";
import { useForm } from "react-hook-form";
import { LoaderIcon, PlusIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { createCollection } from "@/server/queries/collections";
import { collectionZodSchema } from "@/server/schemas/collection";
import { Input } from "@/ui/input";
import { ColorSelector } from "@/ui/colorSelector";
import { colorOptions } from "./colors";

interface CreateCollectionProps {
  children: ReactNode;
  organizationId?: string;
}

const CreateCollection = ({
  children,
  organizationId,
}: CreateCollectionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<InsertCollection>({
    resolver: zodResolver(collectionZodSchema),
  });

  const handleCreateCollection = async (data: InsertCollection) => {
    setLoading(true);
    try {
      await createCollection({
        ...data,
        organizationId: organizationId,
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateCollection)}
            className="space-y-8 mt-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Collection Name"
                      {...field}
                      value={field.value ?? ""}
                    />
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
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <LoaderIcon size={16} className="animate-spin" />
                ) : (
                  <PlusIcon size={16} />
                )}
                <span>{loading ? "Creating..." : "Create"}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollection;
