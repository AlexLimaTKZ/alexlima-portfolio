"use client"

import { motion, useInView, useScroll, useSpring } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { SITE_CONFIG } from "@/lib/constants"
import { useRef, useState, useEffect } from "react"
import { Briefcase, Rocket, Code2, Compass, Palette, Zap } from "lucide-react"

// Counter animation hook
function useCounter(end: number, duration: number = 2000, startCounting: boolean = false) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!startCounting) return
        let startTime: number | null = null
        let animationFrame: number

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [end, duration, startCounting])

    return count
}

const timelineContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
}

const timelineItemVariants = {
    hidden: { opacity: 0, x: 30, filter: "blur(6px)" },
    show: { 
        opacity: 1, 
        x: 0, 
        filter: "blur(0px)",
        transition: { 
            type: "spring" as const, 
            stiffness: 85, 
            damping: 14 
        } 
    }
}

const stats = [
    { value: SITE_CONFIG.stats.yearsExperience, suffix: "+", icon: Briefcase, labelKey: "statsYears" },
    { value: SITE_CONFIG.stats.projectsDelivered, suffix: "+", icon: Rocket, labelKey: "statsProjects" },
    { value: SITE_CONFIG.stats.technologies, suffix: "+", icon: Code2, labelKey: "statsTechs" },
]

export function About() {
    const { t } = useLanguage()
    const statsRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(statsRef, { once: true, margin: "-100px" })
    
    // Timeline scroll progress with pure Framer Motion
    const timelineRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 75%", "end 50%"],
    })
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 25,
        restDelta: 0.001
    })

    // Process step icons helper
    const processIcons = [Compass, Palette, Code2, Zap]
    
    const processBannerColors = [
        "from-cyan-500/20 via-blue-500/10 to-transparent text-cyan-400",
        "from-violet-500/20 via-fuchsia-500/10 to-transparent text-violet-400",
        "from-blue-500/20 via-indigo-500/10 to-transparent text-blue-400",
        "from-emerald-500/20 via-cyan-500/10 to-transparent text-emerald-400",
    ]

    return (
        <motion.section 
            id="about" 
            className="py-24 sm:py-32 relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Background elements */}
            <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 max-w-6xl space-y-32">
                {/* Stats Section */}
                <div className="space-y-6">
                    <motion.div
                        ref={statsRef}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {stats.map((stat) => (
                            <StatCard 
                                key={stat.labelKey} 
                                stat={stat} 
                                isInView={isInView}
                                t={t}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Bio & Experience Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left Column: Bio */}
                    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
                            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <span className="text-sm font-semibold tracking-[0.15em] text-cyan-500/80 uppercase font-mono">
                                {`// ${t.about.title === "Sobre Mim" ? "Sobre Mim" : "About Me"}`}
                            </span>
                            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                                {t.about.title}
                            </h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
                            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="space-y-4 text-zinc-600 dark:text-zinc-300 text-base leading-relaxed max-w-prose"
                        >
                            <p>{t.about.description1}</p>
                            <p>{t.about.description2}</p>
                            <p>{t.about.description3}</p>
                        </motion.div>
                    </div>

                    {/* Right Column: Timeline */}
                    <div ref={timelineRef} className="lg:col-span-7 space-y-10 relative">
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
                            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4 mb-12"
                        >
                            <span className="text-cyan-500 dark:text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase font-mono block">
                                {`// ${t.about.experienceTitle === "Experiência" ? "Experiência" : "Experience"}`}
                            </span>
                            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                                {t.about.experienceTitle}
                            </h2>
                            <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-4" />
                        </motion.div>

                        {/* Interactive Vertical Timeline Line */}
                        <div className="absolute left-4 top-24 bottom-4 w-[2px] dark:bg-white/10 bg-black/10 origin-top pointer-events-none">
                            <motion.div 
                                className="w-full h-full bg-gradient-to-b from-cyan-500 to-blue-600 origin-top"
                                style={{ scaleY }}
                            />
                        </div>

                        {/* Timeline Items with Staggered reveal */}
                        <motion.div 
                            className="space-y-12"
                            variants={timelineContainerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {t.about.experiences.map((exp: { year: string; title: string; company: string; description: string }, index: number) => (
                                <TimelineItem key={index} exp={exp} index={index} />
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Process Section ("Como Eu Trabalho") */}
                <div className="space-y-16">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <motion.span 
                            className="text-sm font-semibold tracking-widest text-primary uppercase font-mono"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {`// ${t.process?.title || "Workflow"}`}
                        </motion.span>
                        <motion.h3 
                            className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            {t.process?.title || "Como Eu Trabalho"}
                        </motion.h3>
                        <motion.div 
                            className="h-1 w-12 bg-gradient-to-r from-blue-600 to-emerald-500 rounded mx-auto"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                        {t.process?.steps?.map((step: { title: string; description: string }, index: number) => {
                            const Icon = processIcons[index] || Compass
                            return (
                                <motion.div
                                    key={index}
                                    className="glass-card group relative p-6 rounded-2xl border border-border/40 bg-card/25 backdrop-blur-sm overflow-hidden flex flex-col justify-between hover:border-blue-500/30 transition-all duration-500"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                    whileHover={{ y: -6, scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    {/* Neon top line glow */}
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600/0 via-blue-500/0 to-emerald-500/0 group-hover:from-blue-600 group-hover:via-blue-500 group-hover:to-emerald-500 transition-all duration-700" />
                                    
                                    <div>
                                        {/* Painel gráfico local, sem dependência de imagens externas. */}
                                        <div className={`relative h-32 w-full overflow-hidden rounded-xl mb-6 bg-gradient-to-br ${processBannerColors[index]} border dark:border-white/10 border-zinc-200/80 ring-1 dark:ring-white/10 ring-zinc-200/50 flex items-center justify-center`}>
                                            <div
                                                aria-hidden="true"
                                                className="absolute inset-0 opacity-20"
                                                style={{
                                                    backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                                                    backgroundSize: "18px 18px",
                                                }}
                                            />
                                            <Icon aria-hidden="true" className="h-14 w-14 opacity-60 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.25} />
                                        </div>

                                        <div className="flex items-center justify-between mb-6">
                                            <div className="h-10 w-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors duration-500">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <span className="font-display text-4xl font-extrabold text-foreground/5 font-mono select-none transition-colors duration-500 group-hover:text-emerald-500/10">
                                                {`0${index + 1}`}
                                            </span>
                                        </div>

                                        <h4 className="font-display text-lg font-bold tracking-tight mb-2 text-foreground group-hover:text-blue-400 transition-colors duration-300">
                                             {step.title}
                                        </h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

function StatCard({ stat, isInView, t }: { stat: typeof stats[0]; isInView: boolean; t: typeof translations.en }) {
    const count = useCounter(stat.value, 1500, isInView)
    const Icon = stat.icon

    const label = (t.about as Record<string, unknown>)?.[stat.labelKey] as string || 
        (stat.labelKey === "statsYears" ? "Anos de Experiência" : 
         stat.labelKey === "statsProjects" ? "Projetos Entregues" : 
         "Tecnologias")

    return (
        <div className="relative group rounded-xl border border-border/40 bg-card/25 backdrop-blur-sm p-8 text-center overflow-hidden hover:border-blue-500/20 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mx-auto mb-4 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all duration-500">
                    <Icon className="h-5 w-5" />
                </div>
                <div className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-mono">
                    {count}{stat.suffix}
                </div>
                <p className="text-xs text-muted-foreground mt-3 uppercase tracking-widest font-semibold font-mono">
                    {label}
                </p>
            </div>
        </div>
    )
}

function TimelineItem({ exp, index }: { exp: { year: string; title: string; company: string; description: string }; index: number }) {
    return (
        <div className="pl-10 relative group">
            {/* Timeline Dot with Pulse effect on active checkpoint */}
            <span className={`absolute left-[10px] top-2.5 h-3.5 w-3.5 rounded-full border-2 border-cyan-500 bg-black z-10 transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] ${index === 0 ? "animate-pulse" : ""}`} />
            
            <motion.div
                variants={timelineItemVariants}
                className="p-6 sm:p-8 rounded-2xl backdrop-blur-sm dark:bg-white/[0.02] bg-black/[0.01] border dark:border-white/[0.06] border-black/[0.05] space-y-3 hover:border-cyan-500/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 ease-out"
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs text-cyan-500 dark:text-cyan-400 font-semibold font-mono tracking-wider uppercase">
                        {exp.year}
                    </span>
                    <span className="bg-cyan-500/10 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-medium px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-500/20 font-sans tracking-wide">
                        {exp.company}
                    </span>
                </div>
                <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                    {exp.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    {exp.description}
                </p>
            </motion.div>
        </div>
    )
}
