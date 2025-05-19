import { z } from "zod";

export const reminderZodSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional().nullable(),
  collectionId: z.string().optional().nullable(),
  dueDate: z
    .date()
    .refine((date) => date > new Date(), {
      message: "Due date must be in the future",
    })
    .optional()
    .nullable(),
});
