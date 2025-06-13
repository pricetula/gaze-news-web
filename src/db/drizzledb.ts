import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle({
    connection: process.env.DATABASE_URL!,
    // This allows us to use cameCase fields which will be converted to snake_case for db columns
    casing: 'snake_case'
});
