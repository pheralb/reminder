import type { TRPCRouterRecord } from "@trpc/server";

import { z } from "zod";
import { db } from "@/database";
import { and, eq } from "drizzle-orm";

import { reminder } from "@/database/schema";
import { reminderZodSchema } from "@/database/formSchemas/reminders";
import { createTRPCProtectedProcedure } from "@/database/trpc/init";

export const remindersRouter = {
  // Insert a new reminder
  insertReminder: createTRPCProtectedProcedure
    .input(reminderZodSchema)
    .query(async ({ ctx, input }) => {
      const newReminder = await db
        .insert(reminder)
        .values({
          ...input,
          createdBy: ctx.userId,
        })
        .returning();
      return newReminder[0];
    }),

  // Update an existing reminder
  updateReminder: createTRPCProtectedProcedure
    .input(reminderZodSchema.extend({ reminderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const updatedReminder = await db
        .update(reminder)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(reminder.id, input.reminderId),
            eq(reminder.createdBy, ctx.userId),
          ),
        )
        .returning();
      return updatedReminder[0];
    }),

  // Delete Reminder
  deleteReminder: createTRPCProtectedProcedure
    .input(z.object({ reminderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deletedReminder = await db
        .delete(reminder)
        .where(
          and(
            eq(reminder.id, input.reminderId),
            eq(reminder.createdBy, ctx.userId),
          ),
        )
        .returning();
      return deletedReminder[0];
    }),
} satisfies TRPCRouterRecord;
