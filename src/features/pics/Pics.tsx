"use client"

import React from "react";
import { useInfiniteFetchPics } from "@/queries/pics/client-fetch-pics";
import { Pic } from "./Pic";

export function Pics() {
    const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteFetchPics();

    if (isLoading) return <p>Loading photos...</p>;
    if (error) return <p>Error loading photos.</p>;

    const loaderRef = React.useRef<HTMLDivElement | null>(null);

    const handleObserver = React.useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    );

    React.useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "200px",
            threshold: 0,
        });

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [handleObserver]);

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
                {data?.pages?.flatMap((page) => page.photos)?.map(photo => (
                    <Pic key={photo.id} photo={photo} />
                ))}

            </div>

            <div ref={loaderRef} className="h-10 w-full bg-red-500" />

            {isFetchingNextPage && (
                <p className="text-center mt-4 text-muted-foreground text-sm">
                    Loading more photos...
                </p>
            )}
        </>
    );
}
