"use client"

import React from "react";
import { useInfiniteFetchPics } from "@/queries/pics/client-fetch-pics";
import { PicList } from "./PicList";
import { Loader2Icon } from "lucide-react";

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
                fetchNextPage();
            }
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    );

    const photos = React.useMemo(() => {
        if (!data?.pages) return [];
        return data?.pages?.flatMap((page) => page.photos) || [];
    }, [data?.pages]);

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
            <PicList photos={photos} />
            {
                data?.pages && data.pages.length > 0 && (
                    <div ref={loaderRef} className="h-40 w-full" />
                )
            }
            {isFetchingNextPage && (
                <div className="h-24 flex w-full justify-center items-center">
                    <Loader2Icon className="animate-spin" />
                </div>
            )}
        </>
    );
}
