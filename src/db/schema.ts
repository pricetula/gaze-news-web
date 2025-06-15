import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

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
});

// Last fetched date Table
export const lastFetchedDate = pgTable('last_fetched_date', {
    date: timestamp('date', { withTimezone: true }).notNull(),
});