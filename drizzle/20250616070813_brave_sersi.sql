CREATE TABLE "articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(512) NOT NULL,
	"description" text,
	"url" text NOT NULL,
	"url_to_image" text,
	"published_at" timestamp with time zone NOT NULL,
	"content" text,
	"source_id" varchar(255) NOT NULL,
	"author_id" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "authors" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "last_fetched_date" (
	"from" date NOT NULL,
	"to" date NOT NULL,
	"key_words_searched" varchar(255) NOT NULL,
	CONSTRAINT "last_fetched_date_key_words_searched_from_to_pk" PRIMARY KEY("key_words_searched","from","to")
);
--> statement-breakpoint
CREATE TABLE "sources" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE no action ON UPDATE no action;