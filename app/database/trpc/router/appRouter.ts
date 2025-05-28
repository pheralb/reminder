import { createTRPCRouter } from "@/database/trpc/init";

// Routes:
import { workspacesRouter } from "@/database/trpc/router/workspaces";
import { collectionsRouter } from "@/database/trpc/router/collections";

export const appRouter = createTRPCRouter({
  workspaces: workspacesRouter,
  collections: collectionsRouter,
});

export type AppRouter = typeof appRouter;
