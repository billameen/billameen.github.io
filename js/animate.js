gsap.registerPlugin(SplitText);

let split, animation;

document.querySelector(".nav-text").addEventListener("hover", () => {
  animation && animation.revert();
  animation = gsap.from(split.chars, {
    x: 150,
    opacity: 0,
    duration: 0.7, 
    ease: "power4",
    stagger: 0.04
  })
});