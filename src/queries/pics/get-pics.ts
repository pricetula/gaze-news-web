import { PexelsResponse } from "@/types/pexels";

/**
 * Fetches curated photos from the Pexels API for a specific page number.
 *
 * @param {number} page - The page number to fetch.
 * @returns {Promise<PexelsResponse>} - A promise that resolves to the curated photos response.
 * @throws {Error} If the request fails or the response is not OK.
 *
 * @example
 * getPics(1)
 *   .then(data => console.log(data.photos))
 *   .catch(err => console.error(err));
 */
export async function getPics(page: number): Promise<PexelsResponse> {
    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=15&page=${page}`, {
        headers: {
            Authorization: process.env.PEXELS_API_KEY || '',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch photos: ${response.status} ${response.statusText}`);
    }

    const data: PexelsResponse = await response.json();
    return data;
}
