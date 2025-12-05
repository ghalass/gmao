ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE uuid;
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT;
--> statement-breakpoint
ALTER TABLE "users"
ALTER COLUMN "username"
SET DATA TYPE varchar(255);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "users"
ALTER COLUMN "password"
SET DATA TYPE varchar(255);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now();