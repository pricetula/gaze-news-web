import { Article, NewSource } from "@/lib/service/newsApi/types";
import { sources, authors, articles } from "../schema";
import { db } from "../drizzledb";
import { DBError } from "../error";

export async function saveArticles(articlesFromNewsApi: Article[]) {
    // Define variable that will hold a collection of NewSource
    const sourcesToAdd: Record<string, NewSource> = {}

    // Define variable that will hold a collection of authors to be added
    const authorsToAdd: Record<string, {
        id: string;
        name: string;
    }> = {}

    // Define a list that will hold articles to be added to tha database
    const articlesToAdd = []

    // Iterate through each article
    for (const article of articlesFromNewsApi) {
        // Create an Id for an author converting author name to lowercase
        const authorId = article.author?.toLowerCase?.()?.replaceAll(' ', '-') || ''

        // Create source id for article to be created
        const sourceId = article.source.id?.toLowerCase?.()?.replaceAll(' ', '-') || ''

        // If missing article published at date, author id or source id then continue to next item
        if (!article.publishedAt || !authorId || !sourceId) continue

        // Create a new source
        const source = {
            id: sourceId,
            name: article.source.name,
            description: '',
            url: '',
        }

        // Create a new author
        const author = {
            id: authorId,
            name: article.author || ''
        }

        // Add articles to be added to the database
        articlesToAdd.push({
            id: crypto.randomUUID(),
            sourceId: source.id,
            authorId: author.id,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: new Date(article.publishedAt),
            content: article.content,
        })

        // Map the source to sourcesToAdd collection
        if (source.id && !sourcesToAdd[source.id]) {
            sourcesToAdd[source.id] = source
        }

        // Map the author to authorsToAdd collection
        if (author.id && !authorsToAdd[author.id]) {
            authorsToAdd[author.id] = author
        }
    }

    try {
        await db.insert(sources).values(Object.values(sourcesToAdd))
    } catch (error: any) {
        if (error.code !== '23505') {
            throw new DBError(error.message)
        }
    }

    try {
        await db.insert(authors).values(Object.values(authorsToAdd))
    } catch (error: any) {
        if (error.code !== '23505') {
            throw new DBError(error.message)
        }
    }

    try {
        await db.insert(articles).values(articlesToAdd)
    } catch (error: any) {
        if (error.code !== '23505') {
            throw new DBError(error.message)
        }
    }
}