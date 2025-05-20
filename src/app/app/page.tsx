import type { Metadata } from "next";

import { Await } from "@/utils/await";
import { getCollectionsWithReminders } from "@/server/queries/collections";

import { cn } from "@/utils/cn";
import { container } from "@/ui/container";
import { Button } from "@/ui/button";
import { PlusIcon } from "lucide-react";

import LoadingData from "@/components/loadingData";
import AppOptions from "@/components/layout/appOptions";
import ShowCollection from "@/components/collections/showCollection";
import BlankCollection from "@/components/collections/blankCollection";
import CollectionGroup from "@/components/collections/collectionGroup";
import CreateCollection from "@/components/collections/createCollection";

export const metadata: Metadata = {
  title: "Home",
};

export default function AppHomepage() {
  return (
    <div className={cn(container, "flex flex-col space-y-4 pb-5")}>
      <AppOptions>
        <CreateCollection>
          <Button variant="default">
            <PlusIcon size={16} />
            <span>Create Collection</span>
          </Button>
        </CreateCollection>
      </AppOptions>
      <CollectionGroup>
        <Await
          promise={getCollectionsWithReminders()}
          fallback={<LoadingData text="Preparing..." />}
          errorComponent={<div>Error</div>}
        >
          {(data) => {
            if (data) {
              if (data.length === 0) {
                return <BlankCollection />;
              }
              return (
                <>
                  {data.map((item, idx) => (
                    <ShowCollection
                      key={item.collection.id ?? idx}
                      collection={item.collection}
                      reminders={item.reminders}
                    />
                  ))}
                </>
              );
            }
          }}
        </Await>
      </CollectionGroup>
    </div>
  );
}
