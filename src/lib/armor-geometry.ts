export type ArmorPoint = readonly [number, number]
export type ArmorPolygon = readonly ArmorPoint[]

export function polygonArea(points: ArmorPolygon) {
    return points.reduce((area, [x, y], i) => {
        const [nx, ny] = points[(i + 1) % points.length]
        return area + x * ny - nx * y
    }, 0) / 2
}

// Offset each edge inward, preserving the angular cuts of the AL (including the L's concave corner).
export function insetPolygon(points: ArmorPolygon, distance: number): ArmorPoint[] {
    const winding = Math.sign(polygonArea(points))
    const edges = points.map(([x, y], index) => {
        const [nx, ny] = points[(index + 1) % points.length]
        const dx = nx - x, dy = ny - y
        const length = Math.hypot(dx, dy)
        return { x: x - dy / length * winding * distance, y: y + dx / length * winding * distance, dx, dy }
    })
    return edges.map((edge, i) => {
        const before = edges[(i + edges.length - 1) % edges.length]
        const cross = before.dx * edge.dy - before.dy * edge.dx
        if (Math.abs(cross) < 0.00001) return [edge.x, edge.y] as const
        const t = ((edge.x - before.x) * edge.dy - (edge.y - before.y) * edge.dx) / cross
        return [before.x + before.dx * t, before.y + before.dy * t] as const
    })
}

export function clipPolygonY(points: ArmorPolygon, minimum: number, maximum: number): ArmorPoint[] {
    const clip = (polygon: ArmorPolygon, limit: number, above: boolean): ArmorPoint[] => {
        const result: ArmorPoint[] = []
        polygon.forEach((point, i) => {
            const previous = polygon[(i + polygon.length - 1) % polygon.length]
            const inside = above ? point[1] >= limit : point[1] <= limit
            const previousInside = above ? previous[1] >= limit : previous[1] <= limit
            if (inside !== previousInside) {
                const t = (limit - previous[1]) / (point[1] - previous[1])
                result.push([previous[0] + (point[0] - previous[0]) * t, limit])
            }
            if (inside) result.push(point)
        })
        return result
    }
    return clip(clip(points, minimum, true), maximum, false)
}
