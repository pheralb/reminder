import { z } from "zod";

export const organizationZodSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(50, {
    message: "Organization name must be less than 50 characters",
  }),
});
