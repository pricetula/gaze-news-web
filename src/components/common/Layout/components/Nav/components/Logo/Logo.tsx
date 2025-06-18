"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
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
        <Link href="/" className="flex items-center gap-1 font-serif font-bold text-xl" aria-label="Gaze News homepage">
            {
                imgSrc ?
                    <Image src={imgSrc} height="24" width="24" alt="Gaze News logo" />
                    : null
            }
            <span>gaze</span>
        </Link>
    )
}