"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Github, Camera, Scale, LayoutDashboard, ChevronLeft, ChevronRight, Briefcase } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

// 1. ESTRUTURA DE DADOS ISOLADA (MOCK DOS PROJETOS)
const PROJECTS_DATA = [
    {
        id: "tkzjobs",
        category: "sistemas",
        tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Job Board"],
        github: "",
        demo: "https://tkz-jobsdev.vercel.app/",
        glowClass: "bg-blue-500/10",
        image: "/tkzjobs.png",
        year: "2026",
        titlePlaceholder: "TKZ Jobs Dev",
        descriptionPlaceholder: "Plataforma de vagas e oportunidades em tecnologia para desenvolvedores."
    },
    {
        id: "cmc",
        category: "websites",
        tags: ["Next.js", "React", "Tailwind CSS", "Responsive Design"],
        github: "",
        demo: "https://cmcfotoseartes.com.br/",
        glowClass: "bg-blue-500/10",
        image: "/cmc.png",
        year: "2026",
        titlePlaceholder: "CMC Fotos e Artes",
        descriptionPlaceholder: "E-commerce moderno para venda e personalização de produtos sob demanda, com catálogo interativo e carrinho dinâmico."
    },
    {
        id: "adriana",
        category: "websites",
        tags: ["Next.js", "Tailwind CSS", "SEO Optimization", "Lead Generation"],
        github: "",
        demo: "https://www.adrianacarvalhoadv.com.br/",
        glowClass: "bg-emerald-500/10",
        image: "/adriana.png",
        year: "2026",
        titlePlaceholder: "Adriana Carvalho Advocacia",
        descriptionPlaceholder: "Website institucional premium para escritório de advocacia."
    },
    {
        id: "se7ego",
        category: "sistemas",
        tags: ["Next.js", "React", "Tailwind CSS", "Dashboard", "SaaS"],
        github: "",
        demo: "https://www.se7ealuminio.com.br/go",
        glowClass: "bg-cyan-500/10",
        image: "/se7ego.png",
        year: "2026",
        titlePlaceholder: "Se7e Go",
        descriptionPlaceholder: "Gerador de orçamentos para empresas de vidraçaria que trabalham com esquadrias."
    }
]

// Mapeamento estático de ícones dos mockups adaptado para temas Claro/Escuro
const ICONS_MAP: Record<string, { icon: React.ElementType; bg: string; border: string; text: string }> = {
    tkzjobs: { icon: Briefcase, bg: "dark:bg-blue-500/10 bg-blue-500/10", border: "dark:border-blue-500/20 border-blue-200/60", text: "dark:text-blue-400 text-blue-600" },
    cmc: { icon: Camera, bg: "dark:bg-blue-500/10 bg-blue-500/10", border: "dark:border-blue-500/20 border-blue-200/60", text: "dark:text-blue-400 text-blue-600" },
    adriana: { icon: Scale, bg: "dark:bg-emerald-500/10 bg-emerald-500/10", border: "dark:border-emerald-500/20 border-emerald-200/60", text: "dark:text-emerald-400 text-emerald-600" },
    se7ego: { icon: LayoutDashboard, bg: "dark:bg-cyan-500/10 bg-cyan-500/10", border: "dark:border-cyan-500/20 border-cyan-200/60", text: "dark:text-cyan-400 text-cyan-600" },
}

// Interface para as propriedades do card
interface ProjectCardProps {
    project: typeof PROJECTS_DATA[0] & { title: string; description: string }
    mock: { icon: React.ElementType; bg: string; border: string; text: string } | undefined
    codeLabel: string
    demoLabel: string
    isActive: boolean
}

// 2. SUBCOMPONENTE DE CARD MEMOIZADO (PERFORMANCE OPTIMIZED)
const ProjectCard = React.memo(({ project, mock, codeLabel, demoLabel, isActive }: ProjectCardProps) => {
    return (
        <Card 
            className={`h-full flex flex-col overflow-hidden group border rounded-[2rem] transition-all duration-500 ease-out relative select-none subpixel-antialiased ${
                isActive 
                    ? "dark:border-cyan-500/20 border-zinc-200/80 dark:bg-zinc-950/98 bg-white shadow-[0_15px_45px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-[0_0_80px_rgba(6,182,212,0.12),0_20px_50px_rgba(0,0,0,0.65)]" 
                    : "dark:border-white/10 border-zinc-100 dark:bg-zinc-950/90 bg-zinc-50/90 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            }`}
            style={{ 
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden"
            }}
        >
            {/* Tint overlay on card hover - only active card gets the tint, and it's sutil */}
            <div className={`absolute inset-0 bg-cyan-500/5 dark:bg-cyan-500/10 opacity-0 transition-opacity duration-300 pointer-events-none z-10 ${isActive ? "group-hover:opacity-100" : ""}`} />

            {/* Visual Mockup/Cap Image Container */}
            <div className="relative h-56 sm:h-72 w-full overflow-hidden border-b border-zinc-200/50 dark:border-white/5 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/60">
                <div className={`absolute inset-0 transition-opacity duration-700 z-10 ${project.glowClass} ${isActive ? "group-hover:opacity-75 opacity-20" : "opacity-0"}`} />
                
                {/* Visual cap image wrapper */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 270px, (max-width: 1024px) 380px, 500px"
                        className={`object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
                            isActive ? "opacity-100 brightness-[1.1]" : "opacity-90 brightness-[0.9]"
                        }`}
                        draggable={false}
                    />
                </div>

                {/* Readability gradient overlay - subtle on light mode, deep on dark mode */}
                <div className={`absolute inset-0 bg-gradient-to-t dark:from-black/85 dark:via-black/30 from-white/35 via-transparent to-transparent z-15 pointer-events-none transition-opacity duration-500 ${
                    isActive ? "opacity-60 dark:opacity-70" : "opacity-20 dark:opacity-90"
                }`} />

                {/* Float Project Icon indicating categories */}
                {mock && (
                    <div className={`absolute top-4 left-4 z-20 h-10 w-10 rounded-full border ${mock.border} ${mock.bg} backdrop-blur-md flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110`}>
                        <mock.icon className={`h-5 w-5 ${mock.text}`} />
                    </div>
                )}
                
                <span className="absolute top-4 right-4 z-20 bg-white/80 dark:bg-black/70 backdrop-blur-md text-xs text-zinc-700 dark:text-zinc-200 px-2.5 py-1 rounded border border-zinc-200/60 dark:border-white/10 font-mono font-semibold">
                    {project.year}
                </span>
            </div>

            <CardHeader className="space-y-2 relative z-20 p-6 sm:p-8">
                <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white subpixel-antialiased">
                    <h3>
                    {project.title}
                    </h3>
                </CardTitle>
                <CardDescription className={`text-sm sm:text-base line-clamp-3 leading-relaxed transition-colors duration-300 subpixel-antialiased ${
                    isActive ? "text-zinc-800 dark:text-zinc-100 font-semibold" : "text-zinc-500 dark:text-zinc-300"
                }`}>{project.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 relative z-20 px-6 sm:px-8 pb-4">
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <Badge 
                            key={tag} 
                            variant="outline" 
                            className={`font-bold border transition-all duration-200 cursor-default subpixel-antialiased ${
                                isActive
                                    ? "dark:border-cyan-500/30 border-cyan-200 dark:bg-cyan-950/40 bg-cyan-50/70 dark:text-cyan-200 text-cyan-700 hover:border-cyan-500/40 dark:hover:bg-cyan-950/60 hover:bg-cyan-100/50"
                                    : "dark:border-white/10 border-zinc-200 dark:bg-white/5 bg-zinc-100/50 dark:text-zinc-300 text-zinc-600 hover:border-white/20 dark:hover:bg-white/10 hover:bg-zinc-100"
                            }`}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            
            {/* Oculta os botões nos cards laterais inativos para limpar o visual e remover a sobreposição */}
            <CardFooter className={`flex gap-4 border-t border-zinc-200/60 dark:border-white/5 p-6 sm:p-8 relative z-20 transition-all duration-300 ${
                isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}>
                {project.github ? (
                    <>
                        <div className="flex-1">
                            <Button variant="outline" size="sm" asChild className={`w-full rounded-xl border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5 cursor-pointer py-5 transition-all duration-200 ${
                                isActive ? "text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white" : "text-zinc-400"
                            }`}>
                                <Link
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    tabIndex={isActive ? 0 : -1}
                                    aria-label={`${codeLabel}: ${project.title}`}
                                >
                                    <Github className="mr-2 h-4 w-4" /> {codeLabel}
                                </Link>
                            </Button>
                        </div>
                        <div className="flex-1">
                            <Link 
                                href={project.demo} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                tabIndex={isActive ? 0 : -1}
                                aria-label={`${demoLabel}: ${project.title}`}
                                className="w-full flex items-center justify-center py-[13px] px-9 rounded-[14px] text-[15px] font-semibold tracking-[0.3px] border cursor-pointer transition-all duration-300 bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-500 shadow-[0_4px_12px_rgba(6,182,212,0.15)] dark:bg-cyan-950/20 dark:hover:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-500/50 dark:shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:-translate-y-[2px] active:scale-[0.98] select-none text-center"
                            >
                                <span>{demoLabel}</span>
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="w-full">
                        <Link 
                            href={project.demo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            tabIndex={isActive ? 0 : -1}
                            aria-label={`${demoLabel}: ${project.title}`}
                            className="w-full flex items-center justify-center py-[13px] px-9 rounded-[14px] text-[15px] font-semibold tracking-[0.3px] border cursor-pointer transition-all duration-300 bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-500 shadow-[0_4px_12px_rgba(6,182,212,0.15)] dark:bg-cyan-950/20 dark:hover:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-500/50 dark:shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:-translate-y-[2px] active:scale-[0.98] select-none text-center"
                        >
                            <span>{demoLabel}</span>
                        </Link>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
})

ProjectCard.displayName = "ProjectCard"

export function Projects() {
    const { t, language } = useLanguage()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [windowWidth, setWindowWidth] = useState(1200)
    const containerRef = useRef<HTMLDivElement>(null)
    const touchStartX = useRef(0)

    // Monitora a largura da janela para um design responsivo preciso
    useEffect(() => {
        if (typeof window !== "undefined") {
            requestAnimationFrame(() => {
                setWindowWidth(window.innerWidth)
            })
            const handleResize = () => setWindowWidth(window.innerWidth)
            window.addEventListener("resize", handleResize)
            return () => window.removeEventListener("resize", handleResize)
        }
    }, [])

    // Mapeamento dinâmico das traduções sobre a estrutura estática
    const projectsList = PROJECTS_DATA.map((project, idx) => ({
        ...project,
        title: t.projects.items[idx]?.title || project.titlePlaceholder,
        description: t.projects.items[idx]?.description || project.descriptionPlaceholder
    }))

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % PROJECTS_DATA.length)
    }, [])

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length)
    }, [])

    // Captura de gestos (Swipe) sem conflito de cliques
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX
        const diff = touchStartX.current - touchEndX
        if (diff > 55) {
            nextSlide()
        } else if (diff < -55) {
            prevSlide()
        }
    }

    // LÓGICA DE POSICIONAMENTO CIRCULAR (3 ITENS)
    const getRelativePosition = (idx: number, current: number, total: number) => {
        let diff = idx - current
        if (diff > total / 2) diff -= total
        if (diff < -total / 2) diff += total
        return diff
    }

    // CÁLCULO DINÂMICO DE ESTILOS (EFFECT COVERFLOW 3D)
    const getCardStyles = (relativePos: number) => {
        const isMobile = windowWidth < 640
        const isTablet = windowWidth >= 640 && windowWidth < 1024
        
        let xOffset = 0
        if (relativePos === 1) {
            xOffset = isMobile ? 110 : (isTablet ? 180 : 280)
        } else if (relativePos === -1) {
            xOffset = isMobile ? -110 : (isTablet ? -180 : -280)
        } else if (relativePos > 1) {
            xOffset = isMobile ? 220 : (isTablet ? 360 : 500)
        } else if (relativePos < -1) {
            xOffset = isMobile ? -220 : (isTablet ? -360 : -500)
        }
        
        const isCenter = relativePos === 0
        const isNeighbor = Math.abs(relativePos) === 1

        const opacity = isCenter ? 1 : (isNeighbor ? (isMobile ? 0.4 : 0.75) : 0)
        const scale = isCenter ? 1.0 : (isNeighbor ? 0.85 : 0.65)
        const rotateY = isCenter ? 0 : (relativePos > 0 ? -28 : 28)
        const zIndex = isCenter ? 30 : (isNeighbor ? 10 : 0)
        
        return {
            x: xOffset,
            scale,
            opacity,
            zIndex,
            rotateY,
            pointerEvents: (isCenter || isNeighbor) ? ("auto" as const) : ("none" as const)
        }
    }

    const carouselLabel = language === "pt" ? "Projetos em destaque" : language === "es" ? "Proyectos destacados" : "Featured projects"
    const previousLabel = language === "pt" ? "Projeto anterior" : language === "es" ? "Proyecto anterior" : "Previous project"
    const nextLabel = language === "pt" ? "Próximo projeto" : language === "es" ? "Siguiente proyecto" : "Next project"
    const slideLabel = (index: number) => language === "pt"
        ? `Ir para o projeto ${index + 1} de ${projectsList.length}`
        : language === "es"
            ? `Ir al proyecto ${index + 1} de ${projectsList.length}`
            : `Go to project ${index + 1} of ${projectsList.length}`

    return (
        <motion.section 
            id="projects" 
            ref={containerRef} 
            aria-labelledby="projects-title"
            className="container py-24 sm:py-32 mx-auto px-4 md:px-8 relative overflow-hidden"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Ambient backgrounds to break the black vacuum */}
            <div 
                className="absolute inset-0 pointer-events-none z-0" 
                style={{
                    background: "radial-gradient(ellipse at center, rgba(6,182,212,0.05) 0%, transparent 70%)"
                }}
            />
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 blur-3xl pointer-events-none z-0" 
                style={{
                    background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 60%)"
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-24 space-y-3 relative z-50"
            >
                <span className="text-cyan-600 dark:text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase font-mono block">
                    {`// ${t.projects.title === "Projetos em Destaque" ? "Portfólio" : "Portfolio"}`}
                </span>
                <h2 id="projects-title" className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
                    {t.projects.title}
                </h2>
            </motion.div>

            {/* Viewport 3D Coverflow Container */}
            <div
                className="relative max-w-4xl mx-auto w-full z-10 px-4 sm:px-0"
                role="region"
                aria-roledescription="carousel"
                aria-label={carouselLabel}
            >
                
                {/* Navegação por Setas */}
                <button
                    onClick={prevSlide}
                    className="absolute left-[-10px] sm:left-[-50px] md:left-[-80px] top-1/2 -translate-y-1/2 z-40 h-10 w-10 md:h-12 md:w-12 rounded-full border dark:border-white/10 border-zinc-300 dark:bg-zinc-950/70 bg-white/80 backdrop-blur-md flex items-center justify-center dark:text-zinc-400 text-zinc-500 hover:text-foreground dark:hover:border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 shadow-lg cursor-pointer hover:scale-110 active:scale-95"
                    aria-label={previousLabel}
                    aria-controls="projects-carousel-track"
                >
                    <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-[-10px] sm:right-[-50px] md:right-[-80px] top-1/2 -translate-y-1/2 z-40 h-10 w-10 md:h-12 md:w-12 rounded-full border dark:border-white/10 border-zinc-300 dark:bg-zinc-950/70 bg-white/80 backdrop-blur-md flex items-center justify-center dark:text-zinc-400 text-zinc-500 hover:text-foreground dark:hover:border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 shadow-lg cursor-pointer hover:scale-110 active:scale-95"
                    aria-label={nextLabel}
                    aria-controls="projects-carousel-track"
                >
                    <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                </button>

                {/* Track Tridimensional dos Cards (Aumentado a altura para evitar sobreposição dos dots) */}
                <div 
                    id="projects-carousel-track"
                    className="relative w-full h-[460px] sm:h-[540px] md:h-[600px] flex items-center justify-center overflow-visible mt-20"
                    style={{ perspective: "1200px" }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {projectsList.map((project, idx) => {
                        const mock = ICONS_MAP[project.id]
                        const relativePos = getRelativePosition(idx, currentIndex, projectsList.length)
                        const cardStyles = getCardStyles(relativePos)

                        return (
                            <motion.div
                                key={project.id}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${idx + 1} / ${projectsList.length}: ${project.title}`}
                                aria-hidden={relativePos !== 0}
                                className={`absolute w-full max-w-[270px] sm:max-w-[380px] md:max-w-[500px] will-change-transform ${
                                    relativePos !== 0 ? "cursor-pointer" : ""
                                }`}
                                style={{ transformStyle: "preserve-3d" }}
                                animate={cardStyles}
                                transition={{ type: "spring", stiffness: 220, damping: 25 }}
                                onClick={() => {
                                    if (relativePos !== 0) {
                                        setCurrentIndex(idx)
                                    }
                                }}
                            >
                                <ProjectCard
                                    project={project}
                                    mock={mock}
                                    codeLabel={t.projects.links.code}
                                    demoLabel={t.projects.links.demo}
                                    isActive={relativePos === 0}
                                />
                            </motion.div>
                        )
                    })}
                </div>

                {/* Indicadores (Dots) na base do carrossel (Aumentado o distanciamento mt-16 e z-index para prevenir qualquer sobreposição) */}
                <div className="flex justify-center gap-2.5 mt-16 relative z-30">
                    {projectsList.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className="group h-8 w-8 rounded-full flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                            aria-label={slideLabel(idx)}
                            aria-current={currentIndex === idx ? "true" : undefined}
                        >
                            <span className={`h-[9px] w-[9px] rounded-full transition-all duration-300 ${
                                currentIndex === idx
                                    ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)] scale-110"
                                    : "bg-zinc-300 dark:bg-white/20 group-hover:bg-zinc-400 dark:group-hover:bg-white/40"
                            }`} />
                        </button>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}
