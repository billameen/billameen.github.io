
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