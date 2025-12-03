pnpm create nuxt@latest apsem2
pnpm install tailwindcss @tailwindcss/vite
pnpm add drizzle-orm pg
pnpm add -D drizzle-kit @types/pg
npx drizzle-kit generate
npx drizzle-kit migrate
pnpm add bcrypt-ts
pnpm add jsonwebtoken
