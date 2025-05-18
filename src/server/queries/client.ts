"use server";

// This file contains the queries that I can use in client components.
// Don't use Clerk/ssr in this file.

import type { GetOrganizations } from "../db/types";

import { db } from "@/server/db";
import { desc, eq } from "drizzle-orm";
import { organization } from "@/server/db/schema";

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
