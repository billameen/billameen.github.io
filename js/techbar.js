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

    // Render the logo set twice back-to-back so the loop wraps seamlessly
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

// Continuous per-frame position update with modulo wraparound, driven directly
// off gsap.ticker — deliberately NOT a gsap.to(...).repeat(-1) tween, because
// this loop's speed is also being modulated every frame for cursor-reactivity
// (see mousemove below), and mutating timeScale() on a tween that's mid-repeat
// can visibly hiccup right at the wrap point. Plain arithmetic + modulo has no
// "repeat boundary" to desync, so there's nothing to reset/stutter at.
function createMarquee(track, { direction, duration }) {
    let halfWidth = track.scrollWidth / 2;
    let position = direction === 1 ? 0 : -halfWidth;

    // quickSetter applies the transform directly without gsap.set's per-call
    // property parsing — cheap enough to call every single frame for every row.
    const setX = gsap.quickSetter(track, "x", "px");
    setX(position);

    return {
        get pxPerSecond() {
            return halfWidth / duration;
        },
        refresh() {
            halfWidth = track.scrollWidth / 2;
        },
        step(deltaSeconds, speedMultiplier) {
            position += direction * this.pxPerSecond * speedMultiplier * deltaSeconds;

            // Wrap back into the canonical (-halfWidth, 0] window so the loop never
            // "resets" — it just keeps counting through the same repeating space.
            // (Works the same for both directions: a position past either edge is
            // shifted by exactly one copy-width, landing on the visually identical
            // point in the duplicated content, so there's no discontinuity to see.)
            if (halfWidth > 0) {
                while (position <= -halfWidth) position += halfWidth;
                while (position > 0) position -= halfWidth;
            }

            setX(position);
        },
    };
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

    // Rows 1 & 3 drift left (direction -1), row 2 drifts right (direction 1),
    // mirrored, for a "current" feel — like sponsor decals streaming past on an F1 car.
    const marquees = {
        row1: createMarquee(track1, { direction: -1, duration: 46 }),
        row2: createMarquee(track2, { direction: 1, duration: 38 }),
        row3: createMarquee(track3, { direction: -1, duration: 54 }),
    };

    window.addEventListener("resize", () => {
        marquees.row1.refresh();
        marquees.row2.refresh();
        marquees.row3.refresh();
    });

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

    gsap.ticker.add((time, deltaTime) => {
        // Clamp so a slow/blocked frame (tab backgrounded for a moment, a GC pause,
        // the hero's WebGL frame taking longer than usual) can't make the marquee
        // visibly jump — it moves at most one "slow frame" worth of distance instead
        // of trying to catch up all at once on the next tick.
        const deltaSeconds = Math.min(deltaTime / 1000, 1 / 30);
        for (const key of Object.keys(currentSpeed)) {
            currentSpeed[key] += (targetSpeed[key] - currentSpeed[key]) * 0.08;
            marquees[key].step(deltaSeconds, currentSpeed[key]);
        }
    });
});
