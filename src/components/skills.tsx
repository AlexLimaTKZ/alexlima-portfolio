"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import TechnologiesCarousel from "./technologies-carousel"

export function Skills() {
    const { t } = useLanguage()

    return (
        <section id="skills" className="container py-24 sm:py-32 mx-auto px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
            >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{t.skills.title}</h2>
                <p className="text-muted-foreground text-lg max-w-[800px] mx-auto">
                    {t.skills.description}
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <TechnologiesCarousel />
            </motion.div>
        </section>
    )
}
