import {
    Rss,
    Aperture,
    Landmark,
    Newspaper,
} from "lucide-react"
import Link from "next/link";

const links = [
    {
        label: 'Pics',
        href: '/pics',
        link: Aperture,
    },
    {
        label: 'News',
        href: '/news',
        link: Rss,
    },
    {
        label: 'US gov',
        href: '/data-us',
        link: Landmark,
    },
    {
        label: 'Reddit',
        href: '/reddit-science',
        link: Newspaper,
    }
]

export default function Home() {
    return (
        <article className="flex items-center justify-center h-full">
            <ul className="grid grid-cols-1 md:grid-cols-4">
                {
                    links.map(
                        (link) => (
                            <li key={link.label}>
                                <Link href={link.href} className="flex flex-col items-center justify-center gap-4 p-10 hover:bg-purple-400">
                                    <span>{link.label}</span>
                                    <link.link className="h-6 w-6" />
                                </Link>
                            </li>
                        )
                    )
                }
            </ul>
        </article>
    );
}
