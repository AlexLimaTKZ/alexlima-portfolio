"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { MessageSquare, ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

type Language = 'en' | 'pt' | 'es';

export function Contact() {
    const { t, language } = useLanguage()

    const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.phone.replace(/\+/g, '')}?text=${encodeURIComponent(t.hero.whatsappMessage || SITE_CONFIG.contact.whatsappMessage)}`

    // Mapeamento dinâmico de headlines em duas linhas por idioma
    const headlineMap = {
        en: {
            line1: "Got a project in mind?",
            line2: "Let's build something great"
        },
        pt: {
            line1: "Tem um projeto em mente?",
            line2: "Vamos criar algo incrível"
        },
        es: {
            line1: "¿Tienes un proyecto en mente?",
            line2: "Creemos algo increíble"
        }
    }

    const currentHeadline = headlineMap[language as Language] || headlineMap.en
    const currentLabel = language === 'pt' ? "// VAMOS CONVERSAR" : language === 'es' ? "// HABLEMOS" : "// LET'S TALK"

    const ctaTextMap = {
        pt: "Falar no WhatsApp",
        en: "Talk on WhatsApp",
        es: "Hablar por WhatsApp"
    }
    const currentCtaText = ctaTextMap[language as Language] || ctaTextMap.en
    const githubLabel = language === 'pt' ? "GitHub de Alex Lima" : language === 'es' ? "GitHub de Alex Lima" : "Alex Lima on GitHub"
    const linkedinLabel = language === 'pt' ? "LinkedIn de Alex Lima" : language === 'es' ? "LinkedIn de Alex Lima" : "Alex Lima on LinkedIn"
    const emailLabel = language === 'pt'
        ? `Enviar e-mail para ${SITE_CONFIG.contact.email}`
        : language === 'es'
            ? `Enviar correo a ${SITE_CONFIG.contact.email}`
            : `Email ${SITE_CONFIG.contact.email}`

    return (
        <section id="contact" className="w-full min-h-[85vh] flex items-center justify-start relative overflow-hidden py-24 sm:py-32 bg-[#f8f9fa] dark:bg-transparent transition-colors duration-300">
            {/* Noise texture overlay */}
            <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] pointer-events-none z-0" />

            {/* Ambient gradients */}
            <div 
                className="absolute inset-0 pointer-events-none z-0" 
                style={{
                    backgroundImage: `
                        radial-gradient(ellipse at center, rgba(6, 182, 212, 0.08) 0%, transparent 70%),
                        radial-gradient(ellipse at top, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
                    `
                }}
            />

            {/* Ambient blur effects - Aurora Mesh Blobs com movimento suave */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none z-0 will-change-transform"
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, -60, 40, 0],
                    scale: [1, 1.05, 0.95, 1]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-[100px] pointer-events-none z-0 will-change-transform"
                animate={{
                    x: [0, -40, 50, 0],
                    y: [0, 50, -20, 0],
                    scale: [1, 0.95, 1.05, 1]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 dark:bg-cyan-400/[0.02] rounded-full blur-[120px] pointer-events-none z-0 will-change-transform"
                animate={{
                    x: [0, 30, -40, 0],
                    y: [0, -30, 30, 0],
                    scale: [1, 1.02, 0.98, 1]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
            />

            <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 w-full">
                <motion.div
                    className="max-w-3xl text-left space-y-10"
                    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="space-y-4">
                        <span className="text-cyan-500 dark:text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase font-mono block">
                            {currentLabel}
                        </span>
                        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15] flex flex-col gap-2">
                            <span>{currentHeadline.line1}</span>
                            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
                                {currentHeadline.line2}
                            </span>
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg sm:text-xl max-w-2xl leading-relaxed pt-2 font-sans">
                            {t.footer.ctaDescription || t.contact.description}
                        </p>
                    </div>

                    {/* Direct WhatsApp Action Button with Shimmer border */}
                    <div className="pt-4 flex flex-col sm:flex-row items-start justify-start gap-4">
                        <div className="relative group/btn cursor-pointer inline-block">
                            {/* Shimmer Border Wrapper - Rounded Full */}
                            <div className="absolute -inset-[1.8px] rounded-full overflow-hidden opacity-90 pointer-events-none group-hover/btn:opacity-100 transition-opacity duration-300">
                                <motion.div
                                    className="w-[200%] h-[200%] absolute top-[-50%] left-[-50%] will-change-transform"
                                    style={{ background: "conic-gradient(from 0deg, transparent, #06b6d4, transparent, #3b82f6, transparent)" }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                            
                            <motion.a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative flex items-center justify-center gap-3.5 px-10 py-5 text-lg rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold transition-all duration-300 shadow-[0_0_40px_rgba(6,182,212,0.25)] dark:shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.45)] group cursor-pointer"
                                whileHover={{ scale: 1.025 }}
                                whileTap={{ scale: 0.975 }}
                            >
                                <MessageSquare className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                                <span>{currentCtaText}</span>
                                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Divider Elegante acima das Redes Sociais */}
                    <div className="pt-6 space-y-8">
                        <div className="w-24 h-px bg-gradient-to-r from-cyan-500 to-transparent" />

                        {/* Social Links & Alternative Contact */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-8 pt-2">
                            <div className="flex items-center gap-8">
                                <div className="flex flex-col items-center gap-2 group/social">
                                    <motion.a
                                        href={SITE_CONFIG.social.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={githubLabel}
                                        className="h-12 w-12 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                                        whileHover={{ y: -4 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Github className="h-5.5 w-5.5" />
                                    </motion.a>
                                    <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 dark:text-zinc-500 font-semibold transition-colors duration-300 group-hover/social:text-cyan-600 dark:group-hover/social:text-cyan-400">
                                        GitHub
                                    </span>
                                </div>

                                <div className="flex flex-col items-center gap-2 group/social">
                                    <motion.a
                                        href={SITE_CONFIG.social.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={linkedinLabel}
                                        className="h-12 w-12 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                                        whileHover={{ y: -4 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Linkedin className="h-5.5 w-5.5" />
                                    </motion.a>
                                    <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 dark:text-zinc-500 font-semibold transition-colors duration-300 group-hover/social:text-cyan-600 dark:group-hover/social:text-cyan-400">
                                        LinkedIn
                                    </span>
                                </div>

                                <div className="flex flex-col items-center gap-2 group/social">
                                    <motion.a
                                        href={`mailto:${SITE_CONFIG.contact.email}`}
                                        aria-label={emailLabel}
                                        className="h-12 w-12 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                                        whileHover={{ y: -4 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Mail className="h-5.5 w-5.5" />
                                    </motion.a>
                                    <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 dark:text-zinc-500 font-semibold transition-colors duration-300 group-hover/social:text-cyan-600 dark:group-hover/social:text-cyan-400">
                                        E-mail
                                    </span>
                                </div>
                            </div>
                            
                            {/* Divider vertical no desktop, espaçamento no mobile */}
                            <div className="hidden sm:block w-px h-8 bg-zinc-200 dark:bg-white/10 mx-2" />
                            
                            {/* Dialable Phone Link */}
                            <div className="flex flex-col justify-center sm:justify-start items-start gap-1">
                                <span className="text-[9px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase font-semibold">
                                    {`// ${language === 'pt' ? "TELEFONE DIRETO" : language === 'es' ? "TELÉFONO DIRECTO" : "DIRECT LINE"}`}
                                </span>
                                <a 
                                    href={`tel:${SITE_CONFIG.contact.phone}`} 
                                    className="text-base font-mono font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 underline-offset-4 hover:underline transition-colors duration-200 cursor-pointer"
                                >
                                    {SITE_CONFIG.contact.phoneDisplay}
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
