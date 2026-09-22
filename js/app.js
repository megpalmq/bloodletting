const introScreen = document.querySelector(".intro-screen");

if (introScreen) {
  document.body.classList.add("intro-active");

  const heroArt = new Image();
  const finishIntro = () => {
    introScreen.classList.add("is-ready");
    document.body.classList.remove("intro-active");

    window.setTimeout(() => {
      introScreen.remove();
    }, 1800);
  };

  heroArt.onload = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishIntro();
      return;
    }

    window.setTimeout(finishIntro, 3500);
  };
  heroArt.onerror = finishIntro;
  heroArt.src = "/assets/images/BoxCover_Transparent.png";
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar ul");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}
const revealElements = Array.from(
  document.querySelectorAll(".reveal-on-scroll"),
).filter((element) => !element.closest(".regions"));

const factionCards = document.querySelectorAll(".faction-card-reveal");

const factionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        factionObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.01,
    rootMargin: "0px 0px 16% 0px",
  },
);

factionCards.forEach((card) => factionObserver.observe(card));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.01,
    rootMargin: "0px 0px 18% 0px",
  },
);

revealElements.forEach((el) => observer.observe(el));
