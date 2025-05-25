import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

const ExternalLink = (props: ComponentProps<"a">) => {
  return (
    <a
      href={props.href}
      title={props.title}
      rel="noreferrer"
      target="_blank"
      className={cn(props.className)}
    >
      {props.children}
    </a>
  );
};

export { ExternalLink };
