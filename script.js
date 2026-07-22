/* =============================================================
   SHAYAN JAWED — PORTFOLIO
   Sticky navbar behaviour, mobile menu, active link highlighting,
   fade-in-on-scroll reveal, and back-to-top button.
   ============================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-link");

  const setActiveLink = () => {
    let currentId = "home";
    const offset = window.innerHeight * 0.35;
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - offset) currentId = sec.id;
    });
    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
    });
  };
  window.addEventListener("scroll", setActiveLink);
  setActiveLink();

  /* ---------- Fade-in reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document
    .querySelectorAll(".fade-in")
    .forEach((el) => revealObserver.observe(el));

  /* ---------- Back to top button ---------- */
  const toTop = document.getElementById("toTop");
  window.addEventListener("scroll", () => {
    toTop.classList.toggle("show", window.scrollY > 500);
  });
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
