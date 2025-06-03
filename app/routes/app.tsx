import type { Route } from "./+types/app";
import type { OutletContext } from "@/types/outletContext";
import { useState } from "react";

import { envServer } from "@/env.server";
import { getAuth } from "@clerk/react-router/ssr.server";
import { Outlet, redirect, useLoaderData, useNavigation } from "react-router";
import { createClerkClient } from "@clerk/react-router/api.server";

import { cn } from "@/utils/cn";
import Header from "@/components/layout/header";
import SidebarClient from "@/components/layout/sidebar";
import SidebarContent from "@/components/layout/sidebarContent";
import LoadingData from "@/components/loadingData";

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
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
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
          isOpen ? "left-60" : "left-0",
          "absolute z-50 h-screen w-[3px]",
          "hover:bg-zinc-400/40 dark:hover:bg-zinc-600/40",
          "cursor-w-resize",
          "hover:transition-colors",
        )}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Header sidebarOpen={isOpen} setSidebarOpen={setIsOpen} />
      {isNavigating ? (
        <LoadingData text="Preparing..." />
      ) : (
        <Outlet
          context={
            {
              userId: loaderData.userId,
            } satisfies OutletContext
          }
        />
      )}
    </SidebarClient>
  );
};

export default AppLayout;
