"use client"

import Image from "next/image"
import { useRef } from "react"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { MagneticLink } from "@/components/editorial"
import { InteractiveMonogram } from "@/components/interactive-monogram"
import { SmokeHeading } from "@/components/smoke-heading"
import { SITE_CONFIG } from "@/lib/constants"
import { portfolioCopy } from "@/lib/portfolio-copy"

export function Hero() {
    const plane = useRef<HTMLDivElement>(null)
    const { language, t } = useLanguage()
    const copy = portfolioCopy[language]
    const whatsapp = SITE_CONFIG.contact.whatsappUrl + "?text=" + encodeURIComponent(t.hero.whatsappMessage)
    return (
        <section id="home" className="hero-section page-shell">
            <div className="hero-shock-plane" ref={plane}>
            <div className="hero-eyebrow" data-hero-enter>
                <span>{copy.discipline}</span>
                <span className="availability"><span className="status-dot" />{copy.availability}</span>
            </div>
            <div className="hero-heading-wrap">
                <SmokeHeading key={language} />
                <InteractiveMonogram plane={plane} />
            </div>
            <div className="hero-bottom">
                <div className="hero-positioning" data-hero-enter>
                    <span className="eyebrow">{copy.clientFocus}</span>
                    <p>{copy.heroNote}</p>
                    <a href="#projects" className="text-link">{copy.viewWork}<ArrowDown size={16} aria-hidden="true" /></a>
                </div>
                <div className="hero-description" data-hero-enter>
                    <p>{copy.heroDescription}</p>
                    <MagneticLink href={whatsapp} target="_blank" rel="noopener noreferrer" className="button-filled">{copy.start}</MagneticLink>
                </div>
            </div>
            <div className="hero-project-peek" data-hero-enter>
                <a href="#projects" className="peek-image" aria-label={copy.viewWork}>
                    <Image src="/cmc.png" alt="" fill sizes="180px" className="object-cover" priority />
                    <span className="peek-arrow"><ArrowUpRight aria-hidden="true" size={18} /></span>
                </a>
                <div><span className="eyebrow">CMC FOTOS E ARTES · 2026</span><span>{copy.projectKinds[1]}</span></div>
                <a className="hero-scroll" href="#projects"><span>{copy.scroll}</span><ArrowDown aria-hidden="true" size={18} /></a>
            </div>
            </div>
        </section>
    )
}
