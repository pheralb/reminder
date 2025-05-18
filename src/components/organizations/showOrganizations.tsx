import { Skeleton } from "@/ui/skeleton";

import { useQuery } from "@tanstack/react-query";
import { SidebarLink } from "@/components/layout/sidebarLink";
import { getOrganizations } from "@/server/queries/client";
import OrganizationOptions from "@/components/organizations/organizationOptions";

interface ShowOrganizationsProps {
  userId: string;
}

const ShowOrganizations = ({ userId }: ShowOrganizationsProps) => {
  const { data: organizations } = useQuery({
    queryKey: ["organizations"],
    queryFn: () =>
      getOrganizations({
        userId,
      }),
  });

  if (!organizations) {
    return <Skeleton className="h-8 w-full" />;
  }

  if (organizations.length === 0) {
    return <div>No organizations found</div>;
  }

  return organizations.map((org) => (
    <div key={org.id} className="group flex items-center gap-0.5">
      <SidebarLink href={`/${org.id}`}>
        <span>{org.name}</span>
      </SidebarLink>
      <OrganizationOptions
        organization={org}
        className="group-hover:opacity-100"
      />
    </div>
  ));
};

export default ShowOrganizations;
