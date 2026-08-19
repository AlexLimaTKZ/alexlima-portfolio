"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Github, Linkedin } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { SITE_CONFIG } from "@/lib/constants"

export function Header() {
    const { t } = useLanguage()
    const { resolvedTheme } = useTheme()
    const [activeSection, setActiveSection] = React.useState("")
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

    const routes = React.useMemo(() => [
        { href: "#services", label: t.services?.title || "Services" },
        { href: "#projects", label: t.nav.projects },
        { href: "#about", label: t.nav.about },
        { href: "#contact", label: t.nav.contact },
    ], [t.services?.title, t.nav.projects, t.nav.about, t.nav.contact])

    React.useEffect(() => {
        setMounted(true)
    }, [])

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)

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
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [routes])

    const headerStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        width: '100%',
        height: '56px',
        maxHeight: '56px',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        borderBottom: !mounted
            ? '1px solid rgba(0, 0, 0, 0.06)'
            : (resolvedTheme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)'),
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        backgroundColor: !mounted
            ? 'rgba(255, 255, 255, 0.25)'
            : (resolvedTheme === 'dark'
                ? (isScrolled ? 'rgba(15, 23, 42, 0.45)' : 'rgba(15, 23, 42, 0.15)')
                : (isScrolled ? 'rgba(255, 255, 255, 0.55)' : 'rgba(255, 255, 255, 0.25)')),
        boxShadow: !mounted
            ? '0 4px 20px rgba(0, 0, 0, 0.03)'
            : (resolvedTheme === 'dark'
                ? `${isScrolled ? '0 8px 30px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.15)'}, inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`
                : (isScrolled ? '0 8px 30px rgba(0, 0, 0, 0.08)' : '0 4px 20px rgba(0, 0, 0, 0.03)'))
    }

    return (
        <header style={headerStyle}>
            <div className="container flex h-full max-w-screen-2xl items-center mx-auto px-4 md:px-8">
                <Link href="/" className="mr-6 flex items-center space-x-2 font-bold select-none shrink-0">
                    <span className="text-lg bg-gradient-to-r from-foreground to-foreground/85 bg-clip-text text-transparent hover:text-cyan-400 transition-colors duration-300">
                        {SITE_CONFIG.name}
                    </span>
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={`transition-colors hover:text-foreground/80 ${activeSection === route.href.substring(1) ? "text-[#38bdf8] font-semibold" : "text-foreground/60"}`}
                        >
                            {route.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <nav className="flex items-center gap-2">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            asChild 
                            className="hidden sm:flex text-foreground/60 hover:text-cyan-400 hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100 hover:-translate-y-[2px] transition-all duration-300 cursor-pointer h-9 w-9"
                        >
                            <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </a>
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            asChild 
                            className="hidden sm:flex text-foreground/60 hover:text-cyan-400 hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100 hover:-translate-y-[2px] transition-all duration-300 mr-1 cursor-pointer h-9 w-9"
                        >
                            <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-4 w-4" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </Button>
                        <div className="opacity-80 hover:opacity-100 hover:-translate-y-[2px] transition-all duration-300">
                            <LanguageToggle />
                        </div>
                        <div className="opacity-80 hover:opacity-100 hover:-translate-y-[2px] transition-all duration-300">
                            <ModeToggle />
                        </div>
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden opacity-80 hover:opacity-100 transition-opacity">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent 
                                side="right" 
                                className="border-l border-black/10 dark:border-white/10"
                                style={{
                                    backgroundColor: !mounted 
                                        ? 'rgba(255, 255, 255, 0.75)'
                                        : (resolvedTheme === 'dark' ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.75)'),
                                    borderColor: !mounted
                                        ? 'rgba(0, 0, 0, 0.06)'
                                        : (resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'),
                                    backdropFilter: 'blur(20px) saturate(160%)',
                                    WebkitBackdropFilter: 'blur(20px) saturate(160%)',
                                    boxShadow: !mounted
                                        ? '0 12px 40px rgba(0, 0, 0, 0.15)'
                                        : (resolvedTheme === 'dark' 
                                            ? '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
                                            : '0 12px 40px rgba(0, 0, 0, 0.15)'),
                                }}
                            >
                                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                                <div className="flex flex-col gap-4 mt-8">
                                    {routes.map((route) => (
                                        <Link
                                            key={route.href}
                                            href={route.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`text-lg font-medium transition-colors hover:text-[#38bdf8] ${activeSection === route.href.substring(1) ? "text-[#38bdf8] font-semibold" : ""}`}
                                        >
                                            {route.label}
                                        </Link>
                                    ))}
                                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-black/10 dark:border-white/10">
                                        <a 
                                            href={SITE_CONFIG.social.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-foreground/60 hover:text-cyan-400 transition-all duration-300 opacity-80 hover:opacity-100 hover:-translate-y-[2px]"
                                        >
                                            <Github className="h-5 w-5" />
                                            <span className="sr-only">GitHub</span>
                                        </a>
                                        <a 
                                            href={SITE_CONFIG.social.linkedin} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-foreground/60 hover:text-cyan-400 transition-all duration-300 opacity-80 hover:opacity-100 hover:-translate-y-[2px]"
                                        >
                                            <Linkedin className="h-5 w-5" />
                                            <span className="sr-only">LinkedIn</span>
                                        </a>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </nav>
                </div>
            </div>
        </header>
    )
}
