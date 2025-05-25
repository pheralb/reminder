import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { envServer } from "@/env.server";
import * as schema from "@/database/schema";

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};
const conn = globalForDb.conn ?? postgres(envServer.DATABASE_URL);
if (envServer.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
