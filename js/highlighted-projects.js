document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("high-projects-container");
    if (!container) return;

    if (typeof lucide !== "undefined") lucide.createIcons();

    const cards = Array.from(container.querySelectorAll(".highlight-card"));
    if (cards.length < 2 || typeof gsap === "undefined") return;

    let topIndex = 0;

    gsap.set(cards, { xPercent: -120, opacity: 0 });
    gsap.set(cards[0], { xPercent: 0, opacity: 1, zIndex: cards.length });

    function cycle() {
        const current = cards[topIndex];
        const nextIndex = (topIndex + 1) % cards.length;
        const next = cards[nextIndex];

        gsap.to(current, {
            xPercent: 120,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                // Send it to the back of the stack, parked off-screen on the
                // opposite side so it can re-enter unnoticed next lap.
                gsap.set(current, { zIndex: 0, xPercent: -120, opacity: 0 });
            }
        });

        gsap.to(next, {
            zIndex: cards.length,
            xPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });

        topIndex = nextIndex;
    }

    const repeatCall = gsap.delayedCall(4, function repeat() {
        cycle();
        repeatCall.restart(true);
    });

    container.addEventListener("mouseenter", () => repeatCall.pause());
    container.addEventListener("mouseleave", () => repeatCall.resume());
});
