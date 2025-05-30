import AppOptions from "@/components/layout/appOptions";

import { cn } from "@/utils/cn";
import { container } from "@/ui/container";
import { Button } from "@/ui/button";
import { PlusIcon } from "lucide-react";

import CreateCollection from "@/components/collections/createCollection";

const AppHomepage = () => {
  return (
    <div className="flex flex-col pb-5">
      <AppOptions>
        <CreateCollection>
          <Button variant="default">
            <PlusIcon size={16} />
            <span>Create Collection</span>
          </Button>
        </CreateCollection>
      </AppOptions>
      <main className={cn(container, "mt-6")}>
        <p>hello</p>
      </main>
    </div>
  );
};

export default AppHomepage;
