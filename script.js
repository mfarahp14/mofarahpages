/* === AUTOPLAY NAME, CONTROLLED STYLES === */
const text = "MOHAMMED FARAH";
const nameEl = document.getElementById("name");
const cursorEl = document.querySelector(".cursor");

// Typing state
let i = 0;
let direction = 1; // 1 = typing, -1 = deleting
let styleIndex = 0;

// Subtle preset styles (all still clean + technical)
const stylePresets = [
  { letterSpacing: "0.10em", fontWeight: "400", opacity: 0.9 },
  { letterSpacing: "0.18em", fontWeight: "500", opacity: 1 },
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

  // Update visible text
  nameEl.textContent = text.slice(0, i);

  if (direction === 1) {
    // Typing forward
    if (i < text.length) {
      i++;
    } else {
      // Full name shown → small pause → start deleting
      direction = -1;
      setTimeout(tick, 800);
      return;
    }
  } else {
    // Deleting
    if (i > 0) {
      i--;
    } else {
      // Fully deleted → switch style → start typing again
      direction = 1;
      styleIndex = (styleIndex + 1) % stylePresets.length;
      applyStyle();
      setTimeout(tick, 300);
      return;
    }
  }

  const speed = direction === 1 ? 90 : 60; // typing vs deleting speed
  setTimeout(tick, speed);
}

// Kick it off
tick();

/* === Dynamic Year in Footer === */
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* === Reveal on Scroll === */
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
    { threshold: 0.15 }
  );

  revealEls.forEach(el => observer.observe(el));
} else {
  // Fallback: just show them
  revealEls.forEach(el => el.classList.add("reveal-visible"));
}
