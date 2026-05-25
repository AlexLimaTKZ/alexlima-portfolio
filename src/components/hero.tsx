"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { motion, Variants } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 15,
        },
    },
}

const sentenceVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        }
    }
}

const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const
        }
    }
}

export function Hero() {
    const { t, language } = useLanguage()

    // 3D Tilt Effect do Viewfinder
    const photoWrapperRef = React.useRef<HTMLDivElement>(null)
    const photoFrameRef = React.useRef<HTMLDivElement>(null)
    const glowRef = React.useRef<HTMLDivElement>(null)
    const badge1Ref = React.useRef<HTMLDivElement>(null)
    const badge2Ref = React.useRef<HTMLDivElement>(null)
    const badge3Ref = React.useRef<HTMLDivElement>(null)
    const sectionRef = React.useRef<HTMLElement>(null)
    const spotlightRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const section = sectionRef.current
        const spotlight = spotlightRef.current
        if (!section || !spotlight) return

        let targetX = 0
        let targetY = 0
        let currentX = 0
        let currentY = 0
        let animationFrameId = 0
        let isHovered = false

        // Iniciar no centro por padrão
        const initCoords = () => {
            const rect = section.getBoundingClientRect()
            targetX = rect.width / 2
            targetY = rect.height / 2
            currentX = targetX
            currentY = targetY
            spotlight.style.background = `radial-gradient(circle 280px at ${currentX}px ${currentY}px, rgba(6, 182, 212, 0.12) 0%, rgba(6, 182, 212, 0.03) 40%, transparent 100%)`
        }
        initCoords()

        const handleMouseMoveGlobal = (e: MouseEvent) => {
            const rect = section.getBoundingClientRect()
            
            // Verificar se o mouse está dentro dos limites da Hero Section
            const isInside = 
                e.clientX >= rect.left && 
                e.clientX <= rect.right && 
                e.clientY >= rect.top && 
                e.clientY <= rect.bottom

            if (isInside) {
                targetX = e.clientX - rect.left
                targetY = e.clientY - rect.top
                if (!isHovered) {
                    isHovered = true
                    spotlight.style.opacity = '1'
                }
            } else {
                if (isHovered) {
                    isHovered = false
                    spotlight.style.opacity = '0'
                }
            }
        }

        const updatePosition = () => {
            // Lerp para suavizar o movimento: 10% da distância por frame
            currentX += (targetX - currentX) * 0.1
            currentY += (targetY - currentY) * 0.1

            spotlight.style.background = `radial-gradient(circle 280px at ${currentX}px ${currentY}px, rgba(6, 182, 212, 0.12) 0%, rgba(6, 182, 212, 0.03) 40%, transparent 100%)`

            animationFrameId = requestAnimationFrame(updatePosition)
        }

        // Registrar o movimento do mouse na window para evitar conflitos com elementos 3D
        window.addEventListener('mousemove', handleMouseMoveGlobal)
        
        // Iniciar loop de animação
        animationFrameId = requestAnimationFrame(updatePosition)

        // Reinicializar se a tela mudar de tamanho
        window.addEventListener('resize', initCoords)

        return () => {
            window.removeEventListener('mousemove', handleMouseMoveGlobal)
            window.removeEventListener('resize', initCoords)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    React.useEffect(() => {
        const wrapper = photoWrapperRef.current
        const frame = photoFrameRef.current
        const glow = glowRef.current
        const badge1 = badge1Ref.current
        const badge2 = badge2Ref.current
        const badge3 = badge3Ref.current

        if (!wrapper || !frame) return

        const handleMouseMove = (e: MouseEvent) => {
            const isMobile = window.innerWidth < 768
            const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

            if (isMobile) return

            const maxTilt = isTablet ? 8 : 15
            const rect = frame.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const mouseX = e.clientX - centerX
            const mouseY = e.clientY - centerY

            // Rotações com base na distância do cursor
            const rotateX = (mouseY / (rect.height / 2)) * -maxTilt
            const rotateY = (mouseX / (rect.width / 2)) * maxTilt

            // Rotação da moldura com zoom sutil
            frame.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.02, 1.02, 1.02)
            `

            // Glow dinâmico
            if (glow) {
                glow.style.opacity = '1'
                glow.style.background = `radial-gradient(
                    circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px,
                    rgba(6, 182, 212, 0.15) 0%,
                    transparent 60%
                )`
            }

            // Paralaxe oposta nos badges (stickers)
            const badgeOffsetX = rotateY * 0.3
            const badgeOffsetY = rotateX * 0.3

            const badges = [badge1, badge2, badge3]
            badges.forEach((badge, index) => {
                if (!badge) return
                const depth = (index + 1) * 5 // 5, 10, 15
                badge.style.transform = `
                    translateX(${badgeOffsetX * depth}px)
                    translateY(${badgeOffsetY * depth}px)
                    translateZ(${depth * 2}px)
                `
            })
        }

        const handleMouseLeave = () => {
            if (frame) {
                frame.style.transform = `
                    perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                    scale3d(1, 1, 1)
                `
                frame.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
            }

            if (glow) {
                glow.style.opacity = '0'
                glow.style.transition = 'opacity 0.3s ease'
            }

            const badges = [badge1, badge2, badge3]
            badges.forEach((badge, index) => {
                if (!badge) return
                const depth = (index + 1) * 5
                badge.style.transform = `
                    translateX(0px)
                    translateY(0px)
                    translateZ(${depth * 2}px)
                `
                badge.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
            })
        }

        const handleMouseEnter = () => {
            if (frame) {
                frame.style.transition = 'transform 0.1s ease-out'
            }
            if (glow) {
                glow.style.transition = 'none'
            }

            const badges = [badge1, badge2, badge3]
            badges.forEach((badge) => {
                if (!badge) return
                badge.style.transition = 'transform 0.1s ease-out'
            })
        }

        wrapper.addEventListener('mousemove', handleMouseMove)
        wrapper.addEventListener('mouseleave', handleMouseLeave)
        wrapper.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            wrapper.removeEventListener('mousemove', handleMouseMove)
            wrapper.removeEventListener('mouseleave', handleMouseLeave)
            wrapper.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [language])

    const whatsappNumber = "5586995971050"
    const whatsappMessage = encodeURIComponent(t.hero.whatsappMessage || "Olá Alex! Vi seu portfólio e gostaria de conversar sobre um projeto.")
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

    // Tradução dinâmica dos CTAs personalizados para manter consistência multilíngue
    const primaryCtaText = language === "pt" ? "Iniciar projeto" : language === "es" ? "Iniciar proyecto" : "Start project"
    const secondaryCtaText = language === "pt" ? "Ver trajetória" : language === "es" ? "Ver trayectoria" : "Explore trajectory"

    return (
        <section 
            ref={sectionRef}
            className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0c1220] px-4 md:px-8 pt-20 lg:pt-0"
        >
            {/* Camada Base: Azul-marinho profundo */}
            <div className="absolute inset-0 bg-[#0c1220] -z-30 pointer-events-none" />

            {/* Spotlight que segue o mouse com delay suave (Lerp) */}
            <div 
                ref={spotlightRef}
                className="absolute inset-0 pointer-events-none z-0 opacity-0 transition-opacity duration-700 ease-out"
            />


            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full relative z-10">
                {/* Text Content - Left Side */}
                <motion.div 
                    key={language}
                    className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 py-12 lg:py-20 w-full"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Identificador de Edição Estilo Revista/Blueprint */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="font-mono text-[9px] tracking-[0.3em] uppercase text-cyan-500/80 mb-2"
                    >
                        Nº 01 — FULL STACK · FREELANCER · MENTOR
                    </motion.div>

                    {/* Mix tipográfico contrastante: Sans-serif Bold + Serif Itálico */}
                    <motion.h1
                        className="font-display font-extrabold tracking-tight max-w-2xl text-white text-5xl sm:text-7xl lg:text-8xl leading-[1.1] sm:leading-[1.05] mb-4 flex flex-wrap justify-center lg:justify-start"
                        variants={sentenceVariants}
                    >
                        {language === "pt" && (
                            <>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>Transformo</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>ideias</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>em</motion.span>
                                <br />
                                <motion.span className="inline-block mr-[0.22em] font-serif italic font-normal bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" variants={wordVariants}>produtos</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-serif italic font-normal bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" variants={wordVariants}>digitais</motion.span>
                                <br />
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>que</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>escalam</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>e</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>convertem.</motion.span>
                            </>
                        )}
                        {language === "en" && (
                            <>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>I</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>turn</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>ideas</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>into</motion.span>
                                <br />
                                <motion.span className="inline-block mr-[0.22em] font-serif italic font-normal bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" variants={wordVariants}>digital</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-serif italic font-normal bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" variants={wordVariants}>products</motion.span>
                                <br />
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>that</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>scale</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>&</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>convert.</motion.span>
                            </>
                        )}
                        {language === "es" && (
                            <>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>Transformo</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>ideas</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>en</motion.span>
                                <br />
                                <motion.span className="inline-block mr-[0.22em] font-serif italic font-normal bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" variants={wordVariants}>productos</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-serif italic font-normal bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" variants={wordVariants}>digitales</motion.span>
                                <br />
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>que</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>escalan</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>y</motion.span>
                                <motion.span className="inline-block mr-[0.22em] font-sans" variants={wordVariants}>convierten.</motion.span>
                            </>
                        )}
                    </motion.h1>

                    <motion.p
                        className="max-w-md text-zinc-400 lg:text-base leading-relaxed font-sans"
                        variants={itemVariants}
                    >
                        {t.hero.description}
                    </motion.p>

                    <motion.div
                        className="flex flex-col gap-6 sm:flex-row w-full sm:w-auto pt-2"
                        variants={itemVariants}
                    >
                        {/* Primário: Iniciar projeto */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                            <Button size="lg" asChild className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white font-semibold pl-10 pr-4 py-4 border-0 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] group flex items-center justify-between gap-4 h-auto">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full">
                                    <span className="tracking-tight">{primaryCtaText}</span>
                                    <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105 shrink-0">
                                        <ArrowRight className="h-4 w-4 text-white" strokeWidth={1.5} />
                                    </span>
                                </a>
                            </Button>
                        </motion.div>
                        {/* Secundário: Ver trajetória */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" asChild className="w-full rounded-full border border-white/20 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white hover:border-cyan-500/70 px-10 py-4 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] h-auto">
                                <a href="#projects">
                                    {secondaryCtaText}
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Image Content - Right Side: Avatar flutuante com Viewfinder e stickers técnicos */}
                <motion.div
                    ref={photoWrapperRef}
                    className="flex justify-center items-center lg:items-center order-1 lg:order-2 h-full pt-10 lg:pt-0 relative w-full max-w-[420px] aspect-[3/4] mx-auto overflow-visible group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1], delay: 0.4 }}
                >
                    
                    {/* Frame da Câmera (Viewfinder) com Efeito 3D Tilt interativo manual */}
                    <div 
                        ref={photoFrameRef}
                        className="relative w-full h-full flex items-end justify-center overflow-visible cursor-grab active:cursor-grabbing photo-container"
                        style={{
                            transformStyle: "preserve-3d",
                            willChange: "transform"
                        }}
                    >
                        {/* Foto flutuante com máscara de fade inferior, overlay gradiente aquecido ciano (Z-index z-0 para garantir que fique por trás) */}
                        <div 
                            className="w-full h-full flex items-end justify-center rounded-[20px] border border-white/5 shadow-2xl bg-zinc-950/45 backdrop-blur-sm relative z-0"
                            style={{
                                transform: "translateZ(10px)",
                                transformStyle: "preserve-3d"
                            }}
                        >
                            {/* Overlay de gradiente ciano sutil misturado */}
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent mix-blend-overlay pointer-events-none z-10 rounded-[20px]" />
                            
                            <motion.img
                                src="/alexlima.png"
                                alt="Alex Lima - Desenvolvedor Full Stack"
                                className="w-full h-full object-cover object-top filter contrast-[1.1] brightness-[1.05] relative z-0 rounded-[20px]"
                                style={{
                                    maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                                    WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)"
                                }}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1], delay: 0.4 }}
                            />
                        </div>

                        {/* Cantos decorativos estilo viewfinder */}
                        <div 
                            className="absolute inset-[-2px] pointer-events-none z-10"
                            style={{ transform: "translateZ(15px)" }}
                        >
                            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-500/40" />
                            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-500/40" />
                            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-500/40" />
                            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-500/40" />
                        </div>
                        
                                        {/* Badges Flutuantes (Stickers flutuando livremente fora da foto com profundidade 3D Z e z-index alto z-30) */}
                        {/* 1. Full Stack · 2+ anos */}
                        <div 
                            ref={badge1Ref}
                            className="absolute top-[96px] left-[-16px] z-30 pointer-events-auto select-none"
                            style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
                        >
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 backdrop-blur-[12px] border border-cyan-500/30 rounded-[20px] text-[10px] font-semibold tracking-[0.1em] uppercase text-[#06b6d4] shadow-[0_4px_15px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.05)] whitespace-nowrap">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#06b6d4] mr-2 shadow-[0_0_8px_rgba(6,182,212,0.6)] animate-pulse shrink-0" />
                                {language === "pt" ? "Full Stack · 2+ anos" : language === "es" ? "Full Stack · 2+ años" : "Full Stack · 2+ years"}
                            </span>
                        </div>

                        {/* 2. Founder · TKZ Dev */}
                        <div 
                            ref={badge2Ref}
                            className="absolute bottom-[40%] right-[-30px] z-30 pointer-events-auto select-none"
                            style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
                        >
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 backdrop-blur-[12px] border border-cyan-500/30 rounded-[20px] text-[10px] font-semibold tracking-[0.1em] uppercase text-[#06b6d4] shadow-[0_4px_15px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.05)] whitespace-nowrap">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#06b6d4] mr-2 shadow-[0_0_8px_rgba(6,182,212,0.6)] shrink-0" />
                                Founder · TKZ Dev
                            </span>
                        </div>

                        {/* 3. Next.js · .NET · Cloud */}
                        <div 
                            ref={badge3Ref}
                            className="absolute bottom-[72px] left-[-16px] z-30 pointer-events-auto select-none"
                            style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
                        >
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 backdrop-blur-[12px] border border-cyan-500/30 rounded-[20px] text-[10px] font-semibold tracking-[0.1em] uppercase text-[#06b6d4] shadow-[0_4px_15px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.05)] whitespace-nowrap">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#06b6d4] mr-2 shadow-[0_0_8px_rgba(6,182,212,0.6)] shrink-0" />
                                Next.js · .NET · Cloud
                            </span>
                        </div>

                        {/* Glow dinâmico que segue o mouse */}
                        <div 
                            ref={glowRef}
                            className="absolute pointer-events-none rounded-[20px] inset-[-20px] opacity-0 z-10 transition-opacity duration-300 ease-out"
                        />

                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.a
                href="#about"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 group cursor-pointer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
            >
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
                >
                    <ChevronDown className="h-5 w-5 text-zinc-600 group-hover:text-zinc-300 transition-colors" strokeWidth={1.5} />
                </motion.div>
            </motion.a>

            {/* Assinatura Cursiva (Selo de Autenticidade da Hero) */}
            <div 
                className="absolute bottom-12 right-8 md:right-12 text-3xl sm:text-4xl text-cyan-400/50 z-10 select-none pointer-events-none"
                style={{ fontFamily: "'Autography', cursive", transform: "rotate(-2deg)" }}
            >
                Alex Lima
            </div>

            {/* Bottom gradient fade for smooth flow to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0c1220] to-transparent z-[5]" />
        </section>
    )
}
