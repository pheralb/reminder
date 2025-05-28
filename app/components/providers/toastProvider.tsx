import { Toaster, type ToasterProperties } from "@pheralb/toast";

import { XIcon } from "lucide-react";
import { useTheme } from "remix-themes";

const ToasterRRTheme = (props: ToasterProperties) => {
  const [theme] = useTheme();
  return (
    <Toaster
      theme={theme!}
      toastOptions={{
        headless: true,
        classNames: {
          toast:
            "font-sans text-sm font-medium z-50 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-md relative flex items-center",
          container: "flex items-center py-4 space-x-2 px-4 w-full",
          content: "flex flex-col space-y-0.5 mr-2",
          actions: {
            container: "flex flex-col px-3",
            actionBtn:
              "px-2 py-1 text-[12px] font-medium rounded-md bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-500 dark:focus-visible:ring-zinc-400 transition duration-200 ease-in-out",
            closeBtn:
              "absolute items-center flex justify-center -top-2 -left-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors bg-zinc-200 dark:bg-zinc-800 p-0.5 border border-zinc-300 dark:border-zinc-500 hover:border-zinc-600 dark:hover:border-zinc-200 rounded-full focus:outline-none",
          },
          icon: "flex-shrink-0 mr-1",
        },
        defaultCloseContent: <XIcon size={12} />,
      }}
      {...props}
    />
  );
};

export default ToasterRRTheme;
