/**
 * @fileoverview Provides a function to fetch data from the News API.
 * This file contains a utility function that constructs a URL using `getUrl`
 * and then performs an asynchronous fetch request to retrieve data from the News API.
 * It includes robust error handling for network issues and API-specific responses.
 */

import { NewsApiError } from "./error"; // Adjust path as per your project structure
import { getUrl } from "./getUrl"; // Adjust path as per your project structure

/**
 * Fetches data from the News API using a specified endpoint and parameters.
 * This function first constructs the full API URL using the `getUrl` utility,
 * then performs an HTTP GET request to that URL. It handles potential network
 * errors and non-successful HTTP responses by throwing `NewsApiError` instances.
 *
 * @param {string} endpoint - The News API endpoint (e.g., '/top-headlines', '/everything').
 * @param {Record<string, string>} params - An object containing query parameters for the API request.
 * @returns {Promise<any>} A Promise that resolves with the parsed JSON data from the API response. the type is generic
 * @throws {NewsApiError} If there's a network error, a non-2xx HTTP response from the API,
 * or issues with URL construction (propagated from `getUrl`).
 */
export async function getNewsApiData<K>(endpoint: string, params: Record<string, string>): Promise<K> {
    let url: string;
    try {
        // Construct the full URL using the previously defined getUrl function.
        // This will handle validation for endpoint and API key.
        url = getUrl(endpoint, params);
    } catch (error) {
        // If getUrl throws an error (e.g., missing API key or endpoint), re-throw it.
        // These are typically programming errors.
        if (error instanceof NewsApiError) {
            throw error;
        }
        // Catch any other unexpected errors during URL construction.
        throw new NewsApiError(
            `Failed to construct News API URL: ${(error as Error).message}`,
            false,
            500,
        );
    }

    try {
        // Perform the fetch request to the constructed URL.
        const response = await fetch(url);

        // Check if the HTTP response status is not OK (i.e., 2xx).
        // This covers 4xx and 5xx errors from the News API.
        if (!response.ok) {
            let errorDetail = `HTTP error! Status: ${response.status}`;
            let apiMessage = '';
            try {
                // Attempt to parse the error response body for more details from the API.
                const errorBody = await response.json();
                if (errorBody && errorBody.message) {
                    apiMessage = `: ${errorBody.message}`;
                }
            } catch (jsonParseError) {
                // If parsing JSON fails, just use the status.
                throw new NewsApiError(
                    `Failed to parse News API error response JSON: ${jsonParseError}`,
                    true,
                    500,
                );
            }

            // Throw a NewsApiError with an operational flag set to true,
            // as these are expected API responses (e.g., bad request, rate limiting).
            throw new NewsApiError(
                `News API returned an error${apiMessage}. ${errorDetail}`,
                true,
                response.status,
            );
        }

        // Parse the successful response body as JSON.
        const data = await response.json();
        return data;

    } catch (error) {
        // If the error is already a NewsApiError (e.g., from an earlier response.ok check), re-throw it.
        if (error instanceof NewsApiError) {
            throw error;
        }
        // Catch network errors (e.g., no internet connection, DNS issues)
        // or any other unexpected errors during the fetch operation.
        throw new NewsApiError(
            `Network or unexpected error while fetching from News API: ${(error as Error).message}`,
            true, // Network errors are generally considered operational.
            503, // Service Unavailable is a common status for network issues.
        );
    }
}
