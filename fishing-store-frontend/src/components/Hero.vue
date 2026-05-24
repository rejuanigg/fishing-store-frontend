<script setup>
import { Store } from '@lucide/vue';


</script>

<template>
  <section class="hero-enter relative overflow-hidden rounded-b-[34px] bg-emerald-950 text-white shadow-[0_16px_38px_rgba(2,44,34,0.20)]">
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(16,185,129,0.28),transparent_34%),radial-gradient(circle_at_90%_20%,rgba(34,211,238,0.14),transparent_30%),linear-gradient(180deg,#022c22_0%,#064e3b_52%,#022c22_100%)]"></div>
      <div class="hero-grid absolute inset-0 opacity-[0.10]"></div>
      <div class="hero-glow-one absolute -right-24 top-16 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl"></div>
      <div class="hero-glow-two absolute -left-24 bottom-[-40px] h-56 w-56 rounded-full bg-cyan-200/10 blur-3xl"></div>
    </div>

    <div class="relative px-5 pb-7 pt-6">
      <div class="hero-top flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-12 w-12 overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-1 backdrop-blur-md flex justify-center items-center">
            <Store />
          </div>

          <div class="flex flex-col">
            <span class="text-sm font-black tracking-wide text-white">Tienda</span>
            <span class="text-xs font-semibold text-emerald-100/80">Tienda Argentina</span>
          </div>
        </div>

        <div class="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md">
          <span class="text-[11px] font-black text-emerald-50">+165K</span>
        </div>
      </div>

      <div class="hero-copy mt-7">
        <h1 class="mt-5 max-w-[335px] text-[33px] font-black leading-[1.05] tracking-tight text-white">
          Texto principal para tienda.
        </h1>

        <p class="mt-3 max-w-[330px] text-[14px] font-medium leading-6 text-emerald-50/85">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus distinctio fugiat natus laborum amet corporis earum deserunt quae? Molestias pariatur voluptatibus beatae quos, quia velit rem consequatur. Odio, quidem iure?
        </p>
      </div>

      <div class="hero-actions mt-6 flex gap-3">
        <RouterLink to="/products" class="flex h-13 flex-1 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-black text-white shadow-[0_12px_28px_rgba(16,185,129,0.24)] transition active:scale-[0.98]">
          Ver productos
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-enter {
  opacity: 0;
  transform: translateY(8px);
  animation: hero-in 340ms ease-out forwards;
}

.hero-top {
  opacity: 0;
  transform: translateY(6px);
  animation: hero-in 360ms ease-out 60ms forwards;
}

.hero-copy {
  opacity: 0;
  transform: translateY(8px);
  animation: hero-in 380ms ease-out 110ms forwards;
}

.hero-actions {
  opacity: 0;
  transform: translateY(8px);
  animation: hero-in 400ms ease-out 160ms forwards;
}

.hero-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  background-size: 42px 42px;
}

.hero-glow-one {
  animation: hero-glow 6s ease-in-out infinite;
}

.hero-glow-two {
  animation: hero-glow 7s ease-in-out 800ms infinite;
}

@keyframes hero-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-glow {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(0, -8px, 0) scale(1.03);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-enter,
  .hero-top,
  .hero-copy,
  .hero-actions,
  .hero-glow-one,
  .hero-glow-two {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
</style>
