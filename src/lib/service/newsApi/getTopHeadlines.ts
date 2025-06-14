/**
 * @fileoverview Provides a function to fetch the latest top headlines from the News API.
 * It might throw NewsApiError exceptions if an issue arises.
 */

import { NewsApiError } from "./error";
import { getNewsApiData } from "./getNewsApiData";
import { Article, NewsResponse } from "./types";

/**
 * Fetches the latest top headlines from the News API.
 * This function first constructs the full API URL using the `getUrl` utility,
 * then performs an HTTP GET request to that URL. It handles potential network
 * errors and non-successful HTTP responses by throwing `NewsApiError` instances.
 *
 * @returns {Promise<Article[]>} A Promise that resolves with the parsed Article JSON data from the API response.
 * @throws {NewsApiError} If there's a network error, a non-2xx HTTP response from the API,
 * or issues with URL construction (propagated from `getUrl`).
 */
export async function getTopHeadlines(): Promise<Article[]> {
    const response = await getNewsApiData<NewsResponse>(
        '/top-headlines',
        {
            country: 'us',
        }
    )
    if (response.status !== "ok") {
        throw new NewsApiError(
            "attempting to get top headlines failed response status is not ok",
        );
    }
    return response.articles;
}
