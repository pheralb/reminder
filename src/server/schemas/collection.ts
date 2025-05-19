import { z } from "zod";

export const collectionZodSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  colors: z.string().nullable().optional(),
});
