CREATE TABLE "sites" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "sites_name_unique" UNIQUE("name")
);
