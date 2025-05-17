"use server";

import type { GetOrganizations } from "@/server/db/types";

import { db } from "@/server/db";
import { desc, eq } from "drizzle-orm";
import { organization } from "@/server/db/schema";
import { getCurrentUserId } from "../currentUser";

// Get Organizations (by user)
export const getOrganizations = async (): Promise<
  GetOrganizations[] | null
> => {
  const { userId } = await getCurrentUserId();

  if (!userId) {
    return null;
  }

  const reminders = await db
    .select()
    .from(organization)
    .where(eq(organization.createdBy, userId))
    .orderBy(desc(organization.createdAt));
  return reminders;
};
