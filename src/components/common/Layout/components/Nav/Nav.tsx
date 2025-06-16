import Image from "next/image"

export function Nav() {
    return (
        <nav
            className="px-8 h-[50px] flex justify-between items-center"
            aria-label="Main navigation"
        >
            {/* Site name and logo */}
            <a href="/" className="flex items-center font-serif font-bold text-xl" aria-label="Gaze News homepage">
                <span
                    className="h-8 w-4 bg-pink-300 flex items-center justify-center"
                    aria-hidden="true"
                >
                    g
                </span>
                <span className="ml-.5">aze news</span>
            </a>

            {/* Navigation links */}
            <ul className="flex gap-4">
                <li>
                    <a
                        href="/trends"
                        className="text-sm font-medium hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                    >
                        Trends
                    </a>
                </li>
                <li>
                    <a
                        href="/war"
                        className="text-sm font-medium hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                    >
                        War
                    </a>
                </li>
                <li>
                    <a
                        href="/politics"
                        className="text-sm font-medium hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                    >
                        Politics
                    </a>
                </li>
                <li>
                    <a
                        href="/sports"
                        className="text-sm font-medium hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                    >
                        Sports
                    </a>
                </li>
            </ul>
        </nav>

    )
}