import { NextRequest } from "next/server";

// GET request to fetch news from the news api, sync it to our database and return results as response
export async function GET(request: NextRequest) {
    // Get search params from the urql
    const { searchParams } = new URL(request.url);

    // If no search params found then return error response
    if (!searchParams) return new Response(
        JSON.stringify({ message: "search params are missing" }),
        { status: 400 }
    )

    // Obtain page from the urql
    let page = searchParams.get('page');
    if (!page) return new Response(
        JSON.stringify({ message: "page missing" }),
        { status: 400 }
    )

    // Attempt to save articles obtained from news api
    try {
        const pageNum = Number(page);

        const r = await fetch(`https://api.pexels.com/v1/curated?per_page=15&page=${pageNum}`, {
            headers: {
                Authorization: process.env.PEXELS_API_KEY || '',
            },
        });
        const res = await r.json()
        console.log(res)
        return new Response(JSON.stringify(res), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        // Throw exception
        return new Response(
            JSON.stringify({ error }),
            { status: 500 }
        )
    }
}