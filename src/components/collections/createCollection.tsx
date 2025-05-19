"use client";

import type { InsertCollection } from "@/server/db/types";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Button, buttonVariants } from "@/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";

import { cn } from "@/utils/cn";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createCollection } from "@/server/queries/collections";
import { collectionZodSchema } from "@/server/schemas/collection";
import { Input } from "@/ui/input";
import { ColorSelector } from "@/ui/colorSelector";
import { colorOptions } from "./colors";

interface CreateCollectionProps {
  organizationId?: string;
}

const CreateCollection = ({ organizationId }: CreateCollectionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<InsertCollection>({
    resolver: zodResolver(collectionZodSchema),
    defaultValues: {
      organizationId: organizationId,
    },
  });

  const handleCreateCollection = async (data: InsertCollection) => {
    try {
      await createCollection(data);
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  const handleOnClose = (value: boolean) => {
    setIsOpen(value);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(value) => handleOnClose(value)}>
      <DialogTrigger
        className={cn(
          buttonVariants({
            variant: "default",
          }),
          "rounded-lg",
        )}
      >
        <PlusIcon size={20} strokeWidth={1.5} />
        <span>Create Collection</span>
      </DialogTrigger>
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
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Collection Name" {...field} />
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
            <div className="flex items-center justify-end space-x-2">
              <Button
                type="button"
                onClick={() => handleOnClose(false)}
                variant="outline"
              >
                <span>Cancel</span>
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollection;
