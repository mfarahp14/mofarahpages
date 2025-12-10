/* === AUTOPLAY NAME, CONTROLLED STYLES === */
const text = "MOHAMMED FARAH";
const nameEl = document.getElementById("name");

// Typing state
let i = 0;
let direction = 1; // 1 = typing, -1 = deleting
let styleIndex = 0;

// Subtle preset styles (fits the coffee theme but still clean)
const stylePresets = [
  { letterSpacing: "0.10em", fontWeight: "400", opacity: 0.9 },
  { letterSpacing: "0.16em", fontWeight: "500", opacity: 1 },
  { letterSpacing: "0.14em", fontWeight: "600", opacity: 0.95 }
];

function applyStyle() {
  if (!nameEl) return;
  const s = stylePresets[styleIndex];
  Object.assign(nameEl.style, s);
}

// Start with first style
applyStyle();

function tick() {
  if (!nameEl) return;

  nameEl.textContent = text.slice(0, i);

  if (direction === 1) {
    // typing forward
    if (i < text.length) {
      i++;
    } else {
      direction = -1;
      setTimeout(tick, 800);
      return;
    }
  } else {
    // deleting
    if (i > 0) {
      i--;
    } else {
      direction = 1;
      styleIndex = (styleIndex + 1) % stylePresets.length;
      applyStyle();
      setTimeout(tick, 350);
      return;
    }
  }

  const speed = direction === 1 ? 90 : 60;
  setTimeout(tick, speed);
}

// Kick off typing loop
tick();

/* === BOUNCE + SCROLL PROJECT TILES === */
const tiles = document.querySelectorAll(".project-card-tile");

tiles.forEach(tile => {
  tile.addEventListener("click", () => {
    const targetId = tile.getAttribute("data-target");
    const target = document.getElementById(targetId);

    // bounce animation
    tile.classList.remove("tile-bounce");
    // force reflow to restart animation
    void tile.offsetWidth;
    tile.classList.add("tile-bounce");

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* === DYNAMIC YEAR IN FOOTER === */
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* === REVEAL ON SCROLL FOR SECTIONS === */
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("reveal-visible"));
}
