import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { InsertCollection } from "@/database/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { LoaderIcon } from "lucide-react";
import { Input } from "@/ui/input";
import { DialogFooter } from "@/ui/dialog";
import { Button } from "@/ui/button";
import { ColorSelector } from "@/ui/colorSelector";

import { colorOptions } from "@/components/collections/colors";

interface ManageCollectionsFormProps {
  form: UseFormReturn<InsertCollection>;
  isLoading: boolean;
  statusText?: string;
  loadingText?: string;
  icon?: ReactNode;
  onSendForm: (data: InsertCollection) => Promise<void>;
  onCancelForm: (open: boolean) => void;
}

const ManageCollectionsForm = ({
  form,
  isLoading,
  loadingText,
  statusText,
  icon,
  onSendForm,
  onCancelForm,
}: ManageCollectionsFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSendForm)} className="mt-2 space-y-8">
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
            onClick={() => onCancelForm(false)}
            variant="outline"
          >
            <span>Cancel</span>
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoaderIcon size={16} className="animate-spin" />
            ) : (
              icon
            )}
            <span>{isLoading ? loadingText : statusText}</span>
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ManageCollectionsForm;
