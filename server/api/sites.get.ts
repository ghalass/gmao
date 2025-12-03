import { sitesTable } from "../db/schema";
import { useDrizzle } from "../utils/drizzle";

// server/api/sites.get.ts
export default defineEventHandler(async (event) => {
  await new Promise((resolver) => setTimeout(resolver, 3000));
  const sites = useDrizzle().select().from(sitesTable);
  return sites;
});
