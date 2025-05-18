import type { GetReminders, InsertReminder } from "@/server/db/types";

import { db } from "@/server/db";
import { asc, eq } from "drizzle-orm";

import { reminder } from "@/server/db/schema";
import { currentUser } from "@clerk/nextjs/server";

// Get Reminders (by user)
export const getReminders = async (): Promise<GetReminders[] | null> => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const reminders = await db
    .select()
    .from(reminder)
    .where(eq(reminder.createdBy, user.id))
    .orderBy(asc(reminder.dueDate));

  return reminders;
};

// Insert Reminder
export const insertReminder = async (data: InsertReminder) => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const newReminder = await db
    .insert(reminder)
    .values({
      ...data,
      createdBy: user.id,
    })
    .returning();
  return newReminder;
};

// Update Reminder
export const updateReminder = async (
  reminderId: InsertReminder["id"],
  data: Partial<InsertReminder>,
) => {
  const user = await currentUser();
  if (!user || !reminderId) {
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
  const user = await currentUser();
  if (!user || !reminderId) {
    return null;
  }
  const deletedReminder = await db
    .delete(reminder)
    .where(eq(reminder.id, reminderId))
    .returning();
  return deletedReminder;
};
