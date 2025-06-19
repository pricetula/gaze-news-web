import React from "react"
import Image from "next/image"
import { PexelsPhoto } from "@/types/pexels"
import { PicListItemLoading } from "./PicListItemLoading"

export function PicListItem({ photo }: { photo: PexelsPhoto }) {
    return (
        <React.Suspense fallback={<PicListItemLoading />}>
            <Image
                key={photo.id}
                width={400}
                height={300}
                src={photo.src.medium}
                blurDataURL={photo.src.tiny}
                alt={photo.photographer}
            />
        </React.Suspense>
    )
}