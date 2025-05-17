import type { GetReminders, InsertReminder } from "@/server/db/types";

import { db } from "@/server/db";
import { desc, eq } from "drizzle-orm";

import { reminder } from "@/server/db/schema";
import { getCurrentUserId } from "@/server/currentUser";

// Get Reminders (by user)
export const getReminders = async (): Promise<GetReminders[] | null> => {
  const { userId } = await getCurrentUserId();
  if (!userId) {
    return null;
  }
  const reminders = await db
    .select()
    .from(reminder)
    .where(eq(reminder.createdBy, userId))
    .orderBy(desc(reminder.createdAt));

  return reminders;
};

// Insert Reminder
export const insertReminder = async (data: InsertReminder) => {
  const { userId } = await getCurrentUserId();
  if (!userId) {
    return null;
  }
  const newReminder = await db
    .insert(reminder)
    .values({
      ...data,
      createdBy: userId,
    })
    .returning();
  return newReminder;
};

// Update Reminder
export const updateReminder = async (
  reminderId: InsertReminder["id"],
  data: Partial<InsertReminder>,
) => {
  const { userId } = await getCurrentUserId();
  if (!userId) {
    return null;
  }
  const updatedReminder = await db
    .update(reminder)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(reminder.id, reminderId))
    .returning();
  return updatedReminder;
};

// Delete Reminder
export const deleteReminder = async (reminderId: InsertReminder["id"]) => {
  const { userId } = await getCurrentUserId();
  if (!userId) {
    return null;
  }
  const deletedReminder = await db
    .delete(reminder)
    .where(eq(reminder.id, reminderId))
    .returning();
  return deletedReminder;
};
