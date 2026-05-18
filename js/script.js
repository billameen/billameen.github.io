/*****************************/
/** Load Projects from JSON **/
/*****************************/
const projectTemplate = document.getElementById("project-tile-template");
const projectList = document.getElementById("project-list");

fetch("./data/projects.json").then( data => {
    data.json().then( projectData => {
        projectData.projects.forEach( (project) => {
            
            const projectTile = projectTemplate.content.cloneNode(true);
            projectTile.getElementById("project-title").textContent = project.name;
            // projectTile.getElementById("project-overview").textContent = project.overview;
            
            const projectDesc = projectTile.getElementById("project-desc-list");
            project.description.forEach( e => {
                const item = document.createElement("li");
                item.textContent = e;
                projectDesc.appendChild(item);
            });
            
            const techList = projectTile.getElementById("tech-list");
            project.tech.forEach( e => {
                const item = document.createElement("li");
                item.textContent = e;
                techList.appendChild(item);

            });

            projectList.prepend(projectTile);

        });
    });
});



/*******************************/
/** Load Experience from JSON **/
/*******************************/
const expTemplate = document.getElementById("exp-tile-template");
const expList = document.getElementById("exp-list");

fetch("./data/experience.json").then( data => {
    data.json().then( experienceData => {
        experienceData.experiences.forEach( (experience) => {
            
            const expTile = expTemplate.content.cloneNode(true);
            expTile.getElementById("exp-title").textContent = experience.title;

            const expDesc = expTile.getElementById("exp-desc-list");
            experience.description.forEach( e => {
                const item = document.createElement("li");
                item.textContent = e;
                expDesc.appendChild(item);
            });

            expList.prepend(expTile);

        });
    });
});


/*******************************/
/**  Load Research from JSON  **/
/*******************************/
const resTemplate = document.getElementById("exp-tile-template");
const resList = document.getElementById("exp-list");

fetch("./data/research.json").then( data => {
    data.json().then( experienceData => {
        experienceData.experiences.forEach( (experience) => {
            
            const expTile = expTemplate.content.cloneNode(true);
            expTile.getElementById("exp-title").textContent = experience.title;

            const expDesc = expTile.getElementById("exp-desc-list");
            experience.description.forEach( e => {
                const item = document.createElement("li");
                item.textContent = e;
                expDesc.appendChild(item);
            });

            expList.prepend(expTile);

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









/****************************/
/** Navbar Scroll Behavior **/
/****************************/
// const topBar = document.getElementById("top-bar");

// window.addEventListener("scroll", () => {
//     if (topBar) {
//         if (window.scrollY > 50) {
//             topBar.classList.add("collapsed");
//         } else {
//             topBar.classList.remove("collapsed");
//         }
//         // Close mobile menu on scroll
//         topBar.classList.remove("mobile-open");
//     }
// });

// const hamburgerBtn = document.getElementById("hamburger-btn");
// if (hamburgerBtn && topBar) {
//     hamburgerBtn.addEventListener("click", (e) => {
//         e.stopPropagation(); // Prevent immediate closing from document click
//         topBar.classList.toggle("mobile-open");
//     });

//     // Close menu when clicking outside
//     document.addEventListener("click", (e) => {
//         if (!topBar.contains(e.target)) {
//             topBar.classList.remove("mobile-open");
//         }
//     });
// }






/* 
  Enhanced Navbar with Scroll-Aware Behavior
  
  Desktop: Collapses to circle on scroll down, expands to full navbar on scroll up
  Mobile: Toggle menu with hamburger, auto-close on nav click
*/

document.addEventListener('DOMContentLoaded', () => {
    const topBar = document.getElementById('top-bar');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navButtons = document.querySelectorAll('.nav-button');
    
    let lastScrollTop = 0;
    let isScrollingDown = false;
    const SCROLL_THRESHOLD = 100; // Collapse after scrolling 100px down
    
    // Desktop scroll behavior
    if (window.innerWidth >= 769) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Determine scroll direction
            if (scrollTop > lastScrollTop) {
                // Scrolling DOWN
                isScrollingDown = true;
            } else {
                // Scrolling UP
                isScrollingDown = false;
            }
            
            // Apply collapsed state when scrolling down past threshold
            if (isScrollingDown && scrollTop > SCROLL_THRESHOLD) {
                topBar.classList.add('scrolled');
            } 
            // Remove collapsed state when near top or scrolling up
            else if (!isScrollingDown || scrollTop < SCROLL_THRESHOLD) {
                topBar.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
    }
    
    // Mobile menu toggle
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        topBar.classList.toggle('mobile-open');
    });
    
    // Close menu when a nav item is clicked
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            topBar.classList.remove('mobile-open');
        });
    });
    
    // Close menu if clicking outside
    document.addEventListener('click', (e) => {
        if (!topBar.contains(e.target)) {
            topBar.classList.remove('mobile-open');
        }
    });
    
    // Handle window resize (switch between mobile/desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth < 769) {
            topBar.classList.remove('scrolled');
        }
    });
});