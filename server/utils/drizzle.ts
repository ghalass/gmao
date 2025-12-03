import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../db/schema";

const db = drizzle(process.env.DATABASE_URL!, { schema });

export function useDrizzle() {
  return db;
}

export type Site = typeof schema.sitesTable.$inferSelect;
export type User = typeof schema.usersTable.$inferSelect;
