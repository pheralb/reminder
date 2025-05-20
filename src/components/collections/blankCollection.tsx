import { Lightning } from "@/ui/shapes";
import CreateCollection from "./createCollection";
import { Button } from "@/ui/button";

const BlankCollection = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 py-4">
      <Lightning width={30} height={30} />
      <p className="font-onest text-lg text-zinc-600 dark:text-zinc-400">
        Start organizing your things by creating a collection
      </p>
      <CreateCollection>
        <Button variant="outline">
          Create
        </Button>
      </CreateCollection>
    </div>
  );
};

export default BlankCollection;
