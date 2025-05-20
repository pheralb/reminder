import { z } from "zod";

export const collectionZodSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(50, {
    message: "Collection name must be less than 50 characters",
  }),
  colors: z.string().nullable().optional(),
});
