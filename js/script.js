/*****************************/
/** Load Projects from JSON **/
/*****************************/
const projectTemplate = document.getElementById("project-tile-template");
const projectList = document.getElementById("project-list");

fetch("../data/projects.json").then( data => {
    data.json().then( projectData => {
        projectData.projects.forEach( (project) => {
            
            const projectTile = projectTemplate.content.cloneNode(true);
            projectTile.getElementById("project-title").textContent = project.name;
            // projectTile.getElementById("project-overview").textContent = project.overview;
            projectTile.getElementById("project-desc").textContent = project.description;
            
            const techList = projectTile.getElementById("tech-list");
            project.tech.forEach( e => {
                const item = document.createElement("li");
                item.textContent = e;
                techList.appendChild(item);

            });

            projectList.append(projectTile);

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