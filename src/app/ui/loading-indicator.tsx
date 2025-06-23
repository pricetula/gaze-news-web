"use client"

import React from "react"
import { useLinkStatus } from "next/link"
import { Loader2Icon } from "lucide-react"

export default function LoadingIndicator() {
    const { pending } = useLinkStatus()
    return pending ? (
        <Loader2Icon className="animate-spin" />
    ) : null
}