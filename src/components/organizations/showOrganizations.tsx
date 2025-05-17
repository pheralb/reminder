import { Await } from "@/utils/await";
import { getOrganizations } from "@/server/queries/organizations";
import { Skeleton } from "@/ui/skeleton";

const ShowOrganizations = async () => {
  return (
    <Await
      promise={getOrganizations()}
      fallback={<Skeleton className="h-8 w-full" />}
      errorComponent={<div>Error</div>}
    >
      {(data) => {
        if (!data) {
          return <div>Inicia sesión</div>;
        }

        if (data.length === 0) {
          return <div>No tienes organizaciones</div>;
        }

        return (
          <div className="space-y-2">
            {data.map((org) => (
              <div key={org.id} className="rounded border p-2">
                <p className="font-medium">{org.name}</p>
                <p className="text-sm text-gray-500">{org.id}</p>
              </div>
            ))}
          </div>
        );
      }}
    </Await>
  );
};

export default ShowOrganizations;
