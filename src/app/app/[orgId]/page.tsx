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
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    orgId: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | null> {
  const { orgId } = await params;
  const orgData = await getOrganizationInfo(orgId);

  if (!orgData?.organization) {
    return null;
  }

  return {
    title: orgData.organization.name,
  };
}

export default async function Page({ params }: PageProps) {
  const { orgId } = await params;
  const orgData = await getOrganizationInfo(orgId);

  if (!orgData?.organization) {
    return redirect("/app");
  }

  return (
    <div className="flex flex-col pb-5">
      <AppOptions title={orgData.organization.name}>
        {orgData.organization.id && (
          <CreateCollection organizationId={orgData.organization.id}>
            <Button variant="default">
              <PlusIcon size={16} />
              <span>Create Collection</span>
            </Button>
          </CreateCollection>
        )}
      </AppOptions>
      <main className={cn(container, "mt-6")}>
        <CollectionGroup>
          {orgData.collections.length === 0 ? (
            <BlankCollection>
              <CreateCollection organizationId={orgData.organization.id}>
                <Button variant="outline">Create</Button>
              </CreateCollection>
            </BlankCollection>
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
      </main>
    </div>
  );
}
