import { pgSchema, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const mySchema = pgSchema('public');

// Authors Table
export const authors = mySchema.table('authors', {
    id: varchar('id', { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
});

// Categories Table
export const categories = mySchema.table('categories', {
    id: varchar('id', { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
});

// Countries Table
export const countries = mySchema.table('countries', {
    id: varchar('id', { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
});

// Languages Table
export const languages = mySchema.table('languages', {
    id: varchar('id', { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
});

// Sources Table
export const sources = mySchema.table('sources', {
    id: varchar('id', { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    url: text('url').notNull(),
    categoryId: varchar('category_id', { length: 255 }).references(() => categories.id),
    languageId: varchar('language_id', { length: 255 }).references(() => languages.id),
    countryId: varchar('country_id', { length: 255 }).references(() => countries.id),
});

// Articles Table
export const articles = mySchema.table('articles', {
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
