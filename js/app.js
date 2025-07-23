const hero = document.querySelector(".hero");
if (hero) {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
  });
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar ul");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}
const revealElements = document.querySelectorAll(".reveal-on-scroll");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); // re-animates if you scroll back up
      }
    });
  },
  {
    threshold: 0.1, // start animation when 10% of element is in view
  }
);

revealElements.forEach((el) => observer.observe(el));
