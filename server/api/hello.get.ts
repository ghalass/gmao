// server/api/fruits.get.ts
export default defineEventHandler(async (event) => {
  const fruits = ["apple", "banana", "orange", "grapes"];
  await new Promise((resolver) => setTimeout(resolver, 3000));
  // throw createError("OPS");

  return fruits;
});
