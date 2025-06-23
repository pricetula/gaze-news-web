export function extractDimensionsFromPexelsUrl(url: string, defaultWidth: number = 400, defaultHeight: number = 300) {
    try {
        const urlObj = new URL(url);
        const params = urlObj.searchParams;

        const width = params.get('w');
        const height = params.get('h');

        return {
            width: width ? Number(width) : defaultWidth,
            height: height ? Number(height) : defaultHeight
        };
    } catch (error) {
        return { width: 0, height: 0 };
    }
}