// Tunable constants — adjust freely without touching the logic below.
const CONFIG = {
    fogColor: 0x020617,
    fogDensity: 0.09,
    cameraFov: 50,
    cameraZ: 9,
    boxCountDesktop: 28,
    boxCountMobile: 15,
    mobileBreakpoint: 768,
    keyLightColor: 0x38bdf8,
    warmLightColor: 0xf59e0b,
    cubeColor: 0x38bdf8,
    idleRotationSpeed: 0.0006,
    cubeDriftAmplitude: 0.15,
    cubeSinkY: -3.5,
};

function hasWebGL() {
    try {
        const canvas = document.createElement("canvas");
        return !!(window.WebGLRenderingContext &&
            (canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch {
        return false;
    }
}

function initScene(THREE, hero, canvas) {
    const isMobile = window.innerWidth < CONFIG.mobileBreakpoint;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(CONFIG.fogColor, CONFIG.fogDensity);

    const camera = new THREE.PerspectiveCamera(CONFIG.cameraFov, hero.clientWidth / hero.clientHeight, 0.1, 100);
    camera.position.set(0, 0, CONFIG.cameraZ);

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile });
    } catch {
        hero.classList.add("hero-fallback-active");
        return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(hero.clientWidth, hero.clientHeight);

    scene.add(new THREE.AmbientLight(0x0a1428, 0.5));

    const keyLight = new THREE.PointLight(CONFIG.keyLightColor, 6, 20);
    keyLight.position.set(-4, 3, 4);
    scene.add(keyLight);

    const warmLight = new THREE.PointLight(CONFIG.warmLightColor, 3, 15);
    warmLight.position.set(5, -2, 2);
    scene.add(warmLight);

    // Debris field — scattered thin "panels" suggesting scattered tech/circuitry
    const PALETTE = [0x0b1220, 0x111827, 0x0f172a, 0x38bdf8, 0x818cf8];
    const debrisGroup = new THREE.Group();
    const boxCount = isMobile ? CONFIG.boxCountMobile : CONFIG.boxCountDesktop;

    for (let i = 0; i < boxCount; i++) {
        const w = THREE.MathUtils.randFloat(0.4, 2.2);
        const h = THREE.MathUtils.randFloat(0.3, 1.4);
        const d = THREE.MathUtils.randFloat(0.05, 0.15);
        const isGlow = i % 6 === 0;
        const color = isGlow ? PALETTE[3 + (i % 2)] : PALETTE[i % 3];

        const mat = new THREE.MeshStandardMaterial({
            color,
            metalness: isGlow ? 0.3 : 0.7,
            roughness: isGlow ? 0.25 : 0.45,
            emissive: isGlow ? color : 0x000000,
            emissiveIntensity: isGlow ? 1.4 : 0,
        });

        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        mesh.position.set(
            THREE.MathUtils.randFloatSpread(12),
            THREE.MathUtils.randFloatSpread(8),
            THREE.MathUtils.randFloat(-8, 1)
        );
        mesh.rotation.set(
            THREE.MathUtils.randFloat(-0.6, 0.6),
            THREE.MathUtils.randFloat(-0.8, 0.8),
            THREE.MathUtils.randFloat(-0.4, 0.4)
        );
        debrisGroup.add(mesh);
    }
    scene.add(debrisGroup);

    // Socket — a dark, unlit "hole" the hero cube appears to sink into
    const socket = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 2.2, 2.2),
        new THREE.MeshBasicMaterial({ color: 0x010409 })
    );
    socket.position.set(0, CONFIG.cubeSinkY, 0.5);
    scene.add(socket);

    // Signature hero cube — the element that descends into the socket on scroll
    const heroCube = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 1.6, 1.6),
        new THREE.MeshStandardMaterial({
            color: CONFIG.cubeColor,
            metalness: 0.4,
            roughness: 0.2,
            emissive: CONFIG.cubeColor,
            emissiveIntensity: 1.8,
        })
    );
    heroCube.position.set(0, 0.5, 1);
    scene.add(heroCube);

    function renderLoop() {
        debrisGroup.rotation.y += CONFIG.idleRotationSpeed;
        heroCube.position.x = Math.sin(performance.now() * 0.0003) * CONFIG.cubeDriftAmplitude;
        renderer.render(scene, camera);
    }
    gsap.ticker.add(renderLoop);

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        gsap.timeline({
            scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 1,
                onLeave: () => {
                    gsap.ticker.remove(renderLoop);
                    canvas.style.visibility = "hidden";
                },
                onEnterBack: () => {
                    canvas.style.visibility = "visible";
                    gsap.ticker.add(renderLoop);
                },
            },
        })
            .to(heroCube.position, { y: CONFIG.cubeSinkY, ease: "none" }, 0)
            .to(heroCube.scale, { x: 0.1, y: 0.1, z: 0.1, ease: "none" }, 0)
            .to(heroCube.material, { emissiveIntensity: 0, ease: "none" }, 0)
            .to(heroCube.material.color, { r: 0.02, g: 0.03, b: 0.06, ease: "none" }, 0)
            .to(debrisGroup.position, { y: -1.8, ease: "none" }, 0)
            .to(debrisGroup.rotation, { x: 0.15, ease: "none" }, 0)
            .to(camera.position, { z: 7.5, ease: "none" }, 0);
    }

    window.addEventListener("resize", () => {
        camera.aspect = hero.clientWidth / hero.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(hero.clientWidth, hero.clientHeight);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const hero = document.getElementById("about-me");
    const canvas = document.getElementById("hero-canvas");
    if (!hero || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !hasWebGL() || typeof gsap === "undefined") {
        hero.classList.add("hero-fallback-active");
        return;
    }

    let THREE;
    try {
        THREE = await import("three");
    } catch {
        hero.classList.add("hero-fallback-active");
        return;
    }

    initScene(THREE, hero, canvas);
});
