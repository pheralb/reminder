"use server";

// 💡 This file contains the queries that I can use in client components.
// Don't use Clerk/ssr in this file.

import type { GetOrganizations } from "@/server/db/types";

import { db } from "@/server/db";
import { and, desc, eq } from "drizzle-orm";
import { organization, reminder } from "@/server/db/schema";

export const getOrganizations = async ({
  userId,
}: {
  userId: string;
}): Promise<GetOrganizations[] | null> => {
  const organizations = await db
    .select()
    .from(organization)
    .where(eq(organization.createdBy, userId))
    .orderBy(desc(organization.createdAt));

  return organizations;
};

export const updateReminderStatus = async ({
  id,
  isCompleted,
  createdBy,
}: {
  id: string;
  isCompleted: boolean;
  createdBy: string;
}) => {
  const reminderData = await db
    .update(reminder)
    .set({ isCompleted })
    // and createdBy the user
    .where(and(eq(reminder.id, id), eq(reminder.createdBy, createdBy)))
    .returning();
  return reminderData;
};
