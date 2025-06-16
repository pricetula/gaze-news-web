import { NextRequest } from "next/server";
import * as Sentry from "@sentry/node";
import { saveArticles } from "@/db/articles/save";
import { getEverything } from "@/lib/service/newsApi/getEverything";
import { DBError } from "@/db/error";
import { NewsApiError } from "@/lib/service/newsApi/error";


Sentry.init({
    dsn: process.env.SENTRY_DSN,
    sendDefaultPii: true,
});

// GET request to fetch news from the news api, sync it to our database and return results as response
export async function GET(request: NextRequest) {
    // Get search params from the urql
    const { searchParams } = new URL(request.url);

    // If no search params found then return error response
    if (!searchParams) return new Response(
        JSON.stringify({ message: "search params are missing" }),
        { status: 400 }
    )

    // Obtain key words from the urql
    const keyWords = searchParams.get('keywords');
    if (!keyWords) return new Response(
        JSON.stringify({ message: "keywords for search are missing" }),
        { status: 400 }
    )

    // Attempt to save articles obtained from news api
    try {
        await saveArticles(await getEverything({ keyWords }));
    } catch(error: any) {
        // Throw exception
        return new Response(
            JSON.stringify({ message: "Failed to save articles to database" }),
            { status: 500 }
        )
    }

    return new Response(JSON.stringify({ message: "Hello from API" }), {
        headers: { 'Content-Type': 'application/json' },
    });
}