/**
 * This tests getTopHeadlines function to confirm it returns data or throws NewsApiError exceptions
 * It uses Vitest for the testing framework and mocks the `fetch` API.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getTopHeadlines } from './getTopHeadlines';
import { NewsApiError } from './error';
import { after } from 'node:test';

// Mock the process.env object for NEWS_API_KEY
let originalNewsApiKey: string | undefined;

// Mock the global fetch function
const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
    // Save original NEWS_API_KEY and set a mock key for tests
    originalNewsApiKey = process.env.NEWS_API_KEY;
    process.env.NEWS_API_KEY = 'MOCK_API_KEY_FOR_TESTING';

    // Reset mocks before each test to ensure test isolation
    mockFetch.mockReset();
});

afterEach(() => {
    // Restore original NEWS_API_KEY
    if (originalNewsApiKey !== undefined) {
        process.env.NEWS_API_KEY = originalNewsApiKey;
    } else {
        delete process.env.NEWS_API_KEY;
    }
    vi.clearAllMocks(); // Clears all mocks, including module mocks
});

describe('getTopHeadlines', () => {
    // Test case 1: Successful API call with expected data
    it('should fetch data successfully and return parsed JSON', async () => {
        const mockResponseData = {
            status: 'ok',
            totalResults: 1,
            articles: [{ title: 'Test Article' }],
        };

        // Configure mockFetch to return a successful response
        mockFetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => Promise.resolve(mockResponseData),
        });

        const data = await getTopHeadlines();

        expect(data).toEqual(mockResponseData.articles);
        expect(mockFetch).toHaveBeenCalledWith('https://newsapi.org/v2/top-headlines?apiKey=MOCK_API_KEY_FOR_TESTING&country=us');
    });

    // Test case 2: News API returns an error response that is not valid JSON
    it('should handle non-JSON error responses from News API gracefully', async () => {
        const errorStatusCode = 500;
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: errorStatusCode,
            json: () => Promise.reject(new Error('SyntaxError: Unexpected token < in JSON at position 0')), // Simulate non-JSON response
            text: () => Promise.resolve('<html>Error</html>') // Fallback if needed, though not used here
        });

        try {
            await getTopHeadlines();
        } catch (error) {
            const newsApiError = error as NewsApiError;
            // The message should indicate HTTP error without specific API message
            expect(newsApiError.message).toContain('Failed to parse News API error response JSON');
            expect(newsApiError.statusCode).toBe(errorStatusCode);
            expect(newsApiError.isOperational).toBe(true);
        }
        expect(mockFetch).toHaveBeenCalled();
    });
});