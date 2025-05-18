"use server";

import type { InsertOrganization } from "@/server/db/types";

import { db } from "@/server/db";
import { organization } from "@/server/db/schema";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

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

// Update Organization
export const updateOrganization = async (
  orgId: string,
  orgData: InsertOrganization,
): Promise<InsertOrganization[] | null> => {
  const user = await currentUser();

  if (!user) return null;

  const updatedOrganization = await db
    .update(organization)
    .set({
      ...orgData,
      createdBy: user.id,
    })
    .where(eq(organization.id, orgId))
    .returning();

  revalidatePath("/");

  return updatedOrganization;
};

// Delete Organization
export const deleteOrganization = async (
  orgId: string,
): Promise<boolean | null> => {
  const user = await currentUser();

  if (!user) return null;

  await db
    .delete(organization)
    .where(and(eq(organization.id, orgId), eq(organization.createdBy, user.id)))
    .returning();

  revalidatePath("/");

  return true;
};
