window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector(".hero");
  hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

const cursorGlow = document.createElement("div");
cursorGlow.className = "cursor-glow";
document.body.appendChild(cursorGlow);

document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = `${e.clientX - 75}px`;
  cursorGlow.style.top = `${e.clientY - 75}px`;
});
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar ul");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
