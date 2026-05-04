// Génère dynamiquement des fenêtres allumées sur les buildings
// et quelques étoiles filantes pour un rendu plus vivant.

(function () {
  const buildings = document.querySelectorAll(".building");

  buildings.forEach((b) => {
    const w = document.createElement("div");
    w.className = "lit-windows";
    Object.assign(w.style, {
      position: "absolute",
      inset: "18% 14% 10% 14%",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: "repeat(8, 1fr)",
      gap: "4px",
      pointerEvents: "none"
    });

    const isPink = b.classList.contains("b2");
    const color = isPink ? "rgba(255,43,214," : "rgba(6,212,255,";

    for (let i = 0; i < 32; i++) {
      const cell = document.createElement("div");
      const lit = Math.random() > 0.45;
      const intensity = (Math.random() * 0.5 + 0.4).toFixed(2);
      cell.style.background = lit ? `${color}${intensity})` : "rgba(255,255,255,0.05)";
      cell.style.borderRadius = "1px";
      if (lit) {
        cell.style.boxShadow = `0 0 6px ${color}0.7)`;
        cell.style.animation = `winFlick ${(2 + Math.random() * 6).toFixed(2)}s infinite alternate`;
        cell.style.animationDelay = `${(Math.random() * 4).toFixed(2)}s`;
      }
      w.appendChild(cell);
    }
    b.appendChild(w);
  });

  // Keyframes injectées pour le scintillement des fenêtres
  const style = document.createElement("style");
  style.textContent = `
    @keyframes winFlick {
      0%   { opacity: 0.55; }
      45%  { opacity: 0.95; }
      50%  { opacity: 0.4; }
      100% { opacity: 0.85; }
    }
    .shooting-star {
      position: absolute;
      width: 2px; height: 2px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 0 8px #fff, 0 0 16px var(--cyan);
      pointer-events: none;
      z-index: 1;
    }
    .shooting-star::after {
      content: "";
      position: absolute;
      top: 50%; right: 0;
      width: 80px; height: 1px;
      background: linear-gradient(to left, #fff, transparent);
      transform: translateY(-50%);
    }
  `;
  document.head.appendChild(style);

  // Étoiles filantes occasionnelles
  function spawnShootingStar() {
    const s = document.createElement("div");
    s.className = "shooting-star";
    const top = Math.random() * 25 + 5;
    const left = Math.random() * 60 + 20;
    s.style.top = `${top}%`;
    s.style.left = `${left}%`;
    s.style.transition = "transform 1.4s linear, opacity 1.4s linear";
    s.style.opacity = "1";
    document.querySelector(".scene").appendChild(s);

    requestAnimationFrame(() => {
      s.style.transform = "translate(-280px, 120px)";
      s.style.opacity = "0";
    });
    setTimeout(() => s.remove(), 1500);
  }
  setInterval(spawnShootingStar, 3500);
  setTimeout(spawnShootingStar, 600);

  // Léger effet parallaxe à la souris
  const scene = document.querySelector(".scene");
  const sun = document.querySelector(".sun");
  const mountains = document.querySelector(".mountains");
  const car = document.querySelector(".car");

  scene.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    if (sun) sun.style.translate = `${x * -10}px ${y * -6}px`;
    if (mountains) mountains.style.translate = `${x * -16}px 0`;
    if (car) car.style.setProperty("--mx", `${x * -6}px`);
  });
})();
