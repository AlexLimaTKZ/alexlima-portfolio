"use client"
// UX Bypass: placeholder

import { icon } from "./moke"
import { useLanguage } from "@/components/language-provider"

export function TechMarquee() {
    const { t } = useLanguage()

    // Duplicate list of icons to ensure seamless infinite looping
    const doubledIcons = [...icon, ...icon, ...icon]

    return (
        <section className="py-16 bg-card/10 border-y border-border/40 overflow-hidden relative">
            {/* Ambient gradients behind */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[100px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[100px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Gradient shadow overlay for borders */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 md:px-8 mb-8 text-center sm:text-left">
                <span className="text-xs font-semibold tracking-widest text-primary uppercase font-mono">
                    {`// Stack`}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight mt-1">
                    {t.skills?.title || "Tecnologias"}
                </h3>
            </div>

            {/* Infinite Horizontal Loop Container */}
            <div className="marquee-container w-full overflow-hidden flex whitespace-nowrap">
                <div className="animate-marquee flex gap-12 items-center py-4">
                    {doubledIcons.map((tech, idx) => {
                        const IconComp = tech.IconComponent
                        return (
                            <div
                                key={`${tech.name}-${idx}`}
                                className="flex items-center gap-3 px-6 py-3 rounded-xl border border-border/40 bg-card/25 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 select-none group"
                            >
                                <IconComp 
                                    className="h-6 w-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" 
                                    style={{ color: tech.colorDark }} 
                                />
                                <span className="font-display text-sm font-semibold tracking-tight text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                                    {tech.name}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
