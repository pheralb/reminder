import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";

export const envPublic = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_HELLO: z.string(),
    VITE_CLERK_PUBLISHABLE_KEY: z.string(),
    VITE_CLERK_SIGN_IN_URL: z.string(),
    VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: z.string(),
    VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: z.string(),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
