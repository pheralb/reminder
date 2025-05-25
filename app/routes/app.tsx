import type { Route } from "./+types/app";

import { Outlet, redirect } from "react-router";
import { getAuth } from "@clerk/react-router/ssr.server";

export async function loader(args: Route.LoaderArgs) {
  const { userId } = await getAuth(args);

  if (!userId) {
    return redirect("/auth?redirect_url=" + args.request.url);
  }

  return {
    userId,
  };
}

const AppLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
