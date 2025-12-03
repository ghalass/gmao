// server/api/auth/register.post.ts
import { hash } from "bcrypt-ts";
import { usersTable } from "~~/server/db/schema";

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);
  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: "Nom d'utilisateur et mot de passe sont requis.",
    });
  }
  const hashedPassword = await hash(password, 10);
  const db = useDrizzle();
  const inserteResult = await db
    .insert(usersTable)
    .values({
      username,
      password: hashedPassword,
    })
    .returning();
  return { inserteResult };
  // const { password: _, ...userWithoutPassword } = inserteResult;
  // return { user: userWithoutPassword };
});
