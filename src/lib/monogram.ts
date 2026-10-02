// A bespoke, open-cut AL monogram. Shared by the loader and the 3D sculpture.
export const monogramPieces = [
    [[-1.6, -1.2], [-0.65, 1.2], [-0.22, 1.2], [-1.16, -1.2]],
    [[-0.46, 1.2], [-0.03, 1.2], [0.92, -1.2], [0.48, -1.2]],
    [[-1.01, -0.39], [0.15, -0.39], [0.3, -0.77], [-1.16, -0.77]],
    [[0.64, 1.2], [1.07, 1.2], [0.28, -0.81], [1.91, -0.81], [1.76, -1.2], [-0.29, -1.2]],
] as const

export const monogramPaths = monogramPieces.map(points =>
    points.map(([x, y], index) => `${index ? "L" : "M"}${(x + 1.8) * 50},${(1.45 - y) * 50}`).join(" ") + " Z"
)
