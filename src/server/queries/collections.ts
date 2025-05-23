"use server";

import type { InsertCollection } from "@/server/db/types";

import { db } from "@/server/db";
import { collection, reminder } from "@/server/db/schema";

import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { eq, and, desc } from "drizzle-orm";

// Get Collections with reminders (by collectionId and userId)
export const getCollectionsWithReminders = async (orgId?: string) => {
  const user = await currentUser();

  if (!user) return null;

  const conditions = [eq(collection.createdBy, user.id)];

  if (orgId) {
    conditions.push(eq(collection.organizationId, orgId));
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
            eq(reminder.createdBy, user.id),
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
};

// Create Collection
export const createCollection = async (
  collData: InsertCollection,
): Promise<InsertCollection[] | null> => {
  const user = await currentUser();

  if (!user) return null;

  const newCollection = await db
    .insert(collection)
    .values({
      ...collData,
      createdBy: user.id,
    })
    .returning();

  revalidatePath("/");

  return newCollection;
};

// Edit Collection
export const editCollection = async (
  collId: string,
  collData: InsertCollection,
): Promise<InsertCollection[] | null> => {
  const user = await currentUser();

  if (!user) return null;

  const updatedCollection = await db
    .update(collection)
    .set({
      ...collData,
      createdBy: user.id,
    })
    .where(eq(collection.id, collId))
    .returning();

  revalidatePath("/");

  return updatedCollection;
};

// Delete Collection
export const deleteCollection = async (
  collId: string,
): Promise<boolean | null> => {
  const user = await currentUser();

  if (!user) return null;

  const deletedCollection = await db
    .delete(collection)
    .where(eq(collection.id, collId))
    .returning();

  revalidatePath("/");

  return deletedCollection.length > 0;
};
