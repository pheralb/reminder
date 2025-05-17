import { Await } from "@/utils/await";
import { getOrganizations } from "@/server/queries/organizations";

const ShowOrganizations = async () => {
  return (
    <Await
      promise={getOrganizations()}
      fallback={<div>Loading...</div>}
      errorComponent={<div>Error</div>}
    >
      {(data) => {
        return JSON.stringify(data, null, 2);
      }}
    </Await>
  );
};

export default ShowOrganizations;
