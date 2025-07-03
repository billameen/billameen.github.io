
console.log("hi");

const projectTemplate = document.getElementById("project-tile-template");
const projectList = document.getElementById("project-list");

fetch("../data/projects.json").then( data => {
    data.json().then( projectData => {
        projectData.projects.forEach( (project) => {
            console.log(project);
            
            const projectTile = projectTemplate.content.cloneNode(true);
            projectTile.getElementById("project-title").textContent = project.name;
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