"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useMotion } from "@/components/motion-provider"
import { useSmoothScroll } from "@/components/lenis-provider"
import { SectionLabel, EditorialTitle } from "@/components/editorial"
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap"
import { portfolioCopy } from "@/lib/portfolio-copy"

const projects = [
    { id: "tkzjobs", category: "systems", image: "/tkzjobs.png", demo: "https://tkz-jobsdev.vercel.app/", tone: "mint", tags: ["Next.js", "TypeScript", "Job board"] },
    { id: "cmc", category: "websites", image: "/cmc.png", demo: "https://cmcfotoseartes.com.br/", tone: "lavender", tags: ["Next.js", "E-commerce", "UX/UI"] },
    { id: "adriana", category: "websites", image: "/adriana.png", demo: "https://www.adrianacarvalhoadv.com.br/", tone: "sand", tags: ["Next.js", "SEO", "Lead generation"] },
    { id: "se7ego", category: "systems", image: "/se7ego.png", demo: "https://www.se7ealuminio.com.br/go", tone: "sage", tags: ["Next.js", "SaaS", "Dashboard"] },
] as const

type Filter = "all" | "websites" | "systems"

export function Projects() {
    const { t, language } = useLanguage()
    const { enabled } = useMotion()
    const copy = portfolioCopy[language]
    const [filter, setFilter] = useState<Filter>("all")
    const root = useRef<HTMLElement>(null)
    const stageRef = useRef<HTMLDivElement>(null)
    const scrollTo = useSmoothScroll()
    const visible = projects.map((project, index) => ({ ...project, index })).filter(project => filter === "all" || project.category === filter)

    useGSAP(() => {
        const stage = stageRef.current
        if (!stage || !enabled) return
        const media = gsap.matchMedia()
        media.add("(min-width: 1024px) and (min-height: 850px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
            const track = stage.querySelector<HTMLElement>(".work-track")!
            const viewport = stage.querySelector<HTMLElement>(".work-viewport")!
            const cards = gsap.utils.toArray<HTMLElement>(".work-panel", stage)
            stage.classList.add("is-horizontal")
            // Keep the full image, caption and controls visible on shorter screens.
            if (stage.offsetHeight > window.innerHeight - 110) {
                stage.classList.remove("is-horizontal")
                return
            }
            const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
            if (distance() <= 0) return () => stage.classList.remove("is-horizontal")
            const progress = stage.querySelector("[data-work-progress]")
            const number = stage.querySelector("[data-work-current]")
            const setProgress = gsap.quickSetter(progress, "scaleX")
            gsap.to(track, {
                x: () => -distance(), ease: "none",
                scrollTrigger: {
                    id: "work-gallery", trigger: stage, start: "top 96px", end: () => "+=" + distance(),
                    pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
                    onUpdate: self => {
                        setProgress(self.progress)
                        if (number) number.textContent = String(Math.round(self.progress * (cards.length - 1)) + 1).padStart(2, "0")
                    },
                },
            })
            return () => stage.classList.remove("is-horizontal")
        })
        return () => media.revert()
    }, { scope: root, dependencies: [filter, language, enabled], revertOnUpdate: true })

    const navigateTo = (index: number) => {
        const trigger = ScrollTrigger.getById("work-gallery")
        const stage = stageRef.current
        const cards = stage?.querySelectorAll<HTMLElement>(".work-panel")
        const card = cards?.[index]
        if (trigger && card && stage) {
            const distance = Math.max(1, stage.querySelector<HTMLElement>(".work-track")!.scrollWidth - stage.querySelector<HTMLElement>(".work-viewport")!.clientWidth)
            scrollTo(trigger.start + (trigger.end - trigger.start) * Math.min(1, card.offsetLeft / distance))
        }
    }
    const navigateBy = (direction: number) => {
        const trigger = ScrollTrigger.getById("work-gallery")
        if (!trigger) return
        const current = Math.round(trigger.progress * (visible.length - 1))
        navigateTo(Math.max(0, Math.min(visible.length - 1, current + direction)))
    }

    return (
        <section id="projects" className="work-section section-space" ref={root} aria-labelledby="work-title">
            <div className="page-shell"><SectionLabel index="01">{copy.selected}</SectionLabel></div>
            <div className="work-stage page-shell" ref={stageRef}>
                <div className="work-heading">
                    <div id="work-title"><EditorialTitle>{copy.workTitle}</EditorialTitle></div>
                    <div className="work-heading-side">
                        <p>{copy.workDescription}</p>
                        <div className="project-filters" aria-label={t.projects.title}>
                            {(["all", "websites", "systems"] as const).map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{copy[item]}</button>)}
                        </div>
                    </div>
                </div>
                <div className="work-viewport">
                    <div className="work-track">
                        {visible.map((project, position) => (
                            <article className={"work-panel work-tone-" + project.tone} key={project.id} onFocusCapture={event => {
                                const rect = event.currentTarget.getBoundingClientRect()
                                if (rect.left < -5 || rect.right > window.innerWidth + 5) navigateTo(position)
                            }}>
                                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="work-poster" aria-label={copy.visit + ": " + t.projects.items[project.index].title}>
                                    <span className="project-number">{"0" + (project.index + 1)} / 2026</span>
                                    <div className="project-browser">
                                        <div className="browser-bar" aria-hidden="true"><span /><span /><span /><span className="browser-domain">{new URL(project.demo).hostname}</span></div>
                                        <div className="browser-image"><Image src={project.image} alt={t.projects.items[project.index].title} fill sizes="(min-width: 1024px) 70vw, (min-width: 640px) 50vw, 95vw" className="object-cover object-top" onLoad={() => ScrollTrigger.refresh()} /></div>
                                    </div>
                                    <span className="project-open"><ArrowUpRight aria-hidden="true" /><span>{copy.visit}</span></span>
                                </a>
                                <div className="work-caption">
                                    <div><span className="eyebrow">{copy.projectKinds[project.index]}</span><h3>{t.projects.items[project.index].title}</h3></div>
                                    <p>{t.projects.items[project.index].description}</p>
                                </div>
                                <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                            </article>
                        ))}
                    </div>
                </div>
                <div className="work-navigation">
                    <span className="work-static-count">{String(visible.length).padStart(2, "0")} {copy.workCount}</span>
                    <span className="work-scroll-note">{copy.scrollWork}<ArrowRight aria-hidden="true" size={16} /></span>
                    <div className="work-slider-progress" aria-hidden="true"><span data-work-progress /></div>
                    <div className="work-controls"><span aria-hidden="true"><span data-work-current>01</span> / {String(visible.length).padStart(2, "0")}</span><button onClick={() => navigateBy(-1)} aria-label={copy.previous}><ArrowLeft size={18} /></button><button onClick={() => navigateBy(1)} aria-label={copy.next}><ArrowRight size={18} /></button></div>
                </div>
            </div>
        </section>
    )
}
