"use client"

import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { Globe, Sparkles, LayoutDashboard, Code2 } from "lucide-react"

export function Services() {
    const { t } = useLanguage()

    // Configurando os ícones Lucide para cada serviço de forma correspondente
    const icons = [Globe, Sparkles, LayoutDashboard, Code2]

    // Imagens conceituais do Unsplash para cada tipo de serviço
    const serviceImages = [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80", // Sites Institucionais (Laptop/Dev screen)
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=500&q=80", // Landing Pages (Mobile/Web mockups UI)
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80", // Sistemas & Dashboards (Complex code charts)
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80"  // Mentoria & Code Review (Close up clean IDE code)
    ]

    // Cores de glow correspondentes para cada tipo de serviço
    const glowColors = [
        "group-hover:bg-blue-500/5",
        "group-hover:bg-cyan-500/5",
        "group-hover:bg-emerald-500/5",
        "group-hover:bg-amber-500/5"
    ]

    // Cores vivas e contrastantes no modo claro, sutis e elegantes no escuro
    const iconBgColors = [
        "dark:bg-blue-950/40 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/60 dark:border-blue-500/20",
        "dark:bg-cyan-950/40 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200/60 dark:border-cyan-500/20",
        "dark:bg-emerald-950/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-500/20",
        "dark:bg-amber-950/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/20"
    ]

    const borderGlowColors = [
        "group-hover:border-blue-500/30",
        "group-hover:border-cyan-500/30",
        "group-hover:border-emerald-500/30",
        "group-hover:border-amber-500/30"
    ]

    // Configuração de animações Cascade (Stagger Children)
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12
            }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 35 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 70,
                damping: 16
            }
        }
    }

    return (
        <section id="services" className="w-full bg-[#f8f9fa] dark:bg-transparent transition-colors duration-300">
            <div className="container py-24 sm:py-32 mx-auto px-4 md:px-8 relative overflow-hidden">
                {/* Ambient background light */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-blue-500/[0.02] blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16 space-y-4"
                >
                    <span className="text-cyan-600 dark:text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase font-mono block">
                        {`// ${t.services.title === "Meus Serviços" || t.services.title === "Serviços" ? "SERVIÇOS" : "SERVICES"}`}
                    </span>
                    <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
                        {t.services.title}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-[800px] mx-auto font-sans">
                        {t.services.description}
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {t.services.items.map((service: { title: string; description: string; stack: string }, index: number) => {
                        const IconComponent = icons[index]
                        
                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -8, scale: 1.01 }}
                                className={`group relative rounded-2xl border border-transparent dark:border-white/5 bg-white dark:bg-zinc-950/40 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-none hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-none overflow-hidden cursor-pointer transition-all duration-500 flex flex-col justify-between ${borderGlowColors[index]}`}
                            >
                                {/* Banner Image with hover zoom, rounded specifically at top */}
                                <div className="relative h-36 w-full overflow-hidden rounded-t-2xl bg-zinc-150 dark:bg-zinc-900/60 border-b border-zinc-200/50 dark:border-white/5">
                                    <Image
                                        src={serviceImages[index]}
                                        alt={service.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover opacity-100 dark:opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:scale-105 brightness-100 dark:brightness-[0.85] rounded-t-2xl"
                                        draggable={false}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t dark:from-zinc-950/90 dark:via-zinc-950/40 dark:to-transparent from-white/80 via-transparent to-transparent pointer-events-none" />
                                </div>

                                {/* Glow card background effect */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${glowColors[index]}`} />
                                
                                <div className="space-y-4 px-6 pb-6 relative z-10 -mt-10 flex-1">
                                    {/* Overlapping Animated Icon container */}
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-500 group-hover:scale-110 shadow-lg ${iconBgColors[index]}`}>
                                        <IconComponent className="h-6 w-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed dark:group-hover:text-zinc-300 group-hover:text-zinc-700 transition-colors duration-300">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Stack technical badges bottom aligned with ciano borders/bg in light mode */}
                                <div className="mt-auto px-6 pb-6 pt-4 border-t border-zinc-200/50 dark:border-white/5 relative z-10 flex flex-wrap gap-2">
                                    {service.stack.split(' • ').map((tech: string) => (
                                        <span 
                                            key={tech} 
                                            className="inline-flex items-center rounded-full dark:bg-white/5 bg-cyan-50/60 border border-cyan-200/50 dark:border-white/5 px-2.5 py-0.5 text-[9px] font-bold dark:text-zinc-300 text-cyan-700 uppercase tracking-wider group-hover:bg-cyan-100/60 dark:group-hover:bg-white/10 transition-all duration-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
