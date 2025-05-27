import type { Route } from "./+types/trpc.$trpc";
import type { LoaderFunctionArgs } from "react-router";

import { getAuth } from "@clerk/react-router/ssr.server";
import { appRouter } from "@/database/trpc/router/appRouter";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export async function createContextWithClerk(args: LoaderFunctionArgs) {
  const auth = await getAuth(args);
  return {
    authData: auth,
    userId: auth.userId,
  };
}

const handleRequest = (args: Route.LoaderArgs | Route.ActionArgs) => {
  return fetchRequestHandler({
    endpoint: "/trpc",
    req: args.request,
    router: appRouter,
    createContext: () => createContextWithClerk(args),
  });
};

export const loader = (args: Route.LoaderArgs) => {
  return handleRequest(args);
};

export const action = (args: Route.ActionArgs) => {
  return handleRequest(args);
};
