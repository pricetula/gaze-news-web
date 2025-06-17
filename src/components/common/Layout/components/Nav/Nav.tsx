import { ToggleDarkMode } from "./components/ToggleDarkMode"
import { Logo } from "./components/Logo"

export function Nav() {
    return (
        <nav
            className="px-8 h-[50px] flex justify-between items-center"
            aria-label="Main navigation"
        >
            <Logo />

            <div className="flex items-center gap-12">
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
                <ToggleDarkMode />
            </div>
        </nav>

    )
}