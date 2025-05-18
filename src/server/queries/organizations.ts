"use server";

import type { InsertOrganization } from "@/server/db/types";

import { db } from "@/server/db";
import { organization } from "@/server/db/schema";
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
