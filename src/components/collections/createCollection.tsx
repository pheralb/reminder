"use client";

import type { InsertCollection } from "@/server/db/types";
import { useState, type ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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

import { useForm } from "react-hook-form";
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
  const form = useForm<InsertCollection>({
    resolver: zodResolver(collectionZodSchema),
    defaultValues: {
      organizationId: organizationId,
    },
  });

  const handleCreateCollection = async (data: InsertCollection) => {
    try {
      await createCollection({
        ...data,
        organizationId: organizationId,
      });
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
