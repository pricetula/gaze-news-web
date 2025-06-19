import React from "react";
import { PicListItem } from "./PicListItem"
import { PexelsPhoto } from "@/types/pexels";

/**
 * Pics component that fetches and displays photos using TanStack Query's infinite query.
 *
 * @returns {JSX.Element} - The Pics component.
 */
export function PicList({ photos }: { photos: PexelsPhoto[] }) {
    return (
        <ul className="min-h-screen columns-2 md:columns-4 gap-4 space-y-4">
            {photos.map((photo) => (
                <li key={photo.id}>
                    <PicListItem
                        key={photo.id}
                        photo={photo}
                    />
                </li>
            ))}
        </ul>
    );
}
