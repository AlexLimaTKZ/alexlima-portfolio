"use client"

import { useLanguage } from "@/components/language-provider"

export function Footer() {
    const { t } = useLanguage()

    return (
        <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4 md:px-8">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © {new Date().getFullYear()} Alex Lima. {t.footer.rights}
                </p>

            </div>
        </footer>
    )
}
