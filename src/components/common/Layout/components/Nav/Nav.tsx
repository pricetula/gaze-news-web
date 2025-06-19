import { Logo } from "./components/Logo"
import { Links } from "./components/Links"

export function Nav() {
    return (
        <nav
            className="w-full flex justify-center"
            aria-label="Main navigation"
        >
            <div className="px-8 h-[50px] w-full max-w-[1000px] flex justify-between items-center">
                <Logo />
                <Links />
            </div>
        </nav>
    )
}