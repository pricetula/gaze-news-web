// src/lib/service/newsApi/getNewsApiData.test.ts
//
// This file contains unit tests for the `getNewsApiData` function.
// It uses Vitest for the testing framework and mocks the `fetch` API.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getNewsApiData } from './getNewsApiData';
import { NewsApiError } from './error';
import { getUrl } from './getUrl';

// Mock the global fetch function
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock the process.env object for NEWS_API_KEY
let originalNewsApiKey: string | undefined;

// Mock the getUrl function to control its output and potential errors
vi.mock('./getUrl', () => ({
    getUrl: vi.fn(),
}));

// Cast the mocked getUrl to its original type for easier type checking if needed in tests
const mockedGetUrl = getUrl as unknown as ReturnType<typeof vi.fn>;


beforeEach(() => {
    // Save original NEWS_API_KEY and set a mock key for tests
    originalNewsApiKey = process.env.NEWS_API_KEY;
    process.env.NEWS_API_KEY = 'MOCK_API_KEY_FOR_TESTING';

    // Reset mocks before each test to ensure test isolation
    mockFetch.mockReset();
    mockedGetUrl.mockReset();

    // Default mock for getUrl to return a valid URL
    mockedGetUrl.mockReturnValue('https://newsapi.org/v2/mock-endpoint?apiKey=MOCK_API_KEY_FOR_TESTING');
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

describe('getNewsApiData', () => {
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

        const endpoint = '/everything';
        const params = { language: 'en' };

        // Call the function under test
        const data = await getNewsApiData(endpoint, params);

        // Assertions
        expect(mockedGetUrl).toHaveBeenCalledWith(endpoint, params);
        expect(mockFetch).toHaveBeenCalledWith('https://newsapi.org/v2/mock-endpoint?apiKey=MOCK_API_KEY_FOR_TESTING');
        expect(data).toEqual(mockResponseData);
    });

    // Test case 2: API returns a non-2xx (error) status
    it('should throw NewsApiError for non-ok HTTP responses from News API', async () => {
        const errorMessage = 'Invalid API key';
        const errorStatusCode = 401;

        // Configure mockFetch to return an error response from the API
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: errorStatusCode,
            json: async () => ({ code: 'apiKeyInvalid', message: errorMessage }),
        });

        const endpoint = '/everything';
        const params = { language: 'en' };

        // Assert properties of the thrown error
        try {
            await getNewsApiData(endpoint, params);
        } catch (error) {
            const newsApiError = error as NewsApiError;
            expect(newsApiError.message).toContain(`News API returned an error: ${errorMessage}. HTTP error! Status: ${errorStatusCode}`);
            expect(newsApiError.statusCode).toBe(errorStatusCode);
            expect(newsApiError.isOperational).toBe(true); // Operational error from API
        }
    });

    // Test case 3: Network error during fetch (e.g., no internet connection)
    it('should throw NewsApiError for network errors during fetch', async () => {
        const networkErrorMessage = 'Failed to fetch';

        // Configure mockFetch to throw an error, simulating a network issue
        mockFetch.mockRejectedValueOnce(new TypeError(networkErrorMessage));

        const endpoint = '/everything';
        const params = { q: 'test' };

        // Assert properties of the thrown error
        try {
            await getNewsApiData(endpoint, params);
        } catch (error) {
            const newsApiError = error as NewsApiError;
            expect(newsApiError.message).toContain(`Network or unexpected error while fetching from News API: ${networkErrorMessage}`);
            expect(newsApiError.statusCode).toBe(503); // Service Unavailable for network issues
            expect(newsApiError.isOperational).toBe(true); // Network errors are operational
        }
    });

    // Test case 4: Error propagation from getUrl function (e.g., missing API key)
    it('should propagate NewsApiError if getUrl throws an error (e.g., missing API key)', async () => {
        const getUrlErrorMessage = 'NEWS_API_KEY environment variable is not set';
        const getUrlErrorStatusCode = 500;

        // Configure mocked getUrl to throw a NewsApiError
        mockedGetUrl.mockImplementationOnce(() => {
            throw new NewsApiError(getUrlErrorMessage, false, getUrlErrorStatusCode);
        });

        const endpoint = '/everything';
        const params = {};

        // Assert properties of the propagated error
        try {
            await getNewsApiData(endpoint, params);
        } catch (error) {
            const newsApiError = error as NewsApiError;
            expect(newsApiError.message).toBe(getUrlErrorMessage);
            expect(newsApiError.statusCode).toBe(getUrlErrorStatusCode);
            expect(newsApiError.isOperational).toBe(false); // Programming error from getUrl
        }
        expect(mockedGetUrl).toHaveBeenCalledWith(endpoint, params);
        expect(mockFetch).not.toHaveBeenCalled(); // fetch should not be called if getUrl fails
    });

    // Test case 5: Error propagation from getUrl function (e.g., missing endpoint)
    it('should propagate NewsApiError if getUrl throws an error (e.g., missing endpoint)', async () => {
        const getUrlErrorMessage = 'News API endpoint is not provided';
        const getUrlErrorStatusCode = 500;

        // Configure mocked getUrl to throw a NewsApiError for missing endpoint
        mockedGetUrl.mockImplementationOnce(() => {
            throw new NewsApiError(getUrlErrorMessage, false, getUrlErrorStatusCode);
        });

        const endpoint = ''; // Simulate missing endpoint
        const params = {};

        // Assert properties of the propagated error
        try {
            await getNewsApiData(endpoint, params);
        } catch (error) {
            const newsApiError = error as NewsApiError;
            expect(newsApiError.message).toBe(getUrlErrorMessage);
            expect(newsApiError.statusCode).toBe(getUrlErrorStatusCode);
            expect(newsApiError.isOperational).toBe(false); // Programming error from getUrl
        }
        expect(mockedGetUrl).toHaveBeenCalledWith(endpoint, params);
        expect(mockFetch).not.toHaveBeenCalled(); // fetch should not be called if getUrl fails
    });

    // Test case 6: Non-NewsApiError thrown by getUrl (unlikely but good for robustness)
    it('should wrap non-NewsApiError errors from getUrl in a new NewsApiError', async () => {
        const unexpectedError = new Error('Something unexpected happened in getUrl');
        mockedGetUrl.mockImplementationOnce(() => {
            throw unexpectedError;
        });

        const endpoint = '/some-endpoint';
        const params = {};

        try {
            await getNewsApiData(endpoint, params);
        } catch (error) {
            const newsApiError = error as NewsApiError;
            expect(newsApiError.message).toContain('Failed to construct News API URL');
            expect(newsApiError.message).toContain(unexpectedError.message);
            expect(newsApiError.statusCode).toBe(500);
            expect(newsApiError.isOperational).toBe(false);
        }
        expect(mockedGetUrl).toHaveBeenCalled();
        expect(mockFetch).not.toHaveBeenCalled();
    });

    // Test case 7: News API returns an error response that is not valid JSON
    it('should handle non-JSON error responses from News API gracefully', async () => {
        const errorStatusCode = 500;
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: errorStatusCode,
            json: () => Promise.reject(new Error('SyntaxError: Unexpected token < in JSON at position 0')), // Simulate non-JSON response
            text: () => Promise.resolve('<html>Error</html>') // Fallback if needed, though not used here
        });


        const endpoint = '/bad-endpoint';
        const params = {};

        try {
            await getNewsApiData(endpoint, params);
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
