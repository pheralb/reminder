import type { TRPCRouterRecord } from "@trpc/server";

import { z } from "zod";
import { db } from "@/database";
import { and, desc, eq } from "drizzle-orm";

import { organization } from "@/database/schema";
import { createTRPCProtectedProcedure } from "@/database/trpc/init";
import { workspaceZodSchema } from "@/database/formSchemas/workspace";

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

  // Insert a new workspace:
  insertWorkspace: createTRPCProtectedProcedure
    .input(workspaceZodSchema.extend({ slug: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const newWorkspace = await db
        .insert(organization)
        .values({
          name: input.name,
          slug: input.slug,
          createdBy: ctx.userId,
        })
        .returning();
      return newWorkspace[0];
    }),

  // Update an existing workspace:
  updateWorkspace: createTRPCProtectedProcedure
    .input(workspaceZodSchema.extend({ workspaceId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const updatedWorkspace = await db
        .update(organization)
        .set({ name: input.name })
        .where(
          and(
            eq(organization.id, input.workspaceId),
            eq(organization.createdBy, ctx.userId),
          ),
        )
        .returning();
      return updatedWorkspace[0];
    }),

  // Delete a workspace:
  deleteWorkspace: createTRPCProtectedProcedure
    .input(z.object({ workspaceId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deletedWorkspace = await db
        .delete(organization)
        .where(
          and(
            eq(organization.id, input.workspaceId),
            eq(organization.createdBy, ctx.userId),
          ),
        )
        .returning();
      return deletedWorkspace[0];
    }),
} satisfies TRPCRouterRecord;
