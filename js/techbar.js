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


document.addEventListener("DOMContentLoaded", () => {
    const rows = document.getElementById("tech-river");
    const row1 = document.getElementById("row1");
    const row2 = document.getElementById("row2");
    const row3 = document.getElementById("row3");

    if (!row1 || !row2 || !row3) {
        console.warn("Techbar rows not found in DOM yet. If this is not the homepage, this is expected.");
        return;
    }

    logos.forEach((logo, index) => {
        const svgImg = document.createElement("img");
        svgImg.src = `./img/logos/${logo}`;

        svgImg.className = "logo-img shrink-0 object-contain";
        // Using inline styles guarantees the image receives these dimensions
        // even if the CSS file isn't compiled or cached.
        svgImg.style.width = "48px";
        svgImg.style.height = "48px";

        // Distribute the logos across the three rows
        if (index % 3 === 0) {
            row1.appendChild(svgImg);
        } else if (index % 3 === 1) {
            row2.appendChild(svgImg);
        } else {
            row3.appendChild(svgImg);
        }
    });
});