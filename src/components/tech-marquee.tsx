"use client"

import { useLanguage } from "@/components/language-provider"
import { useMotion } from "@/components/motion-provider"
import { SectionLabel, EditorialTitle, Asterisk } from "@/components/editorial"
import { portfolioCopy } from "@/lib/portfolio-copy"

const technologies = ["Next.js", "React", "TypeScript", ".NET", "SQL", "Cloud"]

export function TechMarquee() {
    const { language } = useLanguage()
    const { enabled } = useMotion()
    const copy = portfolioCopy[language]
    return (
        <section id="skills" className={"stack-section section-space " + (enabled ? "" : "motion-paused")}>
            <div className="page-shell"><SectionLabel index="06">{copy.stackLabel}</SectionLabel><EditorialTitle>{copy.stackTitle}</EditorialTitle></div>
            <div className="stack-marquee"><div className="stack-track" data-marquee>{[0, 1].map(clone => <div className="stack-group" key={clone} aria-hidden={clone === 1}>{technologies.map(technology => <span className="stack-word" key={technology}>{technology}<Asterisk /></span>)}</div>)}</div></div>
        </section>
    )
}
