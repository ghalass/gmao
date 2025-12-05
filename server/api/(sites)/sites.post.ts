// server/api/auth/register.post.ts
import { eq } from "drizzle-orm";
import { sitesTable } from "~~/server/db/schema";

export default defineEventHandler(async (event) => {
  await new Promise((resolver) => setTimeout(resolver, 1000));
  const body = await readBody(event);
  const { name } = body;

  // Validation
  if (!name) {
    throw createError({
      statusCode: 400,
      message: "Nom du site est requis.",
    });
  }

  if (name.length < 2) {
    throw createError({
      statusCode: 400,
      message: "Le nom du site doit contenir au moins 2 caractères.",
    });
  }

  const db = useDrizzle();

  const [site] = await db
    .select()
    .from(sitesTable)
    .where(eq(sitesTable.name, name))
    .limit(1);

  if (site) {
    throw createError({
      statusCode: 409,
      message: "Nom d'utilisateur existe déjà",
    });
  }

  const insertResult = await db
    .insert(sitesTable)
    .values({
      name,
    })
    .returning();

  return { insertResult };
});
