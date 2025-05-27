import type { TRPCRouterRecord } from "@trpc/server";

import { db } from "@/database";
import { organization } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import { createTRPCProtectedProcedure } from "@/database/trpc/init";

export const workspacesRouter = {
  // Get all workspaces for a user:
  getWorkspaces: createTRPCProtectedProcedure.query(async ({ ctx }) => {
    const organizations = await db
      .select()
      .from(organization)
      .where(eq(organization.createdBy, ctx.userId))
      .orderBy(desc(organization.createdAt));
    return organizations;
  }),

  
} satisfies TRPCRouterRecord;
