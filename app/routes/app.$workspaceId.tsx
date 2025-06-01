import type { Route } from "./+types/app";

import { redirect, useLoaderData } from "react-router";
import { getAuth } from "@clerk/react-router/ssr.server";
import { getWorkspaceData } from "@/database/trpc/ssr/queries";

import AppOptions from "@/components/layout/appOptions";

import { cn } from "@/utils/cn";
import { container } from "@/ui/container";
import { Button } from "@/ui/button";
import { PlusIcon } from "lucide-react";

import CreateCollection from "@/components/collections/createCollection";
import BlankCollection from "@/components/collections/blankCollection";
import CollectionGroup from "@/components/collections/collectionGroup";
import ShowCollection from "@/components/collections/showCollection";

export async function loader(args: Route.LoaderArgs) {
  const { userId } = await getAuth(args);

  if (!userId) {
    return redirect("/" + args.request.url);
  }

  const getData = await getWorkspaceData({
    userId,
    workspaceId: args.params.workspaceId,
  });

  if (!getData?.organization) {
    return redirect("/app");
  }

  return getData;
}

const AppShowWorkspacePage = () => {
  const workspaceData = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col pb-5">
      <AppOptions title={workspaceData.organization.name}>
        {workspaceData.organization.id && (
          <CreateCollection
            revalidateData={true}
            workspaceId={workspaceData.organization.id}
          >
            <Button variant="default">
              <PlusIcon size={16} />
              <span>Create Collection</span>
            </Button>
          </CreateCollection>
        )}
      </AppOptions>
      <main className={cn(container, "mt-6")}>
        <CollectionGroup>
          {workspaceData.collections.length === 0 ? (
            <BlankCollection>
              <CreateCollection
                revalidateData={true}
                workspaceId={workspaceData.organization.id}
              >
                <Button variant="outline">Create</Button>
              </CreateCollection>
            </BlankCollection>
          ) : (
            workspaceData.collections.map((coll) => (
              <ShowCollection
                key={coll.id}
                collection={coll}
                reminders={coll.reminders}
              />
            ))
          )}
        </CollectionGroup>
      </main>
    </div>
  );
};

export default AppShowWorkspacePage;
