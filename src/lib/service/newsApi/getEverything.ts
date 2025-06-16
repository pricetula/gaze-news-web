/**
 * @fileoverview Provides a function to fetch articles from the News API's `/everything` endpoint.
 * This function allows filtering by keyword and date range, and throws a `NewsApiError` if an issue arises.
 */

import { NewsApiError } from "./error";
import { getNewsApiData } from "./getNewsApiData";
import { Article, NewsResponse } from "./types";

/**
 * Fetches articles from the News API's `/everything` endpoint based on provided filters.
 * Accepts optional keyword(s) and a date range (from–to), and always queries with `language=en`.
 * Internally constructs query parameters and delegates the HTTP request to `getNewsApiData`.
 *
 * @param {GetEverythingInput} input - Object containing filter criteria: `keyWords`, `from`, and `to`.
 * @returns {Promise<Article[]>} A Promise that resolves to an array of articles matching the search criteria.
 * @throws {NewsApiError} If the API response status is not "ok", or if a network or request error occurs.
 */
export async function getEverything({
    keyWords,
    from,
    to,
}: GetEverythingInput): Promise<Article[]> {
    let params: Record<string, string> = {
        language: 'en',
    }
    if (keyWords) {
        params.q = keyWords;
    }
    if (from) {
        params.from = from.toISOString();
    }
    if (to) {
        params.to = to.toISOString();
    }
    const response = await getNewsApiData<NewsResponse>(
        '/everything',
        params
    )
    if (response.status !== "ok") {
        throw new NewsApiError(
            "attempting to get top headlines failed response status is not ok",
        );
    }
    return response.articles;
}

/**
 * Input parameters for fetching articles using `getEverything`.
 *
 * @property {string} keyWords - Search query string (e.g., keywords or phrases).
 * @property {Date} from - Start date for the query (inclusive).
 * @property {Date} to - End date for the query (inclusive).
 */
interface GetEverythingInput {
    keyWords?: string;
    from?: Date;
    to?: Date;
}
