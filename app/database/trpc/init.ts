import type { createContextWithClerk } from "@/routes/trpc.$trpc";

import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

type Context = Awaited<ReturnType<typeof createContextWithClerk>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      userId: ctx.userId,
    },
  });
});

export const createTRPCRouter = t.router;
export const createTRPCPublicProcedure = t.procedure;
export const createTRPCProtectedProcedure = t.procedure.use(isAuthed);
