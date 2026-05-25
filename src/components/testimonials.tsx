"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function Testimonials() {
    const { t } = useLanguage()

    const items = t.testimonials.items || []
    
    // Separamos os 6 depoimentos originais em 2 grupos de 3, e os duplicamos para criar um loop contínuo e perfeito
    const row1 = [items[0], items[1], items[2], items[0], items[1], items[2]]
    const row2 = [items[3], items[4], items[5], items[3], items[4], items[5]]

    return (
        <section id="testimonials" className="py-24 sm:py-32 dark:bg-zinc-950 bg-zinc-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent dark:via-white/5 via-black/5 to-transparent" />
            <div className="absolute -top-[20%] left-[25%] h-[500px] w-[500px] rounded-full bg-blue-600/[0.02] blur-[150px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="container mx-auto px-4 md:px-8 text-center mb-16 space-y-4 relative z-10"
            >
                <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
                    {t.testimonials.title}
                </h2>
                <p className="text-muted-foreground text-lg max-w-[800px] mx-auto font-sans">
                    {t.testimonials.description}
                </p>
            </motion.div>

            {/* Infinite scrolling rows wrapper */}
            <div className="marquee-container space-y-8 relative z-10 w-full overflow-hidden select-none">
                
                {/* Row 1: Scrolling Left */}
                <div className="flex w-full overflow-hidden">
                    <div className="animate-marquee gap-6 py-2 flex">
                        {row1.map((item, idx) => (
                            <div 
                                key={`r1-${idx}`} 
                                className="w-[300px] sm:w-[380px] shrink-0 rounded-[2rem] border dark:border-white/5 border-zinc-200 dark:bg-zinc-950/50 bg-white backdrop-blur-md p-6 sm:p-8 relative overflow-hidden group dark:hover:border-white/10 hover:border-zinc-300 dark:hover:bg-zinc-900/40 hover:bg-zinc-50 transition-all duration-300 flex flex-col justify-between"
                            >
                                {/* Decorative Quote Icon */}
                                <span className="absolute -right-2 -top-4 font-serif text-[120px] text-white/[0.02] pointer-events-none leading-none select-none">
                                    “
                                </span>
                                
                                <div className="space-y-4">
                                    {/* Star rating */}
                                    <div className="flex gap-1 text-amber-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-current" />
                                        ))}
                                    </div>
                                    <p className="dark:text-zinc-300 text-zinc-600 text-sm sm:text-base leading-relaxed italic font-sans relative z-10">
                                        &ldquo;{item.quote}&rdquo;
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 mt-6 pt-4 border-t dark:border-white/5 border-zinc-200">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="h-12 w-12 rounded-full object-cover border border-white/10" 
                                    />
                                    <div className="text-left">
                                        <h4 className="font-semibold text-foreground text-sm sm:text-base font-sans">{item.name}</h4>
                                        <p className="text-xs text-muted-foreground font-sans">{item.company}</p>
                                    </div>
                                    <span className="ml-auto inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[9px] font-mono tracking-wider uppercase font-semibold text-blue-400 border border-blue-500/10">
                                        {item.service}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2: Scrolling Right */}
                <div className="flex w-full overflow-hidden">
                    <div className="animate-marquee-reverse gap-6 py-2 flex">
                        {row2.map((item, idx) => (
                            <div 
                                key={`r2-${idx}`} 
                                className="w-[300px] sm:w-[380px] shrink-0 rounded-[2rem] border dark:border-white/5 border-zinc-200 dark:bg-zinc-950/50 bg-white backdrop-blur-md p-6 sm:p-8 relative overflow-hidden group dark:hover:border-white/10 hover:border-zinc-300 dark:hover:bg-zinc-900/40 hover:bg-zinc-50 transition-all duration-300 flex flex-col justify-between"
                            >
                                <span className="absolute -right-2 -top-4 font-serif text-[120px] text-white/[0.02] pointer-events-none leading-none select-none">
                                    “
                                </span>
                                
                                <div className="space-y-4">
                                    <div className="flex gap-1 text-amber-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-current" />
                                        ))}
                                    </div>
                                    <p className="dark:text-zinc-300 text-zinc-600 text-sm sm:text-base leading-relaxed italic font-sans relative z-10">
                                        &ldquo;{item.quote}&rdquo;
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 mt-6 pt-4 border-t dark:border-white/5 border-zinc-200">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="h-12 w-12 rounded-full object-cover border border-white/10" 
                                    />
                                    <div className="text-left">
                                        <h4 className="font-semibold text-foreground text-sm sm:text-base font-sans">{item.name}</h4>
                                        <p className="text-xs text-muted-foreground font-sans">{item.company}</p>
                                    </div>
                                    <span className="ml-auto inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-mono tracking-wider uppercase font-semibold text-emerald-400 border border-emerald-500/10">
                                        {item.service}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}
