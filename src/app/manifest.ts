import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reminder",
    short_name: "Reminder",
    description: "A minimalistic web app to remember & organize your things.",
    start_url: "/",
    display: "standalone",
    background_color: "#18181B",
    theme_color: "#18181B",
    icons: [
      {
        src: "/logo_png.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logo_svg.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
