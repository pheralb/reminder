import type { ReactNode } from "react";

interface CollectionGroupProps {
  children: ReactNode;
}

const CollectionGroup = (props: CollectionGroupProps) => {
  return <div className="mt-3 flex flex-col space-y-12">{props.children}</div>;
};

export default CollectionGroup;
