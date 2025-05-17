"use server";

import type { GetOrganizations } from "@/server/db/types";

import { db } from "@/server/db";
import { desc, eq } from "drizzle-orm";
import { organization } from "@/server/db/schema";
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
