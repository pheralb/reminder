import type { Route } from "./+types/app";
import { useState } from "react";

import { envServer } from "@/env.server";
import { getAuth } from "@clerk/react-router/ssr.server";
import { Outlet, redirect, useLoaderData } from "react-router";
import { createClerkClient } from "@clerk/react-router/api.server";

import { cn } from "@/utils/cn";
import Header from "@/components/layout/header";
import SidebarClient from "@/components/layout/sidebar";
import SidebarContent from "@/components/layout/sidebarContent";

export async function loader(args: Route.LoaderArgs) {
  const { userId } = await getAuth(args);

  if (!userId) {
    return redirect("/auth?redirect_url=" + args.request.url);
  }

  const userData = await createClerkClient({
    secretKey: envServer.CLERK_SECRET_KEY,
  }).users.getUser(userId);

  return {
    userId,
    userData,
  };
}

const AppLayout = () => {
  const loaderData = useLoaderData<typeof loader>();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <SidebarClient isOpen={isOpen}>
      <SidebarContent
        isOpen={isOpen}
        user={{
          userId: loaderData.userId,
          fullName: loaderData.userData.fullName,
          username: loaderData.userData.username,
          emailAddresses: loaderData.userData.emailAddresses,
        }}
      />
      <button
        title="Toggle Sidebar"
        className={cn(
          "absolute left-0 z-50 h-screen w-1",
          "hover:bg-zinc-400 dark:hover:bg-zinc-600",
          "transition-colors duration-200 ease-in-out",
          "cursor-w-resize",
        )}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Header sidebarOpen={isOpen} setSidebarOpen={setIsOpen} />
      <Outlet />
    </SidebarClient>
  );
};

export default AppLayout;
