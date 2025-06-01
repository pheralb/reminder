import type { TRPCRouterRecord } from "@trpc/server";

import { z } from "zod";
import { db } from "@/database";
import { and, desc, eq } from "drizzle-orm";

import { reminder } from "@/database/schema";
import { reminderZodSchema } from "@/database/formSchemas/reminders";
import { createTRPCProtectedProcedure } from "@/database/trpc/init";

export const remindersRouter = {
  // Get Reminders
  getReminders: createTRPCProtectedProcedure
    .input(z.object({ collectionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const reminders = await db
        .select()
        .from(reminder)
        .where(
          and(
            eq(reminder.collectionId, input.collectionId),
            eq(reminder.createdBy, ctx.userId),
          ),
        )
        .orderBy(desc(reminder.createdAt));
      return reminders;
    }),

  // Insert a new reminder
  insertReminder: createTRPCProtectedProcedure
    .input(reminderZodSchema)
    .mutation(async ({ ctx, input }) => {
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

  updateReminderStatus: createTRPCProtectedProcedure
    .input(z.object({ reminderId: z.string(), isCompleted: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const updatedReminder = await db
        .update(reminder)
        .set({
          isCompleted: input.isCompleted,
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
