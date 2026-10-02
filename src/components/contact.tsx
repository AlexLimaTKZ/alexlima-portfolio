"use client"

import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { SectionLabel, MagneticLink, Asterisk } from "@/components/editorial"
import { SITE_CONFIG } from "@/lib/constants"
import { portfolioCopy } from "@/lib/portfolio-copy"

export function Contact() {
    const { language, t } = useLanguage()
    const copy = portfolioCopy[language]
    return (
        <section id="contact" className="contact-section page-shell section-space">
            <SectionLabel index="07">{copy.contactLabel}</SectionLabel>
            <div className="contact-heading"><h2 className="contact-title" data-line-title aria-label={copy.contactLines.join(" ")}>{copy.contactLines.map((line, index) => <span className={"word-mask " + (index ? "contact-serif" : "")} key={line} aria-hidden="true"><span data-title-word>{line}</span></span>)}</h2><div className="contact-star" data-spin><Asterisk /></div></div>
            <div className="contact-bottom"><div className="contact-description" data-reveal><p>{copy.contactDescription}</p><span className="availability"><span className="status-dot" />{copy.availability}</span></div><div className="contact-actions" data-reveal><MagneticLink className="button-dark" href={SITE_CONFIG.contact.whatsappUrl + "?text=" + encodeURIComponent(t.hero.whatsappMessage)} target="_blank" rel="noopener noreferrer">{copy.whatsapp}</MagneticLink><span className="eyebrow">{copy.email}</span><a className="contact-email" href={"mailto:" + SITE_CONFIG.contact.email}>{SITE_CONFIG.contact.email}<ArrowUpRight size={22} aria-hidden="true" /></a></div></div>
        </section>
    )
}
