const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  document.body.classList.toggle("menu-open");
  menuToggle.textContent = nav.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.textContent = "☰";
  });
});

// Reveal animation saat elemen masuk viewport.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Active navigation berdasarkan section yang sedang terlihat.
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav a")];

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${entry.target.id}`
      );
    });
  });
}, { rootMargin: "-40% 0px -50% 0px" });

sections.forEach(section => sectionObserver.observe(section));

function showLinkMessage(event, name) {
  event.preventDefault();
  alert(`${name}: silakan ganti href="#" di index.html dengan link akun ${name} kamu.`);
}

// Efek kecil pada kartu foto.
const photoCard = document.querySelector(".photo-card");
if (photoCard && window.matchMedia("(pointer:fine)").matches) {
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 4;
    const y = (e.clientY / window.innerHeight - 0.5) * 4;
    photoCard.style.transform = `rotate(3deg) translate(${x}px, ${y}px)`;
  });
}
