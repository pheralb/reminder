import { Skeleton } from "@/ui/skeleton";

import { useQuery } from "@tanstack/react-query";
import { SidebarLink } from "@/components/layout/sidebarLink";
import { getOrganizations } from "@/server/queries/client";
import OrganizationOptions from "@/components/organizations/organizationOptions";
import { cn } from "@/utils/cn";
import { Ellipse } from "@/ui/shapes";

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
    return (
      <div className="my-2 flex flex-col items-center justify-center space-y-2">
        <Ellipse width={32} height={32} />
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Your organizations will be here
        </p>
      </div>
    );
  }

  return organizations.map((org) => (
    <div
      key={org.slug}
      className={cn(
        "group flex items-center gap-0.5",
        "animate-in fill-mode-backwards fade-in slide-in-from-bottom-2 duration-200",
      )}
    >
      <SidebarLink href={`/app/${org.slug}`} title={org.name}>
        <p className="max-w-32 truncate">{org.name}</p>
      </SidebarLink>
      <OrganizationOptions
        organization={org}
        className="group-hover:opacity-100"
      />
    </div>
  ));
};

export default ShowOrganizations;
