import * as THREE from "three"
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js"
import { monogramPieces } from "@/lib/monogram"
import { clipPolygonY, insetPolygon, polygonArea, type ArmorPolygon } from "@/lib/armor-geometry"
import { panelProgress, type HeroMechanismState } from "@/lib/hero-mechanism"
import { createArcaneField } from "@/lib/arcane-field"
import { createArcaneCore } from "@/lib/arcane-core"

// Loaded separately: the server/critical bundle never creates a WebGL context.
export function createHeroScene(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("webgl2", { alpha: true, antialias: true, powerPreference: "low-power" })
    if (!context) return null
    const renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.matchMedia("(pointer: coarse)").matches ? 1.25 : 1.75))
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50)
    camera.position.set(0, 0.05, 6.7)
    const pmrem = new THREE.PMREMGenerator(renderer)
    const room = new RoomEnvironment()
    const environment = pmrem.fromScene(room, 0.04)
    scene.environment = environment.texture
    room.dispose()
    pmrem.dispose()

    // A tiny procedural roughness texture provides a brushed finish without downloading an asset.
    const brushPixels = new Uint8Array(128 * 64 * 4)
    for (let y = 0; y < 64; y++) {
        const grain = Math.sin(y * 9.7) * 6 + Math.sin(y * 2.7) * 4
        for (let x = 0; x < 128; x++) {
            const value = 180 + grain + Math.sin(x * 7.1 + y * 3.1) * 2
            const offset = (y * 128 + x) * 4
            brushPixels[offset] = value; brushPixels[offset + 1] = value; brushPixels[offset + 2] = value; brushPixels[offset + 3] = 255
        }
    }
    const brush = new THREE.DataTexture(brushPixels, 128, 64)
    brush.wrapS = brush.wrapT = THREE.RepeatWrapping
    brush.repeat.set(2, 5)
    brush.needsUpdate = true
    const metal = new THREE.MeshPhysicalMaterial({
        color: 0x384332, metalness: 0.94, roughness: 0.6, roughnessMap: brush,
        anisotropy: 0.22, anisotropyRotation: Math.PI / 2, clearcoat: 0.12, clearcoatRoughness: 0.38, envMapIntensity: 0.65,
    })
    const silver = new THREE.MeshStandardMaterial({ color: 0x9ba497, metalness: 0.96, roughness: 0.32, envMapIntensity: 1.35 })
    const graphite = new THREE.MeshStandardMaterial({ color: 0x202b23, metalness: 0.8, roughness: 0.4, envMapIntensity: 1.2 })
    const chassis = new THREE.MeshStandardMaterial({ color: 0x273c2b, metalness: 0.68, roughness: 0.4 })
    const energy = new THREE.MeshStandardMaterial({ color: 0x9fc771, emissive: 0xbde982, emissiveIntensity: 0.12, metalness: 0.3, roughness: 0.25 })
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xabc39b, transparent: true, opacity: 0.22 })
    const light = new THREE.PointLight(0xd1ee95, 14, 20, 2)
    light.position.set(-2, 1.5, 3)
    const rim = new THREE.PointLight(0x98c9b0, 18, 20, 2)
    rim.position.set(3, -1, 2)
    const top = new THREE.DirectionalLight(0xf4f3ec, 2.3)
    top.position.set(0, 4, 2)
    scene.add(light, rim, top)

    canvas.dataset.energyEffect = "arcane"

    const sculpture = new THREE.Group()
    scene.add(sculpture)
    const arcaneCore = createArcaneCore(sculpture)
    const geometries: THREE.BufferGeometry[] = []
    const unitBox = new THREE.BoxGeometry(1, 1, 1)
    const pistonGeometry = new THREE.CylinderGeometry(0.014, 0.014, 1, 6)
    const sleeveGeometry = new THREE.CylinderGeometry(0.024, 0.024, 1, 6)
    const boltGeometry = new THREE.SphereGeometry(0.027, 6, 4)
    geometries.push(unitBox, pistonGeometry, sleeveGeometry, boltGeometry)
    const shapeFrom = (points: ArmorPolygon) => {
        const shape = new THREE.Shape()
        points.forEach(([x, y], i) => i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y))
        shape.closePath()
        return shape
    }
    const extrude = (shape: THREE.Shape, depth: number, bevel: number) => {
        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth, bevelEnabled: bevel > 0, bevelSize: bevel, bevelThickness: bevel,
            bevelSegments: 2, steps: 1, curveSegments: 1,
        })
        geometry.translate(0, 0, -depth / 2)
        geometries.push(geometry)
        return geometry
    }
    const frameShape = (points: ArmorPolygon, outer: number, inner: number) => {
        const shape = shapeFrom(insetPolygon(points, outer))
        const hole = new THREE.Path()
        insetPolygon(points, inner).forEach(([x, y], i) => i === 0 ? hole.moveTo(x, y) : hole.lineTo(x, y))
        hole.closePath()
        shape.holes.push(hole)
        return shape
    }
    type Panel = {
        group: THREE.Group
        base: THREE.Vector3
        direction: THREE.Vector3
        rotation: THREE.Vector3
        start: number
        end: number
        kind: "front" | "back" | "side"
        angle: number
        piston?: THREE.Mesh
        sleeve?: THREE.Mesh
        launch?: { start: number; end: number; seed: number; fade: { value: number }; materials: { material: THREE.Material; opacity: number }[] }
    }
    const panels: Panel[] = []
    const energyNodes: THREE.Mesh[] = []
    let frontCount = 0
    const makeSkin = (points: ArmorPolygon, index: number, front: boolean, order: number) => {
        const geometry = extrude(shapeFrom(points), front ? 0.075 : 0.065, 0.013)
        geometry.computeBoundingBox()
        const center = geometry.boundingBox!.getCenter(new THREE.Vector3())
        geometry.translate(-center.x, -center.y, 0)
        const group = new THREE.Group()
        const base = new THREE.Vector3(center.x - 0.12, center.y, (index === 3 ? -0.34 : index === 2 ? 0.022 : 0) + (front ? 0.186 : -0.186))
        group.position.copy(base)
        group.add(new THREE.Mesh(geometry, front ? [metal, silver] : graphite))
        const edges = new THREE.EdgesGeometry(geometry, 40)
        geometries.push(edges)
        group.add(new THREE.LineSegments(edges, edgeMaterial))
        sculpture.add(group)
        const side = index === 0 ? -1 : index === 3 ? 1 : index === 2 ? -0.35 : 0.55
        const vertical = index === 2 ? -0.42 : Math.sign(center.y) * 0.15
        const direction = front
            ? new THREE.Vector3(side * (index === 3 ? 0.66 : 0.59), vertical, 0.64 + order * 0.035)
            : new THREE.Vector3(side * 0.12, 0, -0.35)
        const panel: Panel = {
            group, base, direction, kind: front ? "front" : "back", angle: 0,
            rotation: new THREE.Vector3(front ? Math.sign(center.y) * 0.21 : -0.08, front ? side * -0.28 : side * 0.09, front ? side * 0.075 : 0),
            start: front ? 0.19 + order * 0.026 : 0.26 + index * 0.025,
            end: front ? 0.77 + order * 0.024 : 0.91,
        }
        if (front) {
            const piston = new THREE.Mesh(pistonGeometry, silver)
            const sleeve = new THREE.Mesh(sleeveGeometry, graphite)
            sculpture.add(piston, sleeve)
            panel.piston = piston; panel.sleeve = sleeve
            piston.visible = sleeve.visible = false
            const bolt = new THREE.Mesh(boltGeometry, graphite)
            bolt.position.set(0, -0.06, 0.053)
            group.add(bolt)
            frontCount++
        }
        panels.push(panel)
    }

    monogramPieces.forEach((points, index) => {
        const z = index === 3 ? -0.34 : index === 2 ? 0.022 : 0
        // Fixed, hollow skeleton: the identity remains visible when the armor separates.
        const core = new THREE.Mesh(extrude(frameShape(points, 0.052, 0.148), 0.21, 0.008), chassis)
        core.position.set(-0.12, 0, z)
        sculpture.add(core)
        const circuit = new THREE.Mesh(extrude(frameShape(points, 0.071, 0.094), 0.018, 0), energy)
        circuit.position.set(-0.12, 0, z + 0.115)
        sculpture.add(circuit)
        energyNodes.push(circuit)
        const ranges = index === 2 ? [[-0.77, -0.39]] : index === 3
            ? [[-1.2, -0.83], [-0.795, 0.19], [0.22, 1.2]]
            : [[-1.2, -0.47], [-0.44, 0.35], [0.38, 1.2]]
        ranges.forEach(([minimum, maximum], order) => {
            const clipped = clipPolygonY(points, minimum, maximum)
            if (clipped.length >= 3 && Math.abs(polygonArea(clipped)) > 0.004) makeSkin(insetPolygon(clipped, 0.008), index, true, order + index * 0.8)
        })
        makeSkin(insetPolygon(points, 0.008), index, false, 0)

        const winding = Math.sign(polygonArea(points))
        points.forEach(([x, y], edge) => {
            const [nx, ny] = points[(edge + 1) % points.length]
            const dx = nx - x, dy = ny - y, length = Math.hypot(dx, dy)
            const group = new THREE.Group()
            const base = new THREE.Vector3((x + nx) / 2 - 0.12, (y + ny) / 2, z)
            group.position.copy(base)
            const angle = Math.atan2(dy, dx)
            group.rotation.z = angle
            const wall = new THREE.Mesh(unitBox, graphite)
            wall.scale.set(Math.max(0.05, length - 0.025), 0.028, 0.28)
            group.add(wall)
            sculpture.add(group)
            panels.push({
                group, base, kind: "side", angle,
                direction: new THREE.Vector3(dy / length * winding * 0.18, -dx / length * winding * 0.18, 0),
                rotation: new THREE.Vector3(edge % 2 ? 0.12 : -0.12, 0, 0),
                start: edge % 3 * 0.035, end: 0.48 + edge % 3 * 0.025,
            })
        })
    })
    canvas.dataset.frontPanels = String(frontCount)
    canvas.dataset.armorPanels = String(panels.length)

    const panelMaterials: THREE.Material[] = []
    const frontOrder = panels.filter(panel => panel.kind === "front").sort((a, b) => b.base.y - a.base.y || a.base.x - b.base.x)
    panels.forEach((panel, index) => {
        const rank = panel.kind === "front" ? frontOrder.indexOf(panel)
            : Math.min(9, Math.max(0, (1.2 - panel.base.y) / 2.4 * 9))
        const fade = { value: 0 }
        const fading: { material: THREE.Material; opacity: number }[] = []
        panel.launch = { start: 0.035 + rank * 0.066, end: 0.36 + rank * 0.066, seed: index * 2.399, fade, materials: fading }
        const clones = new Map<THREE.Material, THREE.Material>()
        const cloneMaterial = (original: THREE.Material) => {
            if (clones.has(original)) return clones.get(original)!
            const material = original.clone()
            // Soft fading and a green afterglow dissolve each plate without noisy pixel holes.
            material.transparent = true
            material.onBeforeCompile = shader => {
                shader.uniforms.uPanelFade = fade
                shader.fragmentShader = "uniform float uPanelFade;\n" + shader.fragmentShader
                shader.fragmentShader = shader.fragmentShader.replace("#include <emissivemap_fragment>", `
                    #include <emissivemap_fragment>
                    totalEmissiveRadiance += vec3(0.1, 0.65, 0.025) * uPanelFade * 0.65;
                `)
            }
            material.customProgramCacheKey = () => "al-panel-dissolve-v2"
            clones.set(original, material)
            panelMaterials.push(material)
            fading.push({ material, opacity: original.opacity })
            return material
        }
        panel.group.traverse(child => {
            if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments) {
                child.material = Array.isArray(child.material) ? child.material.map(cloneMaterial) : cloneMaterial(child.material)
            }
        })
    })
    const trailAnchors = new Float32Array(panels.length * 4)
    const arcane = createArcaneField(scene, window.matchMedia("(pointer: coarse)").matches, renderer.getPixelRatio(), panels.length)

    let width = 0, height = 0
    let rotation = -0.38, previousTime = 0
    const up = new THREE.Vector3(0, 1, 0)
    const connection = new THREE.Vector3()
    const resize = () => {
        const w = Math.max(1, canvas.clientWidth), h = Math.max(1, canvas.clientHeight)
        if (w === width && h === height) return
        width = w; height = h
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
    }
    return {
        render(time: number, state: HeroMechanismState, active = true) {
            resize()
            const delta = previousTime ? Math.max(0, Math.min(time - previousTime, 0.05)) : 0
            previousTime = time
            const facing = -0.28 + state.x * 0.06
            const difference = Math.atan2(Math.sin(facing - rotation), Math.cos(facing - rotation))
            rotation += delta * 0.17 * (1 - state.alignment) + difference * Math.min(1, delta * 6) * state.alignment
            const tremor = state.charge * state.charge * (1 - state.open) ** 2
            camera.position.z = (camera.aspect < 1 ? 8.2 : 6.7) + state.open * 0.6
            sculpture.rotation.set(-0.14 + state.y * 0.06 + Math.sin(time * 37) * tremor * 0.006, rotation, -0.12 + Math.sin(time * 43) * tremor * 0.012)
            sculpture.position.set(Math.sin(time * 41) * tremor * 0.012, Math.sin(time * 0.7) * 0.025 * (1 - state.alignment), 0)
            let movingPanels = 0
            let vanishedPanels = 0, floatingPanels = 0
            for (const [index, panel] of panels.entries()) {
                const p = panelProgress(state.open, panel.start, panel.end)
                const unlock = panel.kind === "side" ? state.unlock * 0.12 : 0
                const launch = panel.launch!
                const lift = panelProgress(state.ascent, launch.start, launch.end)
                const floating = p * (1 - lift) * state.open
                const bob = Math.sin(time * 1.7 + launch.seed) * 0.035 * floating
                panel.group.position.copy(panel.base).addScaledVector(panel.direction, p + unlock)
                panel.group.position.y += bob + lift * (2.15 + (index % 3) * 0.16)
                panel.group.position.x += Math.sin(launch.seed) * lift * 0.17
                panel.group.rotation.set(panel.rotation.x * p + Math.sin(time * 1.1 + launch.seed) * 0.014 * floating + lift * 0.26,
                    panel.rotation.y * p + lift * Math.sin(launch.seed) * 0.34,
                    panel.angle + panel.rotation.z * p + lift * Math.cos(launch.seed) * 0.18)
                launch.fade.value = panelProgress(lift, 0.2, 0.84)
                for (const fading of launch.materials) fading.material.opacity = fading.opacity * (1 - launch.fade.value)
                panel.group.visible = lift < 0.86
                if (!panel.group.visible) vanishedPanels++
                if (floating > 0.9) floatingPanels++
                const anchor = index * 4
                trailAnchors[anchor] = panel.group.position.x
                trailAnchors[anchor + 1] = panel.group.position.y
                trailAnchors[anchor + 2] = panel.group.position.z
                trailAnchors[anchor + 3] = Math.sin(lift * Math.PI) * (state.ascent > 0 ? 1 : 0)
                if (p > 0.01) movingPanels++
                if (panel.piston && panel.sleeve) {
                    const piston = panel.piston, sleeve = panel.sleeve
                    // Retract each connector before its plate starts to float away.
                    const connected = 1 - panelProgress(lift, 0, 0.14)
                    piston.visible = sleeve.visible = p > 0.02 && connected > 0.02
                    connection.copy(panel.group.position).sub(panel.base)
                    const length = Math.max(0.001, connection.length())
                    piston.scale.y = length * connected
                    piston.position.copy(panel.base).addScaledVector(connection, connected * 0.5)
                    piston.quaternion.setFromUnitVectors(up, connection.normalize())
                    sleeve.position.copy(panel.base).addScaledVector(connection, length * 0.2 * connected)
                    sleeve.scale.y = length * 0.4 * connected
                    sleeve.quaternion.copy(piston.quaternion)
                }
            }
            const intensity = state.hover * 0.18 + state.charge * 0.9 + state.open * 0.3
            energy.emissiveIntensity = 0.1 + intensity * 1.15 + state.infusion * 1.65
            chassis.emissive.setHex(state.infusion > 0 ? 0x47e55b : 0x55783d)
            chassis.emissiveIntensity = state.open * 0.18 + state.infusion * 0.85
            edgeMaterial.opacity = 0.18 + state.charge * 0.15
            light.intensity = 14 + state.charge * 8 + state.open * 6
            // Only internal geometry glows; exterior metal remains readable.
            for (const node of energyNodes) node.visible = state.open > 0.005 || state.charge > 0 || state.hover > 0.01
            canvas.dataset.movingPanels = String(movingPanels)
            canvas.dataset.vanishedPanels = String(vanishedPanels)
            canvas.dataset.floatingPanels = String(floatingPanels)
            arcaneCore.update(time, state, active)
            sculpture.updateMatrixWorld(true)
            const field = arcane.update(time, state, active, trailAnchors, sculpture.matrixWorld)
            canvas.dataset.fieldStrength = field.strength.toFixed(3)
            canvas.dataset.fieldFlow = field.flow.toFixed(3)
            renderer.render(scene, camera)
        },
        dispose() {
            arcane.dispose()
            arcaneCore.dispose()
            geometries.forEach(geometry => geometry.dispose())
            for (const material of [metal, silver, graphite, chassis, energy, edgeMaterial]) material.dispose()
            panelMaterials.forEach(material => material.dispose())
            brush.dispose()
            environment.dispose()
            renderer.dispose()
        },
    }
}
