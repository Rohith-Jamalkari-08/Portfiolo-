const cursor = document.getElementById("cursor");
const maskContainers = document.querySelectorAll(".mask-container");
const revealContents = document.querySelectorAll(".reveal-content");

// 1. Magic Wand Movement
document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
    ease: "power2.out",
  });

  maskContainers.forEach((container, index) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(revealContents[index], {
      clipPath: `circle(100px at ${x}px ${y}px)`,
      duration: 0.3,
    });
  });
});

// 2. Magnetic Interaction
const magneticTargets = document.querySelectorAll(".magnetic-target");

magneticTargets.forEach((target) => {
  target.addEventListener("mousemove", (e) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(target, {
      x: x * 0.5,
      y: y * 0.5,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(cursor, { scale: 3 });
  });

  target.addEventListener("mouseleave", () => {
    gsap.to(target, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });

    gsap.to(cursor, { scale: 1 });
  });
});

// 3. Filter Projects
function filterProjects(category) {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    if (category === "all" || card.getAttribute("data-cat") === category) {
      gsap.to(card, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        display: "flex",
      });
    } else {
      gsap.to(card, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        display: "none",
      });
    }
  });
}
