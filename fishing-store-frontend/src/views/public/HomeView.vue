<script setup>
import Hero from '@/components/Hero.vue';
import { RouterLink } from 'vue-router';

const featuredProducts = [
  {
    id: 1,
    name: 'Caña Shimano FX',
    category: 'Cañas',
    price: '$120.000',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    badge: 'TOP',
  },
  {
    id: 2,
    name: 'Reel Marine Pro',
    category: 'Reels',
    price: '$89.990',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6',
    badge: null,
  },
];

const socialLinks = [
  {
    id: 1,
    name: 'YouTube',
    description: 'Reviews, salidas y pruebas reales de equipo.',
    icon: '▶️',
    href: '#',
  },
  {
    id: 2,
    name: 'Instagram',
    description: 'Fotos, novedades y contenido diario.',
    icon: '📸',
    href: '#',
  },
  {
    id: 3,
    name: 'TikTok',
    description: 'Tips rápidos y clips de pesca.',
    icon: '🎵',
    href: '#',
  },
  {
    id: 4,
    name: 'WhatsApp',
    description: 'Consultas directas y asesoramiento.',
    icon: '💬',
    href: '#',
  },
];
</script>

<template>
  <Hero />

  <div class="min-h-screen bg-slate-50 pb-32">
    <main class="px-5 pt-8">

      <section class="flex flex-col gap-4">
        <div class="flex items-end justify-between gap-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-[0.22em] text-emerald-500">
              Selección del creador
            </span>

            <h2 class="mt-2 text-2xl font-black leading-tight tracking-tight text-emerald-950">
              Productos destacados
            </h2>

            <p class="mt-1 text-sm leading-6 text-slate-500">
              Equipos recomendados para jornadas reales.
            </p>
          </div>

          <RouterLink to="/products" class="shrink-0 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 active:scale-95 transition">
            Ver todos
          </RouterLink>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <article v-for="product in featuredProducts" :key="product.id" class="group overflow-hidden rounded-[30px] border border-emerald-100/80 bg-white p-3 shadow-[0_14px_35px_rgba(15,23,42,0.06)] active:scale-[0.98] transition">
            <div class="relative aspect-[0.88] overflow-hidden rounded-[24px] bg-emerald-50">
              <img :src="product.image" :alt="product.name" class="h-full w-full object-cover transition duration-300 group-active:scale-105">

              <span v-if="product.badge" class="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1.5 text-[10px] font-black text-white shadow-lg shadow-emerald-900/20">
                {{ product.badge }}
              </span>
            </div>

            <div class="mt-3 flex flex-col gap-1">
              <span class="text-[11px] font-bold uppercase tracking-wide text-emerald-500">
                {{ product.category }}
              </span>

              <h3 class="line-clamp-2 min-h-[40px] text-sm font-black leading-5 text-emerald-950">
                {{ product.name }}
              </h3>

              <div class="flex items-center gap-1 text-xs">
                <span class="text-amber-400">★</span>
                <span class="font-semibold text-slate-500">{{ product.rating }}</span>
              </div>

              <span class="mt-1 text-lg font-black tracking-tight text-emerald-700">
                {{ product.price }}
              </span>
            </div>

            <button class="mt-3 h-11 w-full rounded-2xl bg-emerald-500 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition active:scale-[0.97]">
              Agregar
            </button>
          </article>
        </div>
      </section>

      <section class="mt-10 overflow-hidden rounded-[34px] border border-emerald-100 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div class="relative bg-emerald-950 px-5 py-6 text-white">
          <div class="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl"></div>
          <div class="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl"></div>

          <div class="relative flex items-center gap-4">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" class="h-16 w-16 rounded-3xl border border-white/15 object-cover">

            <div class="min-w-0 flex-1">
              <span class="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                Canal oficial
              </span>

              <h2 class="mt-1 truncate text-xl font-black tracking-tight">
                Fishing With Saul
              </h2>

              <p class="mt-1 text-sm leading-6 text-emerald-50/80">
                Salidas de pesca, reviews y recomendaciones de equipo.
              </p>
            </div>
          </div>
        </div>

        <div class="p-5">
          <div class="grid grid-cols-3 gap-3">
            <div class="rounded-3xl bg-slate-50 p-3 text-center">
              <span class="block text-lg font-black text-emerald-950">165K</span>
              <span class="mt-1 block text-[11px] font-semibold text-slate-500">Facebook</span>
            </div>

            <div class="rounded-3xl bg-slate-50 p-3 text-center">
              <span class="block text-lg font-black text-emerald-950">10K+</span>
              <span class="mt-1 block text-[11px] font-semibold text-slate-500">YouTube</span>
            </div>

            <div class="rounded-3xl bg-slate-50 p-3 text-center">
              <span class="block text-lg font-black text-emerald-950">10K+</span>
              <span class="mt-1 block text-[11px] font-semibold text-slate-500">TikTok</span>
            </div>
          </div>

          <a href="#" target="_blank" class="mt-5 flex h-13 min-h-13 items-center justify-center rounded-2xl bg-red-500 text-sm font-black text-white shadow-lg shadow-red-500/20 transition active:scale-[0.98]">
            Ver canal de YouTube
          </a>
        </div>
      </section>

      <section class="mt-10 flex flex-col gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-[0.22em] text-emerald-500">
            Comunidad
          </span>

          <h2 class="mt-2 text-2xl font-black tracking-tight text-emerald-950">
            Redes sociales
          </h2>

          <p class="mt-1 text-sm leading-6 text-slate-500">
            Contenido, consultas y novedades en todas las plataformas.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <a v-for="social in socialLinks" :key="social.id" :href="social.href" class="rounded-[30px] border border-emerald-100/80 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)] transition active:scale-[0.98]">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
              {{ social.icon }}
            </div>

            <h3 class="mt-4 text-sm font-black text-emerald-950">
              {{ social.name }}
            </h3>

            <p class="mt-2 text-xs leading-5 text-slate-500">
              {{ social.description }}
            </p>
          </a>
        </div>
      </section>

    </main>
  </div>
</template>
