import { Await } from "@/utils/await";
import { getCollectionsWithReminders } from "@/server/queries/collections";

import { cn } from "@/utils/cn";
import { container } from "@/ui/container";
import { Button } from "@/ui/button";
import { PlusIcon } from "lucide-react";

import AppOptions from "@/components/layout/appOptions";
import ShowCollection from "@/components/collections/showCollection";
import BlankCollection from "@/components/collections/blankCollection";
import CollectionGroup from "@/components/collections/collectionGroup";
import CreateCollection from "@/components/collections/createCollection";

export default function HomePage() {
  return (
    <div className={cn(container, "flex flex-col space-y-4")}>
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
          fallback={<div>Loading...</div>}
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
