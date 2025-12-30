"use client"

import * as React from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Header() {
    const { t } = useLanguage()
    const [activeSection, setActiveSection] = React.useState("")

    const routes = [
        { href: "#about", label: t.nav.about },
        { href: "#skills", label: t.nav.skills },
        { href: "#contact", label: t.nav.contact },
    ]

    React.useEffect(() => {
        const handleScroll = () => {
            const sections = routes.map(route => route.href.substring(1))
            const scrollPosition = window.scrollY + 100

            // Check if we're at the bottom of the page
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                setActiveSection(sections[sections.length - 1])
                return
            }

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                    setActiveSection(section)
                    break
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [routes])


    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4 md:px-8">
                <Link href="/" className="mr-6 flex items-center space-x-2 font-bold">
                    <span className="text-lg">Alex Lima</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={`transition-colors hover:text-foreground/80 ${activeSection === route.href.substring(1) ? "text-primary" : "text-foreground/60"}`}
                        >
                            {route.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <nav className="flex items-center gap-2">
                        <LanguageToggle />
                        <ModeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                                <div className="flex flex-col gap-4 mt-8">
                                    {routes.map((route) => (
                                        <Link
                                            key={route.href}
                                            href={route.href}
                                            className={`text-lg font-medium transition-colors hover:text-primary ${activeSection === route.href.substring(1) ? "text-primary" : ""}`}
                                        >
                                            {route.label}
                                        </Link>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </nav>
                </div>
            </div>
        </header>
    )
}
