document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined") return;

    const targets = [".availability-badge", "#hero-name", "#hero-tagline", "#about-me-para"]
        .filter((selector) => document.querySelector(selector));

    if (!targets.length) return;

    gsap.set(targets, { opacity: 0, y: 24 });

    const pfp = document.getElementById("pfp-wrapper");
    if (pfp) gsap.set(pfp, { opacity: 0, scale: 0.9 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
    tl.to(targets, { opacity: 1, y: 0, stagger: 0.12 }, 0.1);
    if (pfp) tl.to(pfp, { opacity: 1, scale: 1 }, 0.25);
});
