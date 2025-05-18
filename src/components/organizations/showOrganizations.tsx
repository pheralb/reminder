import { Skeleton } from "@/ui/skeleton";

import { useQuery } from "@tanstack/react-query";
import { SidebarLink } from "@/components/layout/sidebarLink";
import { getOrganizations } from "@/server/queries/client";

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
    <SidebarLink key={org.id} href={`/${org.id}`}>
      <span>{org.name}</span>
    </SidebarLink>
  ));
};

export default ShowOrganizations;
