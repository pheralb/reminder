"use client";

import { useState, type ReactNode } from "react";
import type { InsertOrganization } from "@/server/db/types";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { insertOrganization } from "@/server/queries/organizations";
import { organizationZodSchema } from "@/server/schemas/organization";
import { useQueryClient } from "@tanstack/react-query";

interface CreateOrganizationProps {
  children: ReactNode;
}

const CreateOrganization = (props: CreateOrganizationProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const form = useForm<InsertOrganization>({
    resolver: zodResolver(organizationZodSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleCreateOrganization = async (data: InsertOrganization) => {
    try {
      await insertOrganization(data);
      await queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating organization:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Organization</DialogTitle>
          <DialogDescription>
            Create a new organization to manage your collections and reminders.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateOrganization)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrganization;
