import { cn } from "@/utils/cn";
import { container } from "@/ui/container";
import AppOptions from "@/components/layout/appOptions";

export default function HomePage() {
  return (
    <div className={cn(container, "flex flex-col space-y-4")}>
      <AppOptions />
      <h2>hello</h2>
    </div>
  );
}
