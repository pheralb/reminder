import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";

export const envServer = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    CLERK_SECRET_KEY: z.string(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
