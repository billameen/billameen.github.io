document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("contact-form-feedback");
    const submitButton = form ? form.querySelector(".form-submit") : null;

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const data = Object.fromEntries(new FormData(form));
            const subject = encodeURIComponent(`Portfolio contact from ${data.name}`);
            const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);

            window.location.href = `mailto:1bilal.ameen@gmail.com?subject=${subject}&body=${body}`;

            if (feedback) {
                feedback.textContent = "Opening your email client... if nothing happens, email me directly at 1bilal.ameen@gmail.com.";
                feedback.classList.add("is-visible");
            }

            if (submitButton) {
                submitButton.disabled = true;
                setTimeout(() => { submitButton.disabled = false; }, 3000);
            }
        });
    }

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from(".contact-card", {
            scrollTrigger: { trigger: "#contact", start: "top 80%" },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    }
});
