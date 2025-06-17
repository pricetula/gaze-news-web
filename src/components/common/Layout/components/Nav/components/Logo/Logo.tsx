"use client"

import React from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

export function Logo() {
    const { theme } = useTheme()
    const [imgSrc, setImgSrc] = React.useState("")

    React.useEffect(() => {
        setImgSrc(
            theme === "dark"
                ? "/logogray.svg"
                : "/logo.svg"
        )
    }, [theme])

    return (
        <a href="/" className="flex items-center gap-1 font-serif font-bold text-xl" aria-label="Gaze News homepage">
            {
                imgSrc ?
                    <Image src={imgSrc} height="24" width="24" alt="Gaze News logo" />
                    : null
            }
            <span>gaze news</span>
        </a>
    )
}