"use client"

import React, { useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { LOCAL_STORAGE } from "@/lib/constants"

export function ToggleDarkMode() {
    useEffect(() => {
        console.log(
            "LOCAL_STORAGE.DARK_THEME_KEY",
            localStorage.getItem(LOCAL_STORAGE.DARK_THEME_KEY)
        )
    }, [])

    return (
        <ToggleGroup type="single" size="sm">
            <ToggleGroupItem
                value="bold"
                aria-label="Toggle bold"
                onClick={() => {
                    localStorage.setItem(
                        LOCAL_STORAGE.DARK_THEME_KEY,
                        "true"
                    )
                }}
            >
                <Moon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
                value="strikethrough"
                aria-label="Toggle strikethrough"
                onClick={() => {
                    localStorage.setItem(
                        LOCAL_STORAGE.DARK_THEME_KEY,
                        "false"
                    )
                }}
            >
                <Sun className="h-4 w-4" />
            </ToggleGroupItem>
        </ToggleGroup>
    )
}