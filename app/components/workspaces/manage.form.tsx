import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { InsertOrganization } from "@/database/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { DialogFooter } from "@/ui/dialog";
import { Button } from "@/ui/button";
import { LoaderIcon } from "lucide-react";

interface ManageWorkspaceFormProps {
  form: UseFormReturn<InsertOrganization>;
  isLoading: boolean;
  statusText?: string;
  loadingText?: string;
  icon?: ReactNode;
  onSendForm: (data: InsertOrganization) => Promise<void>;
  onCancelForm: (open: boolean) => void;
}

const ManageWorkspaceForm = ({
  form,
  isLoading,
  loadingText,
  statusText,
  icon,
  onSendForm,
  onCancelForm,
}: ManageWorkspaceFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSendForm)} className="mt-2 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace Name:</FormLabel>
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
            onClick={() => onCancelForm(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoaderIcon className="animate-spin" size={16} />
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

export default ManageWorkspaceForm;
