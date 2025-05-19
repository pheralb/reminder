import { getOrganizationInfo } from "@/server/queries/organizations";

import AppOptions from "@/components/layout/appOptions";
import ShowCollection from "@/components/collections/showCollection";
import BlankCollection from "@/components/collections/blankCollection";
import CollectionGroup from "@/components/collections/collectionGroup";
import CreateCollection from "@/components/collections/createCollection";

import { cn } from "@/utils/cn";
import { redirect } from "next/navigation";
import { PlusIcon } from "lucide-react";

import { Button } from "@/ui/button";
import { container } from "@/ui/container";

interface PageProps {
  params: Promise<{
    orgId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { orgId } = await params;
  const orgData = await getOrganizationInfo(orgId);

  if (!orgData?.organization) {
    return redirect("/");
  }

  return (
    <div className={cn(container, "flex flex-col space-y-4 pb-5")}>
      <AppOptions title={orgData.organization.name}>
        <CreateCollection organizationId={orgData.organization.id || ""}>
          <Button variant="default">
            <PlusIcon size={16} />
            <span>Create Collection</span>
          </Button>
        </CreateCollection>
      </AppOptions>
      <CollectionGroup>
        {orgData.collections.length === 0 ? (
          <BlankCollection />
        ) : (
          orgData.collections.map((coll) => (
            <ShowCollection
              key={coll.id}
              collection={coll}
              reminders={coll.reminders}
            />
          ))
        )}
      </CollectionGroup>
    </div>
  );
}
