"use server";

import type { GetOrganizations, InsertOrganization } from "@/server/db/types";

import { db } from "@/server/db";
import { desc, eq } from "drizzle-orm";
import { organization } from "@/server/db/schema";

import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

// Get Organizations (by user)
export const getOrganizations = async (): Promise<
  GetOrganizations[] | null
> => {
  const user = await currentUser();

  if (!user) return null;

  const organizations = await db
    .select()
    .from(organization)
    .where(eq(organization.createdBy, user.id))
    .orderBy(desc(organization.createdAt));

  return organizations;
};

// Insert Organization
export const insertOrganization = async (
  orgData: InsertOrganization,
): Promise<InsertOrganization[] | null> => {
  const user = await currentUser();

  if (!user) return null;

  const newOrganization = await db
    .insert(organization)
    .values({
      ...orgData,
      createdBy: user.id,
    })
    .returning();

  revalidatePath("/");

  return newOrganization;
};
