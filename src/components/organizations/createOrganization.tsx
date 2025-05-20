"use client";

import { useState, type ReactNode } from "react";
import type { InsertOrganization } from "@/server/db/types";

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
import { Input } from "@/ui/input";

import { LoaderIcon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { insertOrganization } from "@/server/queries/organizations";
import { organizationZodSchema } from "@/server/schemas/organization";
import { toast } from "@pheralb/toast";

interface CreateOrganizationProps {
  children: ReactNode;
}

const CreateOrganization = (props: CreateOrganizationProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const form = useForm<InsertOrganization>({
    resolver: zodResolver(organizationZodSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleCreateOrganization = async (data: InsertOrganization) => {
    try {
      setIsLoading(true);
      await insertOrganization(data);
      await queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
      form.reset();
      setIsOpen(false);
      setIsLoading(false);
      toast.success({
        text: "Organization created successfully",
      });
    } catch (error) {
      console.error("⚠️ createOrganization - Error creating organization:", error);
      toast.error({
        text: "Failed to create organization",
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
            className="my-2 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <LoaderIcon className="animate-spin" size={16} />
                ) : (
                  <PlusIcon size={16} />
                )}
                <span>{isLoading ? "Creating..." : "Create"}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrganization;
