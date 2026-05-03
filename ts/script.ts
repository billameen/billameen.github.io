/*****************************/
/** Load Projects from JSON **/
/*****************************/
const projectTemplate = document.getElementById("project-tile-template") as HTMLTemplateElement;
const projectList = document.getElementById("project-list") as HTMLDivElement;

interface Project {
    name: string;
    description: string;
    tech: string[];
}

interface ProjectData {
    projects: Project[];
}

fetch("./data/projects.json").then(data => {
    data.json().then((projectData: ProjectData) => {
        projectData.projects.forEach((project: Project) => {

            const projectTile = projectTemplate.content.cloneNode(true) as DocumentFragment;
            (projectTile.getElementById("project-title") as HTMLElement).textContent = project.name;
            // (projectTile.getElementById("project-overview") as HTMLElement).textContent = project.overview;
            (projectTile.getElementById("project-desc") as HTMLElement).textContent = project.description;

            const techList = projectTile.getElementById("tech-list") as HTMLElement;
            project.tech.forEach((e: string) => {
                const item = document.createElement("li");
                item.textContent = e;
                techList.appendChild(item);
            });

            projectList.append(projectTile);

        });
    });
});



/*******************************/
/** Load Experience from JSON **/
/*******************************/
const expTemplate = document.getElementById("exp-tile-template") as HTMLTemplateElement;
const expList = document.getElementById("exp-list") as HTMLDivElement;

interface Experience {
    title: string;
    description: string[];
}

interface ExperienceData {
    experiences: Experience[];
}

fetch("./data/experience.json").then(data => {
    data.json().then((experienceData: ExperienceData) => {
        experienceData.experiences.forEach((experience: Experience) => {

            const expTile = expTemplate.content.cloneNode(true) as DocumentFragment;
            (expTile.getElementById("exp-title") as HTMLElement).textContent = experience.title;

            const expDesc = expTile.getElementById("exp-desc-list") as HTMLElement;
            experience.description.forEach((e: string) => {
                const item = document.createElement("li");
                item.textContent = e;
                expDesc.appendChild(item);
            });

            expList.append(expTile);

        });
    });
});



/****************************/
/** Observe Mouse Position **/
/****************************/
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add("show");
//         } else {
//             entry.target.classList.remove("show");
//         }
//     });
// });

// const hiddenElements = document.querySelectorAll(".hidden");
// hiddenElements.forEach((el) => observer.observe(el));
