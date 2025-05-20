"use server";

import type { InsertOrganization } from "@/server/db/types";

import { db } from "@/server/db";
import { collection, organization, reminder } from "@/server/db/schema";

import { nanoid } from "nanoid";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

// Get Organization Info (using id + userId) + Collections (userId + collectionId) + Reminders (userId)
export const getOrganizationInfo = async (orgSlug: string) => {
  const user = await currentUser();

  if (!user) return null;

  const organizationData = await db
    .select()
    .from(organization)
    .where(
      and(eq(organization.slug, orgSlug), eq(organization.createdBy, user.id)),
    )
    .limit(1);

  if (!organizationData.length) return null;

  const org = organizationData[0];

  const collections = await db
    .select()
    .from(collection)
    .where(
      and(
        eq(collection.organizationId, org!.id),
        eq(collection.createdBy, user.id),
      ),
    );

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
        );

      return {
        ...col,
        reminders,
      };
    }),
  );

  return {
    organization: org,
    collections: collectionsWithReminders,
  };
};

// Insert Organization
export const insertOrganization = async (
  orgData: InsertOrganization,
): Promise<InsertOrganization[] | null> => {
  const user = await currentUser();

  if (!user) return null;

  const genSlugId = nanoid(10);
  const userId = user.id.slice(user.id.length - 5);
  const orgId = `${userId}-${genSlugId}`;

  const newOrganization = await db
    .insert(organization)
    .values({
      ...orgData,
      slug: orgId,
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
