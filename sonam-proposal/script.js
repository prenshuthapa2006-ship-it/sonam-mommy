// ============================================
// FLOATING HEARTS BACKGROUND
// ============================================
function createFloatingHearts() {
  const container = document.getElementById("heartsBg");
  const hearts = ["💕", "💖", "💗", "💞", "🩷", "♥", "🤍", "🌸"];

  function spawnHeart() {
    const heart = document.createElement("span");
    heart.classList.add("floating-heart");
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = Math.random() * 18 + 12 + "px";
    heart.style.animationDuration = Math.random() * 8 + 6 + "s";
    heart.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(heart);

    // Remove after animation completes
    setTimeout(() => {
      heart.remove();
    }, 16000);
  }

  // Spawn hearts at intervals
  setInterval(spawnHeart, 600);

  // Initial burst
  for (let i = 0; i < 15; i++) {
    setTimeout(spawnHeart, i * 200);
  }
}

// ============================================
// SCROLL REVEAL — Intersection Observer
// ============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".reveal-left, .reveal-right, .reveal-up"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// ============================================
// PARALLAX — subtle depth on scroll
// ============================================
function initParallax() {
  const hero = document.getElementById("hero");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroContent = hero.querySelector(".hero-content");

    if (scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
      heroContent.style.opacity = 1 - scrollY / window.innerHeight;
    }
  });
}

// ============================================
// SPARKLE CONFETTI on proposal section
// ============================================
function initProposalSparkles() {
  const proposalSection = document.getElementById("proposal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          burstSparkles(proposalSection);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(proposalSection);
}

function burstSparkles(container) {
  const sparkles = ["✨", "💖", "⭐", "🌟", "💫", "🩷"];

  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("span");
      sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      sparkle.style.position = "absolute";
      sparkle.style.fontSize = Math.random() * 20 + 14 + "px";
      sparkle.style.left = Math.random() * 100 + "%";
      sparkle.style.top = Math.random() * 100 + "%";
      sparkle.style.pointerEvents = "none";
      sparkle.style.zIndex = "10";
      sparkle.style.animation = `sparkleFloat ${Math.random() * 2 + 2}s ease-out forwards`;
      container.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), 4000);
    }, i * 100);
  }
}

// Add the sparkle float animation dynamically
const sparkleStyle = document.createElement("style");
sparkleStyle.textContent = `
  @keyframes sparkleFloat {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1) rotate(0deg);
    }
    100% {
      opacity: 0;
      transform: translateY(-120px) scale(0.3) rotate(180deg);
    }
  }
`;
document.head.appendChild(sparkleStyle);

// ============================================
// SMOOTH CURSOR TRAIL (hearts follow mouse)
// ============================================
function initCursorTrail() {
  document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.85) {
      const trail = document.createElement("span");
      trail.textContent = "💕";
      trail.style.position = "fixed";
      trail.style.left = e.clientX + "px";
      trail.style.top = e.clientY + "px";
      trail.style.fontSize = "16px";
      trail.style.pointerEvents = "none";
      trail.style.zIndex = "9999";
      trail.style.transition = "all 1s ease-out";
      trail.style.opacity = "1";
      document.body.appendChild(trail);

      requestAnimationFrame(() => {
        trail.style.transform = `translateY(-40px) scale(0.3)`;
        trail.style.opacity = "0";
      });

      setTimeout(() => trail.remove(), 1200);
    }
  });
}

// ============================================
// TYPEWRITER effect for the "I Love You" cards
// ============================================
function initLoveReveal() {
  const loveCards = document.querySelectorAll(".love-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const loveText = card.querySelector(".love-text");

          // Add a glow pulse when visible
          loveText.style.animation = "glowPulse 2s ease-in-out infinite";
        }
      });
    },
    { threshold: 0.4 }
  );

  loveCards.forEach((card) => observer.observe(card));
}

// Add glow pulse
const glowStyle = document.createElement("style");
glowStyle.textContent = `
  @keyframes glowPulse {
    0%, 100% {
      text-shadow: 0 0 10px rgba(194, 24, 91, 0.3);
    }
    50% {
      text-shadow: 0 0 30px rgba(194, 24, 91, 0.6), 0 0 60px rgba(255, 105, 180, 0.3);
    }
  }
`;
document.head.appendChild(glowStyle);

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  createFloatingHearts();
  initScrollReveal();
  initParallax();
  initProposalSparkles();
  initCursorTrail();
  initLoveReveal();
});
