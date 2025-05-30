import type { TRPCRouterRecord } from "@trpc/server";

import { z } from "zod";
import { db } from "@/database";
import { and, desc, eq } from "drizzle-orm";

import { collection, reminder } from "@/database/schema";
import { createTRPCProtectedProcedure } from "@/database/trpc/init";
import { collectionZodSchema } from "@/database/formSchemas/collections";

export const collectionsRouter = {
  // Get collections with reminders for a user:
  getCollectionsWithReminders: createTRPCProtectedProcedure
    .input(z.object({ workspaceId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const conditions = [eq(collection.createdBy, ctx.userId)];

      if (input.workspaceId) {
        conditions.push(eq(collection.organizationId, input.workspaceId));
      }

      const collections = await db
        .select()
        .from(collection)
        .where(and(...conditions))
        .orderBy(desc(collection.createdAt));

      const collectionsWithReminders = await Promise.all(
        collections.map(async (col) => {
          const reminders = await db
            .select()
            .from(reminder)
            .where(
              and(
                eq(reminder.collectionId, col.id),
                eq(reminder.createdBy, ctx.userId),
              ),
            )
            .orderBy(desc(reminder.createdAt));
          return {
            collection: col,
            reminders,
          };
        }),
      );

      return collectionsWithReminders;
    }),

  // Create Collection
  createCollection: createTRPCProtectedProcedure
    .input(
      collectionZodSchema.extend({
        workspaceId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newCollection = await db
        .insert(collection)
        .values({
          name: input.name,
          colors: input.colors ?? null,
          organizationId: input.workspaceId ?? null,
          createdBy: ctx.userId,
        })
        .returning();

      return newCollection[0];
    }),

  // Edit Collection
  editCollection: createTRPCProtectedProcedure
    .input(
      collectionZodSchema.extend({
        collId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedCollection = await db
        .update(collection)
        .set({
          name: input.name,
          colors: input.colors ?? null,
        })
        .where(
          and(
            eq(collection.id, input.collId),
            eq(collection.createdBy, ctx.userId),
          ),
        )
        .returning();
      return updatedCollection[0];
    }),

  // Delete Collection
  deleteCollection: createTRPCProtectedProcedure
    .input(z.object({ collId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deletedCollection = await db
        .delete(collection)
        .where(
          and(
            eq(collection.id, input.collId),
            eq(collection.createdBy, ctx.userId),
          ),
        )
        .returning();
      return deletedCollection[0];
    }),
} satisfies TRPCRouterRecord;
