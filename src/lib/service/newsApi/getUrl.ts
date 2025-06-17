/**
 * @fileoverview Utility function for constructing News API URLs.
 * This file provides a function to build a complete API request URL
 * with a given endpoint, parameters, and the necessary API key.
 */

import { NewsApiError } from "./error";

/**
 * Constructs a complete URL for the News API.
 * This function builds the API request URL by combining the base URL,
 * a specified endpoint, and any provided query parameters,
 * automatically appending the API key.
 *
 * @param {string} endpoint - The specific API endpoint to call (e.g., '/everything', '/everything').
 * It can start with or without a leading slash.
 * @param {Record<string, string>} params - An object containing key-value pairs of URL query parameters.
 * These parameters will be appended to the URL's search query.
 * @returns {string} The fully constructed News API URL as a string.
 * @throws {NewsApiError} If the `endpoint` is not provided, indicating a **programming error**.
 * @throws {NewsApiError} If the `NEWS_API_KEY` environment variable is not set,
 * also indicating a **programming error**.
 */
export function getUrl(endpoint: string, params: Record<string, string>): string {
    // Raise an exception that specifies this to be a programming error
    // since an API endpoint is expected to be provided.
    // One should not call the news API base endpoint without an endpoint to get specific data.
    if (!endpoint) {
        throw new NewsApiError(
            "News API endpoint is not provided",
            false, // This is a programming error, not an operational one.
        );
    }

    // Base endpoint for News API using default v2 as per documentation.
    const BASE_URL = 'https://newsapi.org/v2';

    // Obtain NEWS_API_KEY from environment variables.
    const API_KEY = process.env.NEWS_API_KEY;

    // Raise an exception that specifies this to be a programming error
    // since NEWS_API_KEY is expected to be set in the environment.
    if (!API_KEY) {
        throw new NewsApiError(
            "NEWS_API_KEY environment variable is not set",
            false, // This is a programming/configuration error, not an operational one.
        );
    }

    // Check if the endpoint provided starts with a forward slash to avoid `//` in the constructed URL.
    const isUrlStartingWithSlash = endpoint.startsWith('/');

    // Construct the base URL with the endpoint.
    const constructedUrl = new URL(isUrlStartingWithSlash ? `${BASE_URL}${endpoint}` : `${BASE_URL}/${endpoint}`);

    // Append the API key to the URL's search parameters.
    constructedUrl.searchParams.append('apiKey', API_KEY);

    // Iterate through the `params` object keys and add them as search parameters if available.
    for (const key in params) {
        // Ensure the parameter is a direct property of the params object, not from its prototype chain.
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            constructedUrl.searchParams.append(key, params[key]);
        }
    }

    // Return the constructed URL in string format.
    return constructedUrl.toString();
}
