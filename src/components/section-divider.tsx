"use client"

import { cn } from "@/lib/utils"

interface SectionDividerProps {
    variant?: "gradient" | "line" | "dot"
    className?: string
}

export function SectionDivider({ variant = "gradient", className }: SectionDividerProps) {
    if (variant === "dot") {
        return (
            <div className={cn("flex items-center justify-center gap-2 py-8", className)}>
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/20" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
            </div>
        )
    }

    if (variant === "line") {
        return (
            <div className={cn("flex items-center justify-center py-8", className)}>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-muted-foreground/25 to-transparent" />
            </div>
        )
    }

    // Default: gradient
    return (
        <div className={cn("relative py-4", className)}>
            <div className="mx-auto h-px max-w-xl bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
    )
}
