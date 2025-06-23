import React from "react"
import Image from "next/image"
import { PexelsPhoto } from "@/types/pexels"
import { extractDimensionsFromPexelsUrl } from "./utils"

export function PicListItem({ photo }: { photo: PexelsPhoto }) {
    const dimensions = extractDimensionsFromPexelsUrl(photo.src.medium)
    return (
        <Image
            key={photo.id}
            width={dimensions.width}
            height={dimensions.height}
            src={photo.src.medium}
            blurDataURL={photo.blurDataURL}
            alt={photo.photographer}
            loading="lazy"
            placeholder="blur"
        />
    )
}