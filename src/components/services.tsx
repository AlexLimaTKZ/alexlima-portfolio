"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { SectionLabel, EditorialTitle, ReadingText, Asterisk } from "@/components/editorial"
import { SITE_CONFIG } from "@/lib/constants"
import { portfolioCopy } from "@/lib/portfolio-copy"

const photos = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=82",
]

export function Services() {
    const { language, t } = useLanguage()
    const copy = portfolioCopy[language]
    return (
        <section id="services" className="services-section section-space page-shell">
            <SectionLabel index="02">{copy.solutions}</SectionLabel>
            <div className="section-heading"><EditorialTitle>{copy.servicesTitle}</EditorialTitle><p data-reveal>{copy.servicesDescription}</p></div>
            <div className="services-grid">
                {t.services.items.map((service, index) => (
                    <article className="service-card" data-reveal key={service.title}>
                        <div className="service-photo"><Image src={photos[index]} alt="" fill unoptimized sizes="(min-width: 1200px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" data-parallax /><span className="service-number">{"0" + (index + 1)}</span></div>
                        <div className="service-content"><h3>{service.title}</h3><p>{service.description}</p><div className="service-outcome"><span>{copy.serviceResults[index]}</span><a href={SITE_CONFIG.contact.whatsappUrl + "?text=" + encodeURIComponent(t.hero.whatsappMessage + " " + service.title)} target="_blank" rel="noopener noreferrer" aria-label={copy.start + ": " + service.title}><ArrowUpRight size={21} aria-hidden="true" /></a></div></div>
                    </article>
                ))}
            </div>
            <div className="statement-block"><div className="statement-symbol" data-spin><Asterisk /></div><ReadingText>{copy.statement}</ReadingText><span className="statement-footnote">ALEX LIMA · DESIGN & CODE</span></div>
        </section>
    )
}
