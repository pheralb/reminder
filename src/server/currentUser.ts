"use server";

import { auth } from "@clerk/nextjs/server";

let cachedAuthData: ReturnType<typeof auth> | null = null;

export const getCurrentUserId = async () => {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (!cachedAuthData) {
    cachedAuthData = auth();
  }
  return cachedAuthData;
};
