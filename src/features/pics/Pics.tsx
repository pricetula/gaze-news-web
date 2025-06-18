"use client"

import { useClientFetchPics } from "@/queries/pics/client-fetch-pics";
import { Pic } from "./Pic";

export function Pics() {
    const { data, isLoading, error } = useClientFetchPics();

    if (isLoading) return <p>Loading photos...</p>;
    if (error) return <p>Error loading photos.</p>;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
            {data?.photos.map(photo => (
                <Pic key={photo.id} photo={photo} />
            ))}
        </div>
    );
}
