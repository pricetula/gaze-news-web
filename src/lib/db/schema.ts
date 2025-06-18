import { pgTable, uuid, varchar, text, timestamp, primaryKey, date } from 'drizzle-orm/pg-core';

// Authors Table
export const authors = pgTable('authors', {
    id: varchar('id', { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
});

// Sources Table
export const sources = pgTable('sources', {
    id: varchar('id', { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    url: text('url').notNull(),
});

// Articles Table
export const articles = pgTable('articles', {
    id: uuid('id').defaultRandom().notNull().primaryKey(),
    title: varchar('title', { length: 512 }).notNull(),
    description: text('description'),
    url: text('url').notNull(),
    urlToImage: text('url_to_image'),
    publishedAt: timestamp('published_at', { withTimezone: true }).notNull(),
    content: text('content'),
    sourceId: varchar('source_id', { length: 255 }).notNull().references(() => sources.id),
    authorId: varchar('author_id', { length: 255 }).notNull().references(() => authors.id),
    categoryId: uuid("category_id")
        .notNull().references(() => categories.id, { onDelete: "cascade" })
});

// Last fetched
export const lastFetchedDate = pgTable(
    'last_fetched_date',
    {
        from: date().notNull(),
        to: date().notNull(),
        keyWordsSearched: varchar('key_words_searched', { length: 255 }).notNull(),
    },
    (table) => ([
        primaryKey({
            columns: [table.keyWordsSearched, table.from, table.to],
        })
    ]),
);

// Key words
export const keyWords = pgTable(
    'key_words',
    {
        id: uuid('id').defaultRandom().notNull().primaryKey(),
        name: varchar('name', { length: 255 }).notNull(),
    },
);

// Article key words
export const articleKeyWords = pgTable(
    'article_key_words',
    {
        articleId: uuid('article_id').notNull().references(() => articles.id),
        keyWordId: uuid('key_word_id').notNull().references(() => keyWords.id),
    },
    (table) => ([
        primaryKey({
            columns: [table.articleId, table.keyWordId],
        })
    ]),
)

export const categories = pgTable("categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
});