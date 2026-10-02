"use client"

import { useLanguage } from "@/components/language-provider"
import { SectionLabel, EditorialTitle } from "@/components/editorial"
import { portfolioCopy } from "@/lib/portfolio-copy"

export function Testimonials() {
    const { t, language } = useLanguage()
    const copy = portfolioCopy[language]
    return (
        <section className="testimonials-section page-shell section-space" id="testimonials">
            <SectionLabel index="05">{copy.feedbackLabel}</SectionLabel>
            <EditorialTitle>{copy.feedbackTitle}</EditorialTitle>
            <div className="testimonials-grid">{t.testimonials.items.map((item, index) => <figure className="testimonial" data-reveal key={item.name}><div className="testimonial-top"><span className="eyebrow">{item.service}</span><span className="quote-mark" aria-hidden="true">“</span></div><blockquote>{item.quote}</blockquote><figcaption><span className="testimonial-initials" aria-hidden="true">{item.name.split(" ").filter(Boolean).slice(0, 2).map(name => name[0]).join("")}</span><div><strong>{item.name}</strong><span>{item.company}</span></div><span className="testimonial-number" aria-hidden="true">{"0" + (index + 1)}</span></figcaption></figure>)}</div>
        </section>
    )
}
