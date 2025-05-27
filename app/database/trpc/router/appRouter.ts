import { createTRPCRouter } from "@/database/trpc/init";

// Routes:
import { workspacesRouter } from "@/database/trpc/router/workspaces";

export const appRouter = createTRPCRouter({
  workspaces: workspacesRouter,
});

export type AppRouter = typeof appRouter;
