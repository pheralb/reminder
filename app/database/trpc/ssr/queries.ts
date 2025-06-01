import { db } from "@/database";
import { collection, organization, reminder } from "@/database/schema";
import { and, eq } from "drizzle-orm";

// Get workspace with collections and reminders for a user

interface GetWorkspaceParams {
  userId: string;
  workspaceId?: string;
}

export const getWorkspaceData = async (params: GetWorkspaceParams) => {
  if (!params.workspaceId) return null;

  const workspaceData = await db
    .select()
    .from(organization)
    .where(
      and(
        eq(organization.slug, params.workspaceId),
        eq(organization.createdBy, params.userId),
      ),
    )
    .limit(1);

  if (!workspaceData.length) return null;

  const org = workspaceData[0];

  const collections = await db
    .select()
    .from(collection)
    .where(
      and(
        eq(collection.organizationId, org.id),
        eq(collection.createdBy, params.userId),
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
            eq(reminder.createdBy, params.userId),
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
