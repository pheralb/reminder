import type { User } from "@clerk/react-router/ssr.server";

export interface OutletContext {
  userId: User["id"] | null;
  sessionId: string | null;
}
