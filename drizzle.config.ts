import type { Config } from "drizzle-kit";
import { envServer } from "@/env.server";

export default {
  schema: "./app/database/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: envServer.DATABASE_URL,
  },
  tablesFilter: ["reminder_*"],
} satisfies Config;
