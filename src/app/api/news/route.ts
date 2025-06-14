import { NextRequest } from "next/server";

// GET request to fetch news from the news api, sync it to our database and return results as response
export async function GET(request: NextRequest) {
    return new Response(JSON.stringify({ message: "Hello from API" }), {
        headers: { 'Content-Type': 'application/json' },
    });
}