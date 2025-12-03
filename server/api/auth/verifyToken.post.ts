import jwt from "jsonwebtoken";
import { JwtUserInfo } from "~~/shared/types/JwtUserInfo";
export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  if (!token) {
    throw createError({
      statusCode: 400,
      message: "Aucun token n'est fournie",
    });
  }
  const user = jwt.verify(token, process.env.JWT_PRIVATE!) as JwtUserInfo;
  if (user) {
    return { succuss: true, user: { user } };
  }
  throw createError({
    statusCode: 401,
    message: "Non authorisé",
  });
});
