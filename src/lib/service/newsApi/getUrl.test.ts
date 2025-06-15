/**
 * src/lib/service/newsApi/getBaseUrl.test.ts
 * This file contains unit tests for the `getUrl` function located in
 * `src/lib/service/newsApi/getBaseUrl.ts`.
 * It uses Vitest for the testing framework.
 * */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getUrl } from './getUrl';
import { NewsApiError } from './error';

// Mock the process.env object specifically for the NEWS_API_KEY
// This ensures that tests are isolated and don't rely on actual environment variables.
let originalNewsApiKey: string | undefined;

beforeEach(() => {
    // Save the original value of process.env.NEWS_API_KEY if it exists,
    // so we can restore it after all tests.
    originalNewsApiKey = process.env.NEWS_API_KEY;

    // Set a consistent mock API key for tests.
    process.env.NEWS_API_KEY = 'TEST_API_KEY_123';
});

afterEach(() => {
    // Clean up: Restore the original process.env.NEWS_API_KEY after each test
    // to prevent side effects on other tests or parts of the application.
    if (originalNewsApiKey !== undefined) {
        process.env.NEWS_API_KEY = originalNewsApiKey;
    } else {
        // If it was originally undefined, delete the property.
        delete process.env.NEWS_API_KEY;
    }
    // Clear all mocks after each test to ensure a clean state.
    vi.clearAllMocks();
});

describe('getUrl', () => {
    // Test case 1: Successful URL construction with a basic endpoint and no parameters
    it('should construct a valid URL with a basic endpoint and no parameters', () => {
        const endpoint = '/everything';
        const params = {};
        const expectedUrl = 'https://newsapi.org/v2/everything?apiKey=TEST_API_KEY_123';
        expect(getUrl(endpoint, params)).toBe(expectedUrl);
    });

    // Test case 2: Successful URL construction with an endpoint not starting with a slash
    it('should construct a valid URL when endpoint does not start with a slash', () => {
        const endpoint = 'everything'; // No leading slash
        const params = {};
        const expectedUrl = 'https://newsapi.org/v2/everything?apiKey=TEST_API_KEY_123';
        expect(getUrl(endpoint, params)).toBe(expectedUrl);
    });

    // Test case 3: Successful URL construction with additional query parameters
    it('should construct a valid URL with additional query parameters', () => {
        const endpoint = '/everything';
        const params = {
            language: 'en',
            category: 'technology'
        };
        const expectedUrl = 'https://newsapi.org/v2/everything?apiKey=TEST_API_KEY_123&language=en&category=technology';
        expect(getUrl(endpoint, params)).toBe(expectedUrl);
    });

    // Test case 4: Successful URL construction with mixed endpoint and parameters
    it('should construct a valid URL with mixed endpoint style and parameters', () => {
        const endpoint = 'sources'; // No leading slash
        const params = {
            language: 'en',
        };
        const expectedUrl = 'https://newsapi.org/v2/sources?apiKey=TEST_API_KEY_123&language=en';
        expect(getUrl(endpoint, params)).toBe(expectedUrl);
    });

    // Test case 5: Error handling when endpoint is not provided
    it('should throw NewsApiError if endpoint is not provided', () => {
        const endpoint = ''; // Empty endpoint
        const params = {};
        // Expect the function to throw an instance of NewsApiError
        // and check its message and operational status.
        expect(() => getUrl(endpoint, params)).toThrow(NewsApiError);
        expect(() => getUrl(endpoint, params)).toThrow('News API endpoint is not provided');

        // Capture the error to assert its properties
        let caughtError: NewsApiError | undefined;
        try {
            getUrl(endpoint, params);
        } catch (error) {
            caughtError = error as NewsApiError;
        }
        expect(caughtError?.isOperational).toBe(false); // Programming error
    });

    // Test case 6: Error handling when NEWS_API_KEY is not set in environment variables
    it('should throw NewsApiError if NEWS_API_KEY is not set', () => {
        // Temporarily unset the API key for this specific test
        delete process.env.NEWS_API_KEY;

        const endpoint = '/everything';
        const params = {};

        // Expect the function to throw an instance of NewsApiError
        // and check its message and operational status.
        expect(() => getUrl(endpoint, params)).toThrow(NewsApiError);
        expect(() => getUrl(endpoint, params)).toThrow('NEWS_API_KEY environment variable is not set');

        // Capture the error to assert its properties
        let caughtError: NewsApiError | undefined;
        try {
            getUrl(endpoint, params);
        } catch (error) {
            caughtError = error as NewsApiError;
        }
        expect(caughtError?.isOperational).toBe(false); // Programming error
    });
});