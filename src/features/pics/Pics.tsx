"use client"

import React from "react";
import Image from "next/image";
import { useInfiniteFetchPics } from "@/queries/pics/client-fetch-pics";

/**
 * Pics component that fetches and displays photos using TanStack Query's infinite query.
 *
 * @returns {JSX.Element} - The Pics component.
 */
export function Pics() {
    const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteFetchPics();

    const loaderRef = React.useRef<HTMLDivElement | null>(null);

    const handleObserver = React.useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                console.log("fetching next page");
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

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [handleObserver]);

    if (isLoading) return <p>Loading photos...</p>;
    if (error) return <p>Error loading photos.</p>;

    return (
        <>
            <div className="min-h-screen columns-2 md:columns-4 gap-4 space-y-4">
                {data?.pages?.flatMap((page) => page.photos)?.map((photo, index) => (
                    <Image
                        key={photo.id}
                        width={400}
                        height={300}
                        src={photo.src.medium}
                        blurDataURL={photo.src.tiny}
                        alt={photo.photographer}
                    />
                ))}
            </div>
            {
                data?.pages && data.pages.length > 0 && (
                    <div ref={loaderRef} className="h-40 w-full" />
                )
            }
            {isFetchingNextPage && (
                <p className="text-center mt-4 text-muted-foreground text-sm">
                    Loading more photos...
                </p>
            )}
        </>
    );
}
