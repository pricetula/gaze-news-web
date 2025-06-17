/**
 * @fileoverview Defines a custom error class for handling News API-related errors.
 * This class extends the built-in JavaScript `Error` class, adding specific
 * properties relevant to API responses, such as `statusCode` and `isOperational`.
 */

/**
 * Custom error class for handling errors specific to News API interactions.
 * Extends the native `Error` class to provide a structured way to report
 * issues like invalid requests, network problems, or server-side errors.
 *
 * @augments {Error}
 */
export class NewsApiError extends Error {
    /**
     * Creates an instance of NewsApiError.
     *
     * @param {string} message - A human-readable message describing the error.
     * This message will also be passed to the base `Error` class.
     * @param {number} [statusCode=500] - The HTTP status code associated with the error.
     * Defaults to 500 (Internal Server Error) if not provided.
     * @param {boolean} [isOperational=true] - A flag indicating if the error is "operational".
     * Operational errors are expected (e.g., bad user input,
     * resource not found) and can be handled gracefully.
     * Defaults to true. Programming errors (bugs) would be false.
     */
    constructor(
        message: string,
        isOperational: boolean = true,
        statusCode: number = 500,
    ) {
        // Call the parent Error class constructor with the error message.
        super(message);

        // set values passed from constructor
        this.message = message;
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        // Set the prototype explicitly to ensure correct `instanceof` checks
        // when extending built-in classes like Error, especially in older environments.
        Object.setPrototypeOf(this, new.target.prototype);

        // Capture the stack trace. This is a V8-specific (Node.js) feature
        // that cleans up the stack trace by excluding the constructor call itself,
        // making the trace more useful for debugging.
        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * The human-readable message describing the error.
     * @type {string}
     * @readonly
     */
    public readonly message: string;

    /**
     * The HTTP status code associated with the error (e.g., 400, 404, 500).
     * @type {number}
     * @readonly
     */
    public readonly statusCode: number;

    /**
     * A boolean flag indicating if the error is an "operational" error.
     * Operational errors are expected and handleable (e.g., invalid input),
     * whereas `false` typically indicates a programming bug.
     * @type {boolean}
     * @readonly
     */
    public readonly isOperational: boolean;
}
