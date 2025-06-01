import AppOptions from "@/components/layout/appOptions";

import { useTRPC } from "@/database/trpc/utils";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/utils/cn";
import { container } from "@/ui/container";
import { Button } from "@/ui/button";
import { PlusIcon } from "lucide-react";

import LoadingData from "@/components/loadingData";
import CreateCollection from "@/components/collections/createCollection";
import BlankCollection from "@/components/collections/blankCollection";
import CollectionGroup from "@/components/collections/collectionGroup";
import ShowCollection from "@/components/collections/showCollection";

const AppHomepage = () => {
  const trpc = useTRPC();
  const collectionsQuery = useQuery(
    trpc.collections.getCollectionsWithReminders.queryOptions(),
  );
  const collectionsData = collectionsQuery.data;

  return (
    <div className="flex flex-col pb-5">
      <AppOptions>
        <CreateCollection>
          <Button variant="default">
            <PlusIcon size={16} />
            <span>Create Collection</span>
          </Button>
        </CreateCollection>
      </AppOptions>
      <main className={cn(container, "mt-6")}>
        {!collectionsData ? (
          <LoadingData text="Loading collections..." />
        ) : collectionsData.length === 0 ? (
          <BlankCollection>
            <CreateCollection>
              <Button variant="outline">Create</Button>
            </CreateCollection>
          </BlankCollection>
        ) : (
          <CollectionGroup>
            {collectionsData.map((item, idx) => (
              <ShowCollection
                key={item.collection.id ?? idx}
                collection={item.collection}
                reminders={item.reminders}
                workspace={{
                  id: item.organizationId,
                  name: item.organizationName,
                  slug: item.organizationSlug,
                }}
              />
            ))}
          </CollectionGroup>
        )}
      </main>
    </div>
  );
};

export default AppHomepage;
