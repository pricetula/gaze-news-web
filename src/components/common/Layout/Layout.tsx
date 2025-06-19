import React from "react"
import { Toaster } from "@/components/ui/sonner"
import { Nav } from "./components/Nav/Nav";

interface LayoutProps {
    children: React.ReactNode;
}


export function Layout({ children }: LayoutProps) {
    return (
        <>
            <Nav />
            <section className="px-8 h-[calc(100vh-50px-50px)] overflow-y-auto">
                {children}
            </section>
            <footer className="px-8 h-[50px]" />
            <Toaster />
        </>
    )
}