/* =========================================================
   86 FEST 2026 — small enhancements
   - Header background swap on scroll
   - Reveal-on-scroll via IntersectionObserver
   - Auto-update copyright year
   Respects prefers-reduced-motion.
   ========================================================= */

(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // --- Header: add a class once the user has scrolled past the top
  const header = document.getElementById("siteHeader");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // --- Reveal on scroll. If reduced motion, mark everything visible upfront.
  const revealEls = document.querySelectorAll("[data-reveal]");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // --- Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Countdown to 6 September 2026, 10:00 Irish time (UTC+1 in September)
  const countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    const eventTime = new Date("2026-09-06T10:00:00+01:00").getTime();
    const fields = {
      days: countdownEl.querySelector('[data-cd="days"]'),
      hours: countdownEl.querySelector('[data-cd="hours"]'),
      minutes: countdownEl.querySelector('[data-cd="minutes"]'),
      seconds: countdownEl.querySelector('[data-cd="seconds"]'),
    };
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const diff = eventTime - Date.now();
      if (diff <= 0) {
        fields.days.textContent = "00";
        fields.hours.textContent = "00";
        fields.minutes.textContent = "00";
        fields.seconds.textContent = "00";
        countdownEl.classList.add("is-live");
        return false;
      }
      const s = Math.floor(diff / 1000);
      fields.days.textContent    = pad(Math.floor(s / 86400));
      fields.hours.textContent   = pad(Math.floor((s % 86400) / 3600));
      fields.minutes.textContent = pad(Math.floor((s % 3600) / 60));
      fields.seconds.textContent = pad(s % 60);
      return true;
    };
    if (tick()) setInterval(tick, 1000);
  }
})();
