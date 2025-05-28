import { Skeleton } from "@/ui/skeleton";

import { useQuery } from "@tanstack/react-query";
import { SidebarLink } from "@/components/layout/sidebarLink";

import { cn } from "@/utils/cn";
import { Ellipse } from "@/ui/shapes";

import WorkspaceOptions from "./workspaceOptions";
import { useTRPC } from "@/database/trpc/utils";

interface ShowWorkspacesProps {
  userId: string;
}

const ShowWorkspaces = ({ userId }: ShowWorkspacesProps) => {
  const trpc = useTRPC();
  const workspaceQuery = useQuery(trpc.workspaces.getWorkspaces.queryOptions());
  const workspacesData = workspaceQuery.data;

  if (!workspacesData) {
    return <Skeleton className="h-8 w-full" />;
  }

  if (workspacesData.length === 0) {
    return (
      <div className="my-2 flex flex-col items-center justify-center space-y-2">
        <Ellipse width={32} height={32} />
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Your workspaces will be here
        </p>
      </div>
    );
  }

  return workspacesData.map((org) => (
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
      <WorkspaceOptions
        userId={userId}
        organization={org}
        className="group-hover:opacity-100"
      />
    </div>
  ));
};

export default ShowWorkspaces;
