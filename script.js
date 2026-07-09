/* =========================================================
   Portfolio Script
   - Mobile hamburger menu
   - Close menu on link click
   - Sticky navbar active-link on scroll
   - Fade-in on scroll (IntersectionObserver)
   - Back to top button
   - Footer year
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  };

  hamburger.addEventListener("click", toggleMenu);

  /* Close menu after clicking a nav link (mobile) */
  document.querySelectorAll(".nav-link, .nav-cta").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const setActiveLink = () => {
    let current = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active-link",
        link.getAttribute("href") === `#${current}`,
      );
    });
  };

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();

  /* ---------- Fade-in on scroll ---------- */
  const fadeEls = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  fadeEls.forEach((el) => observer.observe(el));

  /* ---------- Back to top button ---------- */
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
