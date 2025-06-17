"use client"

import React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function ToggleDarkMode() {
    const { setTheme } = useTheme()

    return (
        <ToggleGroup type="single" size="sm">
            <ToggleGroupItem
                value="bold"
                aria-label="Toggle bold"
                onClick={() => {
                    setTheme('dark')
                }}
            >
                <Moon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
                value="strikethrough"
                aria-label="Toggle strikethrough"
                onClick={() => {
                    setTheme('light')
                }}
            >
                <Sun className="h-4 w-4" />
            </ToggleGroupItem>
        </ToggleGroup>
    )
}