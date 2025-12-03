// server/api/auth/register.post.ts
import { compare } from "bcrypt-ts";
import { eq } from "drizzle-orm";
import { usersTable } from "~~/server/db/schema";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);
  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: "Nom d'utilisateur et mot de passe sont requis.",
    });
  }
  const db = useDrizzle();
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1);
  if (!user)
    throw createError({ statusCode: 404, message: "Utilisateur n'existe pas" });
  if (!(await compare(password, user.password)))
    throw createError({ statusCode: 401, message: "Mot de passe invalide" });
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_PRIVATE!,
    { algorithm: "HS256", expiresIn: "7h" }
  );
  return { token };
});
