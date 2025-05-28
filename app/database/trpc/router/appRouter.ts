import { createTRPCRouter } from "@/database/trpc/init";

// Routes:
import { remindersRouter } from "@/database/trpc/router/reminders";
import { workspacesRouter } from "@/database/trpc/router/workspaces";
import { collectionsRouter } from "@/database/trpc/router/collections";

export const appRouter = createTRPCRouter({
  workspaces: workspacesRouter,
  collections: collectionsRouter,
  reminders: remindersRouter,
});

export type AppRouter = typeof appRouter;
