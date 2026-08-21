const logos = [
    "bootstrap.svg",
    "bun.svg",
    "c.svg",
    "chartjs.svg",
    "chrome.svg",
    "css.svg",
    "docker.svg",
    "eclipse.svg",
    "embedded c.svg",
    "express.svg",
    "fastapi.svg",
    "flask.svg",
    "gcc.svg",
    "gimp.svg",
    "git.svg",
    "github.svg",
    "github actions.svg",
    "google colab.svg",
    "hibernate.svg",
    "homebrew.svg",
    "html5.svg",
    "java.svg",
    "js.svg",
    "kali.svg",
    "material ui.svg",
    "matplotlib.svg",
    "mysql.svg",
    "nodejs.svg",
    "npm.svg",
    "numpy.svg",
    "pandas.svg",
    "playwright.svg",
    "postman.svg",
    "pycharm.svg",
    "pytest.svg",
    "python.svg",
    "pytorch.svg",
    "r.svg",
    "react.svg",
    "spring.svg",
    "supabase.svg",
    "swift.svg",
    "tailwind.svg",
    "tensorflow.svg",
    "typescript.svg",
    "unity.svg",
    "visual studio.svg",
    "vitejs.svg",
    "vitest.svg",
    "vscode.svg",
    "xcode.svg"
]

const SIZES = [40, 56, 72];

// Deterministic size per logo (stable across reloads) instead of Math.random(),
// so the row layout doesn't jump around on re-render/resize.
function sizeForLogo(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = (hash * 31 + name.charCodeAt(i)) | 0;
    }
    return SIZES[Math.abs(hash) % SIZES.length];
}

function buildTrack(rowEl, logosForRow) {
    const track = document.createElement("div");
    track.className = "tech-track flex flex-row items-center gap-8";

    // Render the logo set twice back-to-back so animating to xPercent:-50 loops seamlessly
    for (let copy = 0; copy < 2; copy++) {
        logosForRow.forEach((logo) => {
            const size = sizeForLogo(logo);
            const img = document.createElement("img");
            img.src = `/img/logos/${logo}`;
            img.alt = logo.replace(/\.svg$/, "");
            img.className = "logo-img shrink-0 object-contain";
            img.style.width = `${size}px`;
            img.style.height = `${size}px`;
            track.appendChild(img);
        });
    }

    rowEl.appendChild(track);
    return track;
}

document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("tech-river");
    const row1 = document.getElementById("row1");
    const row2 = document.getElementById("row2");
    const row3 = document.getElementById("row3");

    if (!section || !row1 || !row2 || !row3) {
        console.warn("Techbar rows not found in DOM yet. If this is not the homepage, this is expected.");
        return;
    }

    // Distribute the logos across the three rows (same round-robin as before)
    const rowLogos = [[], [], []];
    logos.forEach((logo, index) => {
        rowLogos[index % 3].push(logo);
    });

    const track1 = buildTrack(row1, rowLogos[0]);
    const track2 = buildTrack(row2, rowLogos[1]);
    const track3 = buildTrack(row3, rowLogos[2]);

    if (typeof gsap === "undefined") return;

    // Rows 1 & 3 drift left, row 2 drifts right (mirrored), for a "current" feel
    const tweens = {
        row1: gsap.to(track1, { xPercent: -50, duration: 46, ease: "none", repeat: -1 }),
        row2: gsap.fromTo(track2, { xPercent: -50 }, { xPercent: 0, duration: 38, ease: "none", repeat: -1 }),
        row3: gsap.to(track3, { xPercent: -50, duration: 54, ease: "none", repeat: -1 }),
    };

    const targetSpeed = { row1: 1, row2: 1, row3: 1 };
    const currentSpeed = { row1: 1, row2: 1, row3: 1 };

    section.addEventListener("mousemove", (e) => {
        const rect = section.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width;
        const bias = Math.max(-1, Math.min(1, (relX - 0.5) * 2));

        // Rows biased toward the cursor's side speed up; the mirrored row eases
        // the other way, selling a "current" pulling toward the pointer.
        targetSpeed.row1 = 1 + bias * 0.6;
        targetSpeed.row2 = 1 - bias * 0.6;
        targetSpeed.row3 = 1 + bias * 0.6;
    });

    section.addEventListener("mouseleave", () => {
        targetSpeed.row1 = 1;
        targetSpeed.row2 = 1;
        targetSpeed.row3 = 1;
    });

    gsap.ticker.add(() => {
        for (const key of Object.keys(currentSpeed)) {
            currentSpeed[key] += (targetSpeed[key] - currentSpeed[key]) * 0.08;
            tweens[key].timeScale(currentSpeed[key]);
        }
    });
});
