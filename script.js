/* === TYPE NAME ONCE, THEN HOLD === */
const text = "MOHAMMED FARAH";
const nameEl = document.getElementById("name");
let i = 0;

function tick() {
  if (!nameEl) return;
  nameEl.textContent = text.slice(0, i);
  if (i < text.length) {
    i++;
    setTimeout(tick, 90);
  } else {
    const cursor = document.querySelector(".cursor");
    if (cursor) {
      cursor.style.animation = "none";
      cursor.style.opacity = "0.85";
    }
  }
}

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

/* === SMOOTH SCROLL FOR NAV LINKS === */
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener("click", event => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* === DYNAMIC YEAR IN FOOTER === */
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* === HAMBURGER MOBILE NAV === */
const hamburger = document.querySelector(".hamburger");
const navLinksEl = document.querySelector(".nav-links");

if (hamburger && navLinksEl) {
  hamburger.addEventListener("click", () => {
    const isOpen = navLinksEl.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  navLinksEl.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinksEl.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

/* === ACTIVE SECTION NAV INDICATOR === */
const sections = document.querySelectorAll("section[id]");
const allNavLinks = document.querySelectorAll(".nav-links a[href^='#']");

if ("IntersectionObserver" in window && allNavLinks.length) {
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          allNavLinks.forEach(a => a.classList.remove("active"));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
  );

  sections.forEach(s => sectionObserver.observe(s));
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
