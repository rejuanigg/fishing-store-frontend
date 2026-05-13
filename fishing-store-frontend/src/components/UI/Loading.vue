<template>
  <section class="ocean-loader">
    <div v-for="fish in fishes" :key="fish.id" class="fish" :style="{ transform: `translate(${fish.x}px, ${fish.y}px)`, width: `${fish.size}px`, height: `${fish.size}px`, opacity: fish.opacity }">
      <svg class="fish-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#adedcb" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/>
        <path d="M18 12v.5"/>
        <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/>
        <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/>
        <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"/>
        <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const fishes = ref([
  {
    id: 1,
    x: -120,
    y: 90,
    baseY: 90,
    size: 70,
    speed: 420,
    opacity: 0.95,
    phase: 0,
  },
  {
    id: 2,
    x: -520,
    y: 150,
    baseY: 150,
    size: 48,
    speed: 340,
    opacity: 0.55,
    phase: 2,
  },
])

let animationFrame = null
let lastTime = 0

const resetFish = (fish, screenWidth) => {
  fish.x = -fish.size - Math.random() * 300
  fish.baseY = 60 + Math.random() * 130
  fish.y = fish.baseY
  fish.speed = 320 + Math.random() * 160
}

const animate = (currentTime) => {
  if (!lastTime) {
    lastTime = currentTime
  }

  const deltaTime = (currentTime - lastTime) / 1000
  lastTime = currentTime

  const screenWidth = window.innerWidth

  fishes.value.forEach((fish) => {
    fish.x += fish.speed * deltaTime
    fish.y = fish.baseY + Math.sin(currentTime / 260 + fish.phase) * 8

    if (fish.x > screenWidth + fish.size) {
      resetFish(fish, screenWidth)
    }
  })

  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  animationFrame = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style>
.ocean-loader {
  position: relative;
  width: 100vw;
  height: 260px;
  overflow: hidden;
  background: transparent;
}

.fish {
  position: absolute;
  left: 0;
  top: 0;
  will-change: transform;
}

.fish-svg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
