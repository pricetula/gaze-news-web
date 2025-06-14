import { Article } from "@/lib/service/newsApi/types";
import { sources, authors } from "../schema";
import { db } from "../drizzledb";

export async function saveArticles(articlesFromNewsApi: Article[]) {
    const sourcesToAdd = []
    const authorsToAdd: {
        id: string;
        name: string;
    }[] = []
    const articlesToAdd = []

    for (const article of articlesFromNewsApi) {
        if (!article.publishedAt) continue
        const source = {
            id: article.source.id,
            name: article.source.name,
            description: '',
            url: '',
            categoryId: '',
            languageId: '',
            countryId: ''
        }

        const author = {
            id: article.author?.toLowerCase?.()?.replaceAll(' ', '-') || '',
            name: article.author || ''
        }

        articlesToAdd.push({
            ...article,
            sourceId: source.id,
            authorId: author.id,
            id: crypto.randomUUID()
        })

        sourcesToAdd.push(source)

        authorsToAdd.push(author)
    }

    // await db.insert(sources).values(sourcesToAdd)
    await db.insert(authors).values(authorsToAdd)
}