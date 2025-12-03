CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" varchar,
	"password" varchar NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
