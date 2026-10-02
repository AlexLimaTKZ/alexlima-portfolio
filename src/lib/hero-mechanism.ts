export const ARMOR_TIMING = {
    charge: 1.8,
    unlock: 0.28,
    open: 1.08,
    suspension: 0.65,
    ascent: 2.55,
    infusion: 1.45,
    close: 0.92,
} as const

export type HeroMechanismState = {
    charge: number
    unlock: number
    open: number
    ascent: number
    infusion: number
    alignment: number
    hover: number
    x: number
    y: number
}

export function panelProgress(value: number, start: number, end: number) {
    const t = Math.max(0, Math.min(1, (value - start) / (end - start)))
    return t * t * (3 - 2 * t)
}
