// src/stores/themeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type DarkOrLight = 'dark' | 'light'

interface ThemeState {
    theme: DarkOrLight
    setTheme(theme: DarkOrLight): void
}

const THEME_STORAGE_KEY = 'theme-storage'

export const useThemeStore = create(
    persist<ThemeState>(
        (set) => ({
            theme: 'light',
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: THEME_STORAGE_KEY, // localStorage key
        }
    )
)
