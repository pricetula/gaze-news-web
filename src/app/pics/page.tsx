import { getPlaiceholder } from "plaiceholder";
import { Pics } from "@/features/pics/Pics";
import { getPics } from "@/queries/pics/get-pics";

export default async function Page() {
    const picsResponse = await getPics(1)
    if (picsResponse?.photos && picsResponse.photos.length > 0) {
        for (const photo of picsResponse.photos) {
            // Fetch the image first
            const response = await fetch(photo.src.tiny);
            if (!response.ok) throw new Error('Failed to fetch image');

            const buffer = await response.arrayBuffer();

            // Pass buffer to plaiceholder
            const { base64 } = await getPlaiceholder(Buffer.from(buffer));
            photo.blurDataURL = base64;
        }
    }
    return (
        <Pics picsResponse={picsResponse} />
    )
}