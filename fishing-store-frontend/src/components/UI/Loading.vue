<template>
  <section class="ocean-loader">
    <div class="ocean-glow ocean-glow-one"></div>
    <div class="ocean-glow ocean-glow-two"></div>

    <div class="loader-card">
      <div class="fish-area">
        <div
          v-for="fish in fishes"
          :key="fish.id"
          class="fish"
          :style="{
            transform: `translate(${fish.x}px, ${fish.y}px) scaleX(${fish.direction})`,
            width: `${fish.size}px`,
            height: `${fish.size}px`,
            opacity: fish.opacity
          }"
        >
          <svg class="fish-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
            <path d="M18 12v.5" />
            <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
            <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" />
            <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
            <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
          </svg>
        </div>
      </div>

      <div class="loader-content">
        <span class="loader-kicker">Fishing Store</span>

        <h2>Cargando...</h2>
        <div class="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const fishes = ref([
  {
    id: 1,
    x: -120,
    y: 60,
    baseY: 60,
    size: 66,
    speed: 280,
    opacity: 0.95,
    phase: 0,
    direction: 1,
  },
  {
    id: 2,
    x: -420,
    y: 118,
    baseY: 118,
    size: 46,
    speed: 220,
    opacity: 0.48,
    phase: 2,
    direction: 1,
  },
  {
    id: 3,
    x: -680,
    y: 94,
    baseY: 94,
    size: 34,
    speed: 185,
    opacity: 0.34,
    phase: 4,
    direction: 1,
  },
]);

let animationFrame = null;
let lastTime = 0;

function resetFish(fish, screenWidth) {
  fish.x = -fish.size - Math.random() * 260;
  fish.baseY = 42 + Math.random() * 95;
  fish.y = fish.baseY;
  fish.speed = 180 + Math.random() * 130;
  fish.opacity = fish.id === 1 ? 0.95 : 0.32 + Math.random() * 0.28;
}

function animate(currentTime) {
  if (!lastTime) {
    lastTime = currentTime;
  }

  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  const screenWidth = Math.min(window.innerWidth, 520);

  fishes.value.forEach((fish) => {
    fish.x += fish.speed * deltaTime;
    fish.y = fish.baseY + Math.sin(currentTime / 320 + fish.phase) * 7;

    if (fish.x > screenWidth + fish.size) {
      resetFish(fish, screenWidth);
    }
  });

  animationFrame = requestAnimationFrame(animate);
}

onMounted(() => {
  animationFrame = requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>

<style scoped>
.ocean-loader {
  position: relative;
  display: flex;
  min-height: 100dvh;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #f8fafc;
  padding: 24px;
}

.ocean-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(52px);
  opacity: 0.65;
  pointer-events: none;
}

.ocean-glow-one {
  top: 10%;
  right: -80px;
  width: 220px;
  height: 220px;
  background: rgba(16, 185, 129, 0.16);
}

.ocean-glow-two {
  bottom: 8%;
  left: -90px;
  width: 240px;
  height: 240px;
  background: rgba(6, 182, 212, 0.14);
}

.loader-card {
  position: relative;
  z-index: 1;
  width: min(100%, 420px);
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 34px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.07);
  backdrop-filter: blur(18px);
}

.fish-area {
  position: relative;
  height: 190px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(236, 253, 245, 0.95), rgba(248, 250, 252, 0.95), rgba(236, 254, 255, 0.95));
}

.fish-area::after {
  content: "";
  position: absolute;
  inset: auto 24px 18px 24px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(15, 118, 110, 0.18), transparent);
}

.fish {
  position: absolute;
  left: 0;
  top: 0;
  color: #059669;
  will-change: transform;
}

.fish-svg {
  display: block;
  width: 100%;
  height: 100%;
}

.loader-content {
  padding: 22px 24px 24px;
  text-align: center;
}

.loader-kicker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #ecfdf5;
  padding: 7px 12px;
  color: #047857;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.loader-content h2 {
  margin: 14px 0 0;
  color: #022c22;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.loader-content p {
  margin: 10px auto 0;
  max-width: 310px;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.65;
}

.loader-dots {
  display: flex;
  justify-content: center;
  gap: 7px;
  margin-top: 18px;
}

.loader-dots span {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #10b981;
  animation: pulse-dot 1.1s infinite ease-in-out;
}

.loader-dots span:nth-child(2) {
  animation-delay: 0.16s;
}

.loader-dots span:nth-child(3) {
  animation-delay: 0.32s;
}

@keyframes pulse-dot {
  0%,
  80%,
  100% {
    opacity: 0.35;
    transform: translateY(0) scale(0.9);
  }

  40% {
    opacity: 1;
    transform: translateY(-4px) scale(1);
  }
}

@media (max-width: 380px) {
  .ocean-loader {
    padding: 18px;
  }

  .loader-card {
    border-radius: 30px;
  }

  .fish-area {
    height: 170px;
  }

  .loader-content {
    padding: 20px;
  }

  .loader-content h2 {
    font-size: 20px;
  }

  .loader-content p {
    font-size: 13px;
  }
}
</style>
