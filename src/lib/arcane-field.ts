import * as THREE from "three"
import type { HeroMechanismState } from "@/lib/hero-mechanism"

const vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

// Small, continuous noise fields keep the energy organic without downloaded textures.
export const arcaneNoiseShader = /* glsl */ `
    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0)), f.x), f.y);
    }
    float fbm(vec2 p) {
        float value = 0.0;
        float weight = 0.5;
        mat2 turn = mat2(0.8, -0.6, 0.6, 0.8);
        for (int i = 0; i < 4; i++) {
            value += noise(p) * weight;
            p = turn * p * 2.03 + vec2(13.4, 7.8);
            weight *= 0.5;
        }
        return value;
    }
`

const ringShader = /* glsl */ `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uFlow;
    uniform float uStrength;
    uniform float uSeed;
    ${arcaneNoiseShader}
    void main() {
        vec2 p = vUv * 2.0 - 1.0;
        float r = length(p);
        if (r < 0.48 || r > 0.98) discard;
        float angle = atan(p.y, p.x);
        // Cartesian noise avoids an angular seam where the ring closes.
        vec2 orbit = vec2(cos(angle + uFlow), sin(angle + uFlow));
        float current = fbm(orbit * 5.5 + vec2(uSeed, uTime * 0.18));
        float wave = sin(angle * 9.0 + uFlow * 2.0) * 0.004;
        float distanceToRing = abs(r - 0.76 - (current - 0.5) * 0.025 - wave);
        float filament = exp(-distanceToRing * 220.0);
        float body = exp(-distanceToRing * 52.0);
        float halo = exp(-distanceToRing * 18.0);
        float fragments = smoothstep(0.28, 0.71, current);
        float detail = fbm(p * 42.0 + orbit * uTime * 0.09 + uSeed);
        float ember = pow(smoothstep(0.46, 0.79, detail), 3.0) * body;
        float a = filament * (0.2 + fragments * 0.7)
                + body * fragments * detail * 0.65 + halo * 0.055 + ember * 0.5;
        vec3 color = mix(vec3(0.025, 0.48, 0.13), vec3(0.56, 1.0, 0.18),
                         clamp(filament * fragments + ember, 0.0, 1.0));
        gl_FragColor = vec4(color, a * uStrength);
        #include <colorspace_fragment>
    }
`

const mistShader = /* glsl */ `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uFlow;
    uniform float uStrength;
    uniform float uCharge;
    uniform float uOpen;
    uniform float uSeed;
    ${arcaneNoiseShader}
    void main() {
        vec2 p = vUv * 2.0 - 1.0;
        // A pair of rising, curled plumes wraps the sides, leaving the AL readable.
        float height = smoothstep(-0.9, -0.54, p.y) * (1.0 - smoothstep(0.35, 0.85, p.y));
        float curl = sin(p.y * 5.0 - uFlow * 0.55 + uSeed) * 0.065;
        float spread = 0.52 - uCharge * (1.0 - uOpen) * 0.1 + uOpen * 0.14;
        float left = exp(-pow((p.x + spread + curl) * 6.4, 2.0));
        float right = exp(-pow((p.x - spread - curl) * 6.4, 2.0));
        float base = exp(-pow((p.y + 0.65) * 8.0, 2.0)) * exp(-p.x * p.x * 2.8);
        vec2 drift = vec2(uFlow * 0.075, -uTime * 0.32 - uCharge * 0.25);
        float warp = fbm(p * 3.0 + drift + uSeed);
        float cloud = fbm(p * vec2(6.0, 4.0) + drift + vec2(warp * 2.0));
        float threads = fbm(p * vec2(18.0, 9.0) + drift * 1.3 + cloud);
        float plume = (left + right) * height;
        float density = smoothstep(0.28, 0.76, cloud) * (0.25 + threads * 0.75);
        float a = (plume * 0.6 + base * 0.32) * density;
        float hot = smoothstep(0.57, 0.82, threads) * plume;
        vec3 color = mix(vec3(0.018, 0.3, 0.11), vec3(0.22, 0.88, 0.13), hot);
        gl_FragColor = vec4(color, a * uStrength);
        #include <colorspace_fragment>
    }
`

const particleVertex = /* glsl */ `
    attribute float aSize;
    attribute float aOpacity;
    uniform float uPixelRatio;
    varying float vOpacity;
    void main() {
        vOpacity = aOpacity;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = clamp(aSize * uPixelRatio * (5.6 / -mv.z), 1.0, 9.0);
        gl_Position = projectionMatrix * mv;
    }
`

const columnShader = /* glsl */ `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uStrength;
    uniform float uInfusion;
    ${arcaneNoiseShader}
    void main() {
        vec2 p = (vUv - 0.5) * vec2(3.8, 3.5) + vec2(0.0, 0.35);
        float front = 2.1 - uInfusion * 3.8;
        float descent = smoothstep(front - 0.22, front + 0.22, p.y);
        float taper = smoothstep(-1.4, -1.12, p.y) * (1.0 - smoothstep(1.6, 2.08, p.y));
        float width = mix(0.34, 0.95, 1.0 - smoothstep(-1.1, 1.65, p.y));
        float curl = sin(p.y * 3.0 + uTime * 0.45) * 0.07;
        float envelope = exp(-pow((p.x + curl) / width, 2.0) * 2.0);
        vec2 drift = vec2(uTime * 0.07, uTime * 0.68);
        float warp = fbm(p * 3.4 + drift);
        float cloud = fbm(p * vec2(7.0, 3.0) + drift + warp * 1.9);
        float threads = fbm(p * vec2(19.0, 5.0) + drift * 1.3 + cloud);
        float density = smoothstep(0.27, 0.76, cloud) * (0.2 + threads * 0.8);
        float hot = smoothstep(0.5, 0.79, threads);
        vec3 color = mix(vec3(0.025, 0.45, 0.12), vec3(0.49, 1.0, 0.23), hot);
        gl_FragColor = vec4(color, envelope * density * descent * taper * uStrength);
        #include <colorspace_fragment>
    }
`

const particleFragment = /* glsl */ `
    varying float vOpacity;
    uniform float uStrength;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        if (r > 1.0) discard;
        float core = exp(-r * r * 12.0);
        float halo = exp(-r * r * 3.5) * 0.3;
        gl_FragColor = vec4(mix(vec3(0.12, 0.65, 0.14), vec3(0.68, 1.0, 0.36), core),
                            (core + halo) * vOpacity * uStrength);
        #include <colorspace_fragment>
    }
`

export function createArcaneField(scene: THREE.Scene, coarse: boolean, pixelRatio: number, panelCount = 32) {
    const group = new THREE.Group()
    scene.add(group)
    const geometry = new THREE.PlaneGeometry(2, 2)
    const materials: THREE.ShaderMaterial[] = []
    const createMaterial = (fragmentShader: string, seed: number) => {
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 }, uFlow: { value: 0 }, uStrength: { value: 0 },
                uCharge: { value: 0 }, uOpen: { value: 0 }, uInfusion: { value: 0 }, uSeed: { value: seed },
            },
            vertexShader, fragmentShader,
            transparent: true, depthWrite: false, side: THREE.DoubleSide, forceSinglePass: true,
            blending: THREE.AdditiveBlending, toneMapped: false,
        })
        materials.push(material)
        return material
    }
    const rings = [0, 1].map(index => {
        const mesh = new THREE.Mesh(geometry, createMaterial(ringShader, index * 19.7))
        mesh.rotation.x = -1.28
        group.add(mesh)
        return mesh
    })
    // Separate back/front veils give depth. The front veil is deliberately much quieter.
    const mist = [-0.7, 0.9].map((z, index) => {
        const mesh = new THREE.Mesh(geometry, createMaterial(mistShader, index * 13.4))
        mesh.position.set(0, -0.12, z)
        mesh.scale.set(index ? 2.25 : 2.55, 1.85, 1)
        group.add(mesh)
        return mesh
    })
    const column = new THREE.Mesh(geometry, createMaterial(columnShader, 0))
    column.position.set(0, 0.35, -0.56)
    column.scale.set(1.9, 1.75, 1)
    column.visible = false
    group.add(column)
    const count = coarse ? 52 : 88
    const positions = new Float32Array(count * 3)
    const opacity = new Float32Array(count)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) sizes[i] = 1.6 + (i * 0.618 % 1) * 4.5
    const particlesGeometry = new THREE.BufferGeometry()
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage))
    particlesGeometry.setAttribute("aOpacity", new THREE.BufferAttribute(opacity, 1).setUsage(THREE.DynamicDrawUsage))
    particlesGeometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1))
    const particlesMaterial = new THREE.ShaderMaterial({
        uniforms: { uStrength: { value: 0 }, uPixelRatio: { value: pixelRatio } },
        vertexShader: particleVertex, fragmentShader: particleFragment,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
    })
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    // Positions are updated in-place, so a stale initial bounding sphere must not cull them.
    particles.frustumCulled = false
    group.add(particles)
    const sparksPerPlate = coarse ? 2 : 4
    const trailCount = panelCount * sparksPerPlate
    const trailPositions = new Float32Array(trailCount * 3)
    const trailOpacity = new Float32Array(trailCount)
    const trailSizes = new Float32Array(trailCount)
    for (let i = 0; i < trailCount; i++) trailSizes[i] = 1.5 + (i * 0.618 % 1) * 3.5
    const trailGeometry = new THREE.BufferGeometry()
    trailGeometry.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3).setUsage(THREE.DynamicDrawUsage))
    trailGeometry.setAttribute("aOpacity", new THREE.BufferAttribute(trailOpacity, 1).setUsage(THREE.DynamicDrawUsage))
    trailGeometry.setAttribute("aSize", new THREE.BufferAttribute(trailSizes, 1))
    const trailMaterial = particlesMaterial.clone()
    const trails = new THREE.Points(trailGeometry, trailMaterial)
    trails.frustumCulled = false
    trails.visible = false
    group.add(trails)
    const anchorPosition = new THREE.Vector3()
    const fieldLight = new THREE.PointLight(0x59ed71, 0, 7, 2)
    fieldLight.position.set(0, -1.1, 1.1)
    scene.add(fieldLight)
    let strength = 0, flow = 0, previousTime = 0, flight = 0
    group.visible = false

    return {
        update(time: number, state: HeroMechanismState, active: boolean, anchors?: Float32Array, matrix?: THREE.Matrix4) {
            const delta = previousTime ? Math.min(0.05, Math.max(0, time - previousTime)) : 0
            previousTime = time
            const target = Math.min(1, state.hover * 0.58 + state.charge * 0.74 + state.open * 0.3)
            // Fade in/out smoothly, but honor pause and reduced motion immediately.
            strength = active ? THREE.MathUtils.lerp(strength, target, 1 - Math.exp(-delta * 7)) : 0
            group.visible = strength > 0.003
            fieldLight.intensity = strength * (2.8 + state.charge * 2.4)
            if (!group.visible) return { strength: 0, flow }
            flow += delta * (0.24 + state.charge * 1.5 + state.open * 0.45)
            flight += delta * (0.1 + state.charge * 0.16 + state.open * 0.04)
            column.visible = state.infusion > 0.002
            column.material.uniforms.uTime.value = time
            column.material.uniforms.uInfusion.value = state.infusion
            column.material.uniforms.uStrength.value = strength * Math.min(1, state.infusion * 3) * (1.45 + Math.sin(time * 1.25) * 0.06)
            const contraction = state.charge * (1 - state.open) * 0.1
            const expansion = state.open * 0.2
            rings.forEach((mesh, index) => {
                const radius = (index ? 1.73 : 2.22) * (1 - contraction + expansion)
                mesh.scale.setScalar(radius)
                mesh.position.set(0, -0.98 + index * 0.08 + state.open * 0.04, 0)
                mesh.rotation.z = (index ? -flow * 0.4 : flow * 0.32)
                mesh.material.uniforms.uTime.value = time
                mesh.material.uniforms.uFlow.value = flow * (index ? -1 : 1)
                mesh.material.uniforms.uStrength.value = strength * (index ? 0.68 : 0.9)
            })
            mist.forEach((mesh, index) => {
                const u = mesh.material.uniforms
                u.uTime.value = time; u.uFlow.value = flow
                u.uStrength.value = strength * (index ? 0.38 : 1.05)
                u.uCharge.value = state.charge; u.uOpen.value = state.open
                mesh.scale.x = (index ? 2.25 : 2.55) * (1 + state.open * 0.08)
            })
            for (let i = 0; i < count; i++) {
                const seed = i * 0.61803398875 % 1
                const progress = (flight * (0.74 + seed * 0.5) + seed) % 1
                const angle = i * 2.39996 + flow * (i % 2 ? 0.7 : -0.48) + progress * 0.5
                const radius = (1.14 + (i * 0.4142 % 1) * 0.59) * (1 - contraction + expansion)
                             * (1 - progress * 0.32);
                const offset = i * 3
                positions[offset] = Math.cos(angle) * radius
                positions[offset + 1] = -1.05 + progress * (1.45 + seed * 0.9)
                positions[offset + 2] = Math.sin(angle) * radius * 0.66
                opacity[i] = Math.sin(progress * Math.PI) ** 1.5 * (0.28 + seed * 0.6)
            }
            particlesGeometry.attributes.position.needsUpdate = true
            particlesGeometry.attributes.aOpacity.needsUpdate = true
            particlesMaterial.uniforms.uStrength.value = strength
            trails.visible = state.ascent > 0.001 && state.ascent < 0.999 && !!anchors && !!matrix
            if (trails.visible && anchors && matrix) {
                for (let i = 0; i < trailCount; i++) {
                    const anchor = Math.floor(i / sparksPerPlate) * 4
                    const seed = i * 2.399
                    const tail = (time * 0.8 + i * 0.618 % 1) % 1
                    anchorPosition.set(anchors[anchor] + Math.sin(seed + time) * 0.045,
                        anchors[anchor + 1] - tail * 0.52, anchors[anchor + 2] + Math.cos(seed) * 0.04).applyMatrix4(matrix)
                    anchorPosition.toArray(trailPositions, i * 3)
                    trailOpacity[i] = anchors[anchor + 3] * (1 - tail) * 0.7
                }
                trailGeometry.attributes.position.needsUpdate = true
                trailGeometry.attributes.aOpacity.needsUpdate = true
                trailMaterial.uniforms.uStrength.value = strength
            }
            return { strength, flow }
        },
        dispose() {
            scene.remove(group, fieldLight)
            geometry.dispose()
            particlesGeometry.dispose()
            particlesMaterial.dispose()
            trailGeometry.dispose()
            trailMaterial.dispose()
            materials.forEach(material => material.dispose())
        },
    }
}
