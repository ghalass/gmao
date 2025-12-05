// server/api/auth/register.post.ts
import { hash } from "bcrypt-ts";
import { usersTable } from "~~/server/db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  // Validation améliorée
  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: "Nom d'utilisateur et mot de passe sont requis.",
    });
  }

  // Vérifiez que username est bien une chaîne
  if (typeof username !== "string") {
    throw createError({
      statusCode: 400,
      message: "Le nom d'utilisateur doit être une chaîne de caractères.",
    });
  }

  // Vérifiez que password est bien une chaîne
  if (typeof password !== "string") {
    throw createError({
      statusCode: 400,
      message: "Le mot de passe doit être une chaîne de caractères.",
    });
  }

  // Validation de longueur (optionnel)
  if (username.length < 3) {
    throw createError({
      statusCode: 400,
      message: "Le nom d'utilisateur doit contenir au moins 3 caractères.",
    });
  }

  if (password.length < 6) {
    throw createError({
      statusCode: 400,
      message: "Le mot de passe doit contenir au moins 6 caractères.",
    });
  }

  const hashedPassword = await hash(password, 10);
  const db = useDrizzle();

  try {
    const insertResult = await db
      .insert(usersTable)
      .values({
        username,
        password: hashedPassword,
      })
      .returning();

    // Retourner l'utilisateur sans le mot de passe
    const { password: _, ...userWithoutPassword } = insertResult[0];
    return { user: userWithoutPassword };
  } catch (error: any) {
    // Gestion des erreurs spécifiques (comme les usernames dupliqués)
    if (error.code === "23505") {
      // Code d'erreur PostgreSQL pour violation de contrainte unique
      throw createError({
        statusCode: 409,
        message: "Ce nom d'utilisateur est déjà pris.",
      });
    }

    console.error("Erreur lors de l'inscription:", error);
    throw createError({
      statusCode: 500,
      message: "Une erreur est survenue lors de l'inscription.",
    });
  }
});
