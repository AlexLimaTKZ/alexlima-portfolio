"use client"

import { useRef, useState } from "react"
import { ArrowUpRight, Menu, Pause, Play } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"
import { useMotion } from "@/components/motion-provider"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { gsap, useGSAP } from "@/lib/gsap"
import { SITE_CONFIG } from "@/lib/constants"
import { portfolioCopy } from "@/lib/portfolio-copy"

export function Header() {
    const { language, t } = useLanguage()
    const copy = portfolioCopy[language]
    const { enabled, toggle } = useMotion()
    const [open, setOpen] = useState(false)
    const header = useRef<HTMLElement>(null)
    const menu = useRef<HTMLDivElement>(null)
    const { contextSafe } = useGSAP({ scope: header })
    const routes = [
        { href: "#projects", label: t.nav.projects },
        { href: "#services", label: t.services.title },
        { href: "#about", label: t.nav.about },
        { href: "#contact", label: t.nav.contact },
    ]
    const animateMenu = () => contextSafe(() => {
        if (enabled && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
            gsap.from(menu.current?.querySelectorAll(".menu-link") ?? [], { y: 32, opacity: 0, duration: 0.7, stagger: 0.09, ease: "power3.out" })
        }
    })()
    return (
        <header className="site-header" ref={header}>
            <a href="#home" className="brand" aria-label="Alex Lima — Home"><span className="brand-symbol" aria-hidden="true">a<span>l</span><span className="brand-dot" /></span><span className="brand-name">Alex Lima<span>Design & Code</span></span></a>
            <nav className="desktop-nav" aria-label={copy.navLabel}>{routes.map(route => <a key={route.href} href={route.href} className="nav-link">{route.label}</a>)}</nav>
            <div className="header-actions">
                <LanguageToggle /><ModeToggle />
                <button type="button" onClick={toggle} className="header-control motion-toggle" aria-label={enabled ? copy.pause : copy.resume} aria-pressed={enabled} title={enabled ? copy.pause : copy.resume}>{enabled ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}</button>
                <a href="#contact" className="header-contact">{t.nav.contact}<ArrowUpRight size={16} aria-hidden="true" /></a>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild><button type="button" className="header-control mobile-menu-trigger" aria-label={copy.openMenu}><Menu size={21} /></button></SheetTrigger>
                    <SheetContent className="menu-panel w-full sm:max-w-xl" onOpenAutoFocus={animateMenu}>
                        <SheetTitle className="menu-heading">{copy.navLabel}</SheetTitle><SheetDescription>{copy.clientFocus}</SheetDescription>
                        <nav ref={menu} className="mobile-nav" aria-label={copy.navLabel}>{routes.map((route, index) => <a key={route.href} className="menu-link" href={route.href} onClick={() => setOpen(false)}><span>{"0" + (index + 1)}</span>{route.label}<ArrowUpRight size={30} aria-hidden="true" /></a>)}</nav>
                        <div className="menu-footer"><a href={"mailto:" + SITE_CONFIG.contact.email}>{SITE_CONFIG.contact.email}</a><span>{copy.discipline}</span></div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
