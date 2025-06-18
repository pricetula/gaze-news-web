import type { PexelsPhoto } from "@/types/pexels";

export function Pic({ photo }: { photo: PexelsPhoto }) {
    return (
        <div className="rounded overflow-hidden shadow-md">
            <img
                src={photo.src.medium}
                alt={photo.photographer}
                className="w-full h-auto object-cover"
            />
            <div className="p-2 text-sm text-gray-600 dark:text-gray-300">
                📸 {photo.photographer}
            </div>
        </div>
    );
}
