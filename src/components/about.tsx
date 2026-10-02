"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { SectionLabel, EditorialTitle } from "@/components/editorial"
import { SITE_CONFIG } from "@/lib/constants"
import { portfolioCopy } from "@/lib/portfolio-copy"
import { ScrollTrigger } from "@/lib/gsap"

export function About() {
    const { t, language } = useLanguage()
    const copy = portfolioCopy[language]
    const stats = [
        { value: SITE_CONFIG.stats.yearsExperience, label: t.about.statsYears },
        { value: SITE_CONFIG.stats.projectsDelivered, label: t.about.statsProjects },
        { value: SITE_CONFIG.stats.technologies, label: t.about.statsTechs },
    ]
    return (
        <section id="about" className="about-section">
            <div className="page-shell section-space">
                <SectionLabel index="03">{copy.aboutLabel}</SectionLabel>
                <div className="about-grid">
                    <div className="portrait-column" data-reveal><div className="portrait-wrap"><Image src="/alexlima.png" alt={copy.portraitAlt} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" data-parallax /></div><div className="portrait-caption"><span>ALEX LIMA</span><span>FULL STACK · TKZ DEV</span></div></div>
                    <div className="about-content"><EditorialTitle>{copy.aboutTitle}</EditorialTitle><p className="about-intro" data-reveal>{copy.aboutIntro}</p><p data-reveal>{copy.aboutBody}</p><p data-reveal>{copy.aboutExtra}</p>
                        <div className="about-stats">{stats.map(stat => <div key={stat.label} data-reveal><span className="stat-number" aria-hidden="true"><span data-count={stat.value}>{stat.value}</span>+</span><span className="sr-only">{stat.value}+</span><span className="stat-label">{stat.label}</span></div>)}</div>
                        <details className="experience-details" onToggle={() => ScrollTrigger.refresh()}><summary>{copy.experience}<Plus aria-hidden="true" size={18} /></summary><div>{t.about.experiences.map(experience => <article key={experience.title}><span className="eyebrow">{experience.year} · {experience.company}</span><h3>{experience.title}</h3><p>{experience.description}</p></article>)}</div></details>
                    </div>
                </div>
            </div>
            <div className="process-section page-shell section-space">
                <div className="process-heading"><SectionLabel index="04">{copy.processLabel}</SectionLabel><EditorialTitle>{copy.processTitle}</EditorialTitle><span className="process-signature" aria-hidden="true">Alex Lima</span></div>
                <ol className="process-list">{t.process.steps.map((step, index) => <li key={step.title} data-reveal><span className="process-number">{"0" + (index + 1)}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
            </div>
        </section>
    )
}
