import { PexelsResponse } from "@/types/pexels"
import React from "react"
import { PicList } from "./PicList";

export function Pics({ picsResponse }: { picsResponse: PexelsResponse }) {
    console.log(picsResponse)
    return (
        <>
            <PicList photos={picsResponse.photos} />
            {/* {
                data?.pages && data.pages.length > 0 && (
                    <div ref={loaderRef} className="h-40 w-full" />
                )
            }
            {isFetchingNextPage && (
                <div className="h-24 flex w-full justify-center items-center">
                    <Loader2Icon className="animate-spin" />
                </div>
            )} */}
        </>
    );
}