CREATE TABLE "article_key_words" (
	"article_id" uuid NOT NULL,
	"key_word_id" uuid NOT NULL,
	CONSTRAINT "article_key_words_article_id_key_word_id_pk" PRIMARY KEY("article_id","key_word_id")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "key_words" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "category_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "article_key_words" ADD CONSTRAINT "article_key_words_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_key_words" ADD CONSTRAINT "article_key_words_key_word_id_key_words_id_fk" FOREIGN KEY ("key_word_id") REFERENCES "public"."key_words"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;