import type { ReactNode } from "react";
import { Lightning } from "@/ui/shapes";

interface BlankCollectionProps {
  children: ReactNode;
}

const BlankCollection = (props: BlankCollectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 py-4">
      <Lightning width={30} height={30} />
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        Start organizing your things by creating a collection
      </p>
      {props.children}
    </div>
  );
};

export default BlankCollection;
