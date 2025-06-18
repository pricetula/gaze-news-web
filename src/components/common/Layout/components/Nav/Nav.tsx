import { Logo } from "./components/Logo"
import { Links } from "./components/Links"

export function Nav() {
    return (
        <nav
            className="px-8 h-[50px] flex justify-between items-center"
            aria-label="Main navigation"
        >
            <Logo />

            <Links />
        </nav>
    )
}