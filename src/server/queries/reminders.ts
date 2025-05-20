"use server";

import type { InsertReminder } from "@/server/db/types";

import { db } from "@/server/db";
import { eq } from "drizzle-orm";

import { reminder } from "@/server/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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

  revalidatePath("/");
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

  revalidatePath("/");
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

  revalidatePath("/");
  return deletedReminder;
};
