import z, { string } from "zod";

export const siteSchema = z.object({
  name: string().min(2).max(10),
  description: string().min(2),
});
