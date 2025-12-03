import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const sitesTable = pgTable("sites", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar().notNull().unique(),
});

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar().unique(),
  password: varchar().notNull(),
});
