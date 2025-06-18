import React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { ToggleDarkMode } from "../ToggleDarkMode"

const links = [
    {
        label: 'Pics',
        href: '/pics'
    },
    {
        label: 'News',
        href: '/news'
    },
    {
        label: 'US gov',
        href: '/data-us'
    },
    {
        label: 'Reddit',
        href: '/reddit-science'
    }
]

export function Links() {
    return (
        <>
            <div className="hidden md:flex items-center gap-12">
                <NavigationMenu>
                    <NavigationMenuList className="space-x-2">
                        {
                            links.map(
                                (link) => (
                                    <NavigationMenuItem key={link.label}>
                                        <Link href={link.href} className="hover:underline">
                                            {link.label}
                                        </Link>
                                    </NavigationMenuItem>
                                )
                            )
                        }
                    </NavigationMenuList>
                </NavigationMenu>
                <ToggleDarkMode />
            </div>
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle />
                            <SheetDescription />
                        </SheetHeader>
                        <div className="px-4 mt-4 space-y-4">
                            {
                                links.map(
                                    (link) => (
                                        <Link key={link.label} href={link.href} className="block">
                                            {link.label}
                                        </Link>
                                    )
                                )
                            }
                        </div>
                        <SheetFooter>
                            <ToggleDarkMode />
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}