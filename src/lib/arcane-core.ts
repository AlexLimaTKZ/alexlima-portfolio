import * as THREE from "three"
import { monogramPieces } from "@/lib/monogram"
import { insetPolygon } from "@/lib/armor-geometry"
import { arcaneNoiseShader } from "@/lib/arcane-field"
import type { HeroMechanismState } from "@/lib/hero-mechanism"

const vertexShader = /* glsl */ `
    varying vec3 vLocal;
    varying vec3 vFacing;
    varying vec2 vUv;
    void main() {
        vLocal = position;
        vFacing = normalize(normalMatrix * normal);
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

const coreFragment = /* glsl */ `
    varying vec3 vLocal;
    varying vec3 vFacing;
    uniform float uTime;
    uniform float uInfusion;
    ${arcaneNoiseShader}
    void main() {
        float front = 1.5 - uInfusion * 3.15;
        float filled = smoothstep(front - 0.12, front + 0.12, vLocal.y);
        if (filled < 0.005) discard;
        vec2 p = vLocal.xy;
        float cloud = fbm(p * 3.6 + vec2(uTime * 0.12, uTime * 0.55));
        float streams = fbm(p * vec2(14.0, 6.0) + vec2(cloud * 2.0, uTime * 0.85));
        float current = smoothstep(0.36, 0.73, streams);
        float hotFront = exp(-abs(vLocal.y - front) * 12.0);
        float facing = 0.72 + abs(vFacing.z) * 0.28;
        float pulse = 0.97 + sin(uTime * 1.25) * 0.03;
        vec3 body = mix(vec3(0.035, 0.5, 0.11), vec3(0.58, 1.0, 0.31), current);
        body += vec3(0.38, 0.55, 0.24) * hotFront;
        gl_FragColor = vec4(body * facing * pulse, filled * smoothstep(0.0, 0.12, uInfusion));
        #include <colorspace_fragment>
    }
`

// Analytic distance to the original AL outline provides a soft halo without a bloom render pass.
const distances = monogramPieces.map((points, index) => /* glsl */ `
    float glyph${index}(vec2 p) {
        vec2 vertices[${points.length}];
        ${points.map(([x, y], i) => `vertices[${i}] = vec2(${x.toFixed(4)}, ${y.toFixed(4)});`).join("\n")}
        float d = dot(p - vertices[0], p - vertices[0]);
        float s = 1.0;
        for (int i = 0, j = ${points.length - 1}; i < ${points.length}; j = i, i++) {
            vec2 e = vertices[j] - vertices[i], w = p - vertices[i];
            vec2 b = w - e * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);
            d = min(d, dot(b, b));
            bvec3 c = bvec3(p.y >= vertices[i].y, p.y < vertices[j].y, e.x * w.y > e.y * w.x);
            if (all(c) || all(not(c))) s = -s;
        }
        return s * sqrt(d);
    }
`).join("\n")

const haloFragment = /* glsl */ `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uInfusion;
    ${distances}
    void main() {
        vec2 p = (vUv - 0.5) * vec2(4.8, 3.9);
        float d = min(min(glyph0(p), glyph1(p)), min(glyph2(p), glyph3(p)));
        float front = 1.5 - uInfusion * 3.15;
        float filled = smoothstep(front - 0.2, front + 0.2, p.y);
        float halo = exp(-max(0.0, d) * 11.0) * 0.2 + exp(-max(0.0, d) * 3.6) * 0.045;
        float pulse = 0.96 + sin(uTime * 1.25) * 0.04;
        gl_FragColor = vec4(0.12, 0.83, 0.15, halo * filled * uInfusion * pulse);
        #include <colorspace_fragment>
    }
`

export function createArcaneCore(sculpture: THREE.Group) {
    const group = new THREE.Group()
    sculpture.add(group)
    group.visible = false
    const uniforms = { uTime: { value: 0 }, uInfusion: { value: 0 } }
    const material = new THREE.ShaderMaterial({
        uniforms, vertexShader, fragmentShader: coreFragment,
        transparent: true, toneMapped: false,
    })
    const geometries: THREE.BufferGeometry[] = []
    monogramPieces.forEach((points, index) => {
        const shape = new THREE.Shape()
        insetPolygon(points, 0.118).forEach(([x, y], i) => i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y))
        shape.closePath()
        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 0.17, bevelEnabled: true, bevelSize: 0.018, bevelThickness: 0.01,
            bevelSegments: 2, steps: 1, curveSegments: 1,
        })
        geometry.translate(0, 0, -0.085)
        geometries.push(geometry)
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(-0.12, 0, index === 3 ? -0.34 : index === 2 ? 0.022 : 0)
        group.add(mesh)
    })
    const haloMaterial = new THREE.ShaderMaterial({
        uniforms, vertexShader, fragmentShader: haloFragment,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
    })
    const haloGeometry = new THREE.PlaneGeometry(4.8, 3.9)
    const halo = new THREE.Mesh(haloGeometry, haloMaterial)
    halo.position.set(-0.12, 0, -0.76)
    group.add(halo)
    return {
        update(time: number, state: HeroMechanismState, active: boolean) {
            const infusion = active ? state.infusion : 0
            group.visible = infusion > 0.002
            uniforms.uTime.value = time
            uniforms.uInfusion.value = infusion
        },
        dispose() {
            sculpture.remove(group)
            geometries.forEach(geometry => geometry.dispose())
            haloGeometry.dispose()
            material.dispose()
            haloMaterial.dispose()
        },
    }
}
