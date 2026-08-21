
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
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            
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












/*
    Navbar text animations
*/

const aboutme1 = document.getElementById("aboutme-text-1");
const aboutme2 = document.getElementById("aboutme-text-2");
const mywork1 = document.getElementById("mywork-text-1");
const mywork2 = document.getElementById("mywork-text-2");
const mygames1 = document.getElementById("mygames-text-1");
const mygames2 = document.getElementById("mygames-text-2");
gsap.registerPlugin(SplitText);

const aboutmebutton = document.getElementById("about-me-button");
const myworkbutton = document.getElementById("my-work-button");
const mygamesbutton = document.getElementById("my-games-button");

let splitA1, splitA2, splitW1, splitW2, splitG1, splitG2;

function initAnimations() {
    splitA1?.revert();
    splitA2?.revert();
    splitW1?.revert();
    splitW2?.revert();
    splitG1?.revert();
    splitG2?.revert();

    splitA1 = SplitText.create(aboutme1, { type: "chars" });
    splitA2 = SplitText.create(aboutme2, { type: "chars" });
    splitW1 = SplitText.create(mywork1, { type: "chars" });
    splitW2 = SplitText.create(mywork2, { type: "chars" });
    splitG1 = SplitText.create(mygames1, { type: "chars" });
    splitG2 = SplitText.create(mygames2, { type: "chars" });


    // Initial state
    gsap.set(splitA2.chars, {
        yPercent: 100,
        autoAlpha: 0
    });
    gsap.set(splitW2.chars, {
        yPercent: 100,
        autoAlpha: 0
    });
    gsap.set(splitG2.chars, {
        yPercent: 100,
        autoAlpha: 0
    });

    const tlA = gsap.timeline({
        paused: true,
        defaults: {
            duration: 0.25,
            ease: "power2.out"
        }
    });

    const tlW = gsap.timeline({
        paused: true,
        defaults: {
            duration: 0.25,
            ease: "power2.out"
        }
    });

    const tlG = gsap.timeline({
        paused: true,
        defaults: {
            duration: 0.25,
            ease: "power2.out"
        }
    });

    // First text exits upward
    tlA.to(splitA1.chars, {
        yPercent: -100,
        autoAlpha: 0,
        stagger: 0.02
    }, 0);

    // Second text enters from below
    tlA.to(splitA2.chars, {
        yPercent: 0,
        autoAlpha: 1,
        stagger: 0.02
    }, 0);


    tlW.to(splitW1.chars, {
        yPercent: -100,
        autoAlpha: 0,
        stagger: 0.02
    }, 0);

    tlW.to(splitW2.chars, {
        yPercent: 0,
        autoAlpha: 1,
        stagger: 0.02
    }, 0);


    tlG.to(splitG1.chars, {
        yPercent: -100,
        autoAlpha: 0,
        stagger: 0.02
    }, 0);

    tlG.to(splitG2.chars, {
        yPercent: 0,
        autoAlpha: 1,
        stagger: 0.02
    }, 0);


    aboutmebutton.addEventListener("mouseenter", () => {
        tlA.play();
    });

    aboutmebutton.addEventListener("mouseleave", () => {
        tlA.reverse();
    });

    myworkbutton.addEventListener("mouseenter", () => {
        tlW.play();
    });

    myworkbutton.addEventListener("mouseleave", () => {
        tlW.reverse();
    });

    mygamesbutton.addEventListener("mouseenter", () => {
        tlG.play();
    });

    mygamesbutton.addEventListener("mouseleave", () => {
        tlG.reverse();
    });
}

initAnimations();