import type { UseFormReturn } from "react-hook-form";
import type { InsertReminder } from "@/database/types";
import { useState, type ReactNode } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/collapsible";
import { cn } from "@/utils/cn";
import { Button } from "@/ui/button";
import { Textarea } from "@/ui/input";
import { Calendar } from "@/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { CalendarIcon, ChevronDown, LoaderIcon } from "lucide-react";

interface ManageRemindersFormProps {
  form: UseFormReturn<InsertReminder>;
  isLoading: boolean;
  statusText?: string;
  loadingText?: string;
  icon?: ReactNode;
  onSendForm: (data: InsertReminder) => Promise<void>;
  onCancelForm: (open: boolean) => void;
}

const ManageRemindersForm = ({
  form,
  isLoading,
  loadingText,
  statusText,
  icon,
  onSendForm,
  onCancelForm,
}: ManageRemindersFormProps) => {
  const [openDueDate, setOpenDueDate] = useState<boolean>(false);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSendForm)} className="mt-2 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="What's your plan?"
                  className="h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Collapsible open={openDueDate} onOpenChange={setOpenDueDate}>
          <CollapsibleTrigger className="flex w-full items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <CalendarIcon size={14} />
              <span>Due Date</span>
            </div>
            <ChevronDown
              size={14}
              className={cn(
                openDueDate ? "rotate-180" : "rotate-0",
                "transition-transform duration-200 ease-in-out",
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col items-center justify-center">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <Calendar
                    initialFocus
                    className="mt-2 w-full p-0"
                    mode="single"
                    selected={field.value ?? undefined}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </CollapsibleContent>
        </Collapsible>
        <div className="flex items-center justify-end space-x-2">
          <Button
            type="button"
            onClick={() => onCancelForm(false)}
            variant="outline"
          >
            <span>Cancel</span>
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoaderIcon className="animate-spin" size={16} />
            ) : (
              icon
            )}
            <span>{isLoading ? loadingText : statusText}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ManageRemindersForm;
