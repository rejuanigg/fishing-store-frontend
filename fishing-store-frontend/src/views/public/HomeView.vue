<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

import Hero from '@/components/Hero.vue';
import ProductCard from '@/components/ProductCard.vue';

import api from '@/services/api';
import { cartStore } from '@/stores/cart';

const cart = cartStore();

const featuredProducts = ref([]);
const loadingFeatured = ref(true);

const getFeaturedProducts = async () => {
  try {
    const response = await api.get('/products/featured');
    featuredProducts.value = response.data.data;
  } catch (error) {
    console.error('Error al cargar productos destacados:', error);
  } finally {
    loadingFeatured.value = false;
  }
};

const addCart = (product) => {
  cart.addProduct(product);
};

onMounted(() => {
  getFeaturedProducts();
});

const socialLinks = [
  {
    id: 1,
    name: 'YouTube',
    description: 'Reviews, salidas y pruebas reales de equipo.',
    href: 'https://www.youtube.com/',
    tone: 'youtube',
  },
  {
    id: 2,
    name: 'Facebook',
    description: 'Contacto con la comunidad.',
    href: 'https://www.facebook.com/',
    tone: 'facebook',
  },
  {
    id: 3,
    name: 'Instagram',
    description: 'Fotos, novedades y contenido diario.',
    href: 'https://www.instagram.com/',
    tone: 'instagram',
  },
  {
    id: 4,
    name: 'TikTok',
    description: 'Tips rápidos y clips de pesca.',
    href: 'https://www.tiktok.com/',
    tone: 'tiktok',
  },
  {
    id: 5,
    name: 'WhatsApp',
    description: 'Consultas directas y asesoramiento.',
    href: 'https://www.whatsapp.com/',
    tone: 'whatsapp',
  },
];
</script>

<template>
  <div class="min-h-[100dvh] bg-slate-50 pb-32">
    <Hero />

    <main class="mx-auto w-full max-w-6xl px-4 pt-6 min-[380px]:px-5">
      <section id="productos-destacados" class="home-reveal relative overflow-hidden rounded-[30px] border border-emerald-100 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] min-[380px]:rounded-[34px] sm:p-5">
        <div class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-100 blur-3xl"></div>
        <div class="pointer-events-none absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-cyan-100 blur-3xl"></div>

        <div class="relative flex flex-col gap-4">
          <div class="flex flex-col gap-3 min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between">
            <div class="inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
              <span class="h-2 w-2 shrink-0 rounded-full bg-emerald-500"></span>
              <span class="text-[9px] font-black uppercase tracking-[0.10em] text-emerald-700 min-[360px]:text-[10px] sm:text-[11px]">
                Selección del creador
              </span>
            </div>

            <RouterLink to="/products" class="flex h-10 w-fit shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-white px-4 text-xs font-black text-emerald-700 shadow-[0_10px_25px_rgba(15,23,42,0.05)] transition active:scale-[0.96]">
              Ver todos
            </RouterLink>
          </div>

          <div>
            <h2 class="text-2xl font-black leading-tight tracking-tight text-emerald-950">
              Productos destacados
            </h2>

            <p class="mt-2 max-w-[340px] text-sm font-medium leading-6 text-slate-500">
              Equipos recomendados para comprar rápido y preparar tu próxima salida.
            </p>
          </div>
        </div>

        <div v-if="loadingFeatured" class="relative mt-5 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="item in 4" :key="item" class="h-[260px] animate-pulse rounded-[28px] border border-slate-100 bg-slate-50"></div>
        </div>

        <div v-else-if="featuredProducts.length > 0" class="relative -mx-1 mt-5 grid auto-cols-[minmax(155px,170px)] grid-flow-col gap-3 overflow-x-auto px-1 pb-3 snap-x snap-mandatory sm:mx-0 sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          <div v-for="(product, index) in featuredProducts" :key="product.id" class="home-reveal-item snap-start" :style="{ animationDelay: `${index * 70}ms` }">
            <ProductCard :product="product" @addCart="addCart" />
          </div>
        </div>

        <div v-else class="relative mt-5 rounded-[28px] border border-dashed border-emerald-200 bg-emerald-50/40 px-5 py-10 text-center min-[380px]:px-6">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-white text-2xl shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
            🎣
          </div>

          <h3 class="mt-4 text-lg font-black text-emerald-950">
            No hay productos destacados
          </h3>

          <p class="mt-2 text-sm font-medium leading-6 text-slate-500">
            Cuando marques productos desde el panel admin, van a aparecer acá como vidriera principal.
          </p>
        </div>
      </section>

      <section class="home-reveal mt-8 overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] min-[380px]:rounded-[34px]" style="animation-delay: 90ms;">
        <div class="relative p-4 min-[380px]:p-5">
          <div class="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-100 blur-3xl"></div>

          <div class="relative flex items-start gap-3 min-[360px]:gap-4">
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-[22px] bg-red-600 shadow-[0_12px_30px_rgba(220,38,38,0.20)] min-[380px]:h-16 min-[380px]:w-16 min-[380px]:rounded-[24px]">
              <div class="flex h-8 w-11 items-center justify-center rounded-xl bg-white min-[380px]:h-9 min-[380px]:w-12">
                <svg class="h-5 w-5 text-red-600 min-[380px]:h-6 min-[380px]:w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.56 12 3.56 12 3.56s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.2 31.57 31.57 0 0 0 0 12a31.57 31.57 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.57 31.57 0 0 0 24 12a31.57 31.57 0 0 0-.5-5.8ZM9.75 15.56V8.44L16 12l-6.25 3.56Z" />
                </svg>
              </div>
            </div>

            <div class="min-w-0 flex-1">
              <span class="text-[10px] font-black uppercase tracking-[0.12em] text-emerald-600 min-[360px]:text-[11px] min-[360px]:tracking-[0.18em]">
                Canal oficial
              </span>

              <h2 class="mt-1 text-xl font-black leading-tight tracking-tight text-emerald-950">
                Pescando
              </h2>

              <p class="mt-1 text-sm font-medium leading-6 text-slate-500">
                Salidas de pesca, reviews y recomendaciones reales.
              </p>
            </div>
          </div>

          <div class="relative mt-5 grid grid-cols-1 gap-3 min-[340px]:grid-cols-3">
            <div class="rounded-3xl border border-red-100 bg-red-50 p-3 text-center">
              <span class="block text-lg font-black text-emerald-950">
                10K+
              </span>

              <span class="mt-1 block text-[10px] font-bold leading-4 text-slate-500 min-[360px]:text-[11px]">
                YouTube
              </span>
            </div>

            <div class="rounded-3xl border border-blue-100 bg-blue-50 p-3 text-center">
              <span class="block text-lg font-black text-emerald-950">
                165K
              </span>

              <span class="mt-1 block text-[10px] font-bold leading-4 text-slate-500 min-[360px]:text-[11px]">
                Facebook
              </span>
            </div>

            <div class="rounded-3xl border border-slate-100 bg-slate-50 p-3 text-center">
              <span class="block text-lg font-black text-emerald-950">
                10K+
              </span>

              <span class="mt-1 block text-[10px] font-bold leading-4 text-slate-500 min-[360px]:text-[11px]">
                TikTok
              </span>
            </div>
          </div>

          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" class="relative mt-5 flex min-h-[54px] items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-[0_14px_32px_rgba(5,150,105,0.22)] transition active:scale-[0.98]">
            Ver contenido del canal
          </a>
        </div>
      </section>

      <section class="home-reveal mt-8" style="animation-delay: 160ms;">
        <div class="flex items-end justify-between gap-4">
          <div>
            <span class="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-600 min-[360px]:text-[11px] min-[360px]:tracking-[0.18em]">
              Comunidad
            </span>

            <h2 class="mt-2 text-2xl font-black tracking-tight text-emerald-950">
              Seguinos en redes
            </h2>

            <p class="mt-1 text-sm font-medium leading-6 text-slate-500">
              Consultas, novedades y contenido de pesca en un solo lugar.
            </p>
          </div>
        </div>

        <div class="mt-5 grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 lg:grid-cols-5">
          <a v-for="(social, index) in socialLinks" :key="social.id" :href="social.href" target="_blank" rel="noopener noreferrer" class="home-reveal-item group rounded-[30px] border border-slate-100 bg-white p-4 shadow-[0_14px_35px_rgba(15,23,42,0.05)] transition active:scale-[0.98] min-[380px]:p-5 lg:hover:-translate-y-0.5 lg:hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]" :style="{ animationDelay: `${220 + index * 70}ms` }">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl transition group-active:scale-95" :class="{
              'bg-red-50 text-red-600': social.tone === 'youtube',
              'bg-blue-50 text-blue-600': social.tone === 'facebook',
              'bg-pink-50 text-pink-600': social.tone === 'instagram',
              'bg-slate-100 text-slate-900': social.tone === 'tiktok',
              'bg-emerald-50 text-emerald-700': social.tone === 'whatsapp'
            }">
              <svg v-if="social.tone === 'youtube'" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.56 12 3.56 12 3.56s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.2 31.57 31.57 0 0 0 0 12a31.57 31.57 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.57 31.57 0 0 0 24 12a31.57 31.57 0 0 0-.5-5.8ZM9.75 15.56V8.44L16 12l-6.25 3.56Z" />
              </svg>

              <svg v-else-if="social.tone === 'facebook'" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
              </svg>

              <svg v-else-if="social.tone === 'instagram'" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7.8 2h8.4A5.81 5.81 0 0 1 22 7.8v8.4a5.81 5.81 0 0 1-5.8 5.8H7.8A5.81 5.81 0 0 1 2 16.2V7.8A5.81 5.81 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
              </svg>

              <svg v-else-if="social.tone === 'tiktok'" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16.6 5.82A5.94 5.94 0 0 0 20.24 7V3.66a2.71 2.71 0 0 1-.76-.11v2.63a5.94 5.94 0 0 1-3.64-1.18v6.92a6.3 6.3 0 0 1-6.29 6.29 6.24 6.24 0 0 1-3.49-1.05 6.29 6.29 0 0 0 10.54-4.62V5.82Zm.94-2.62a5.92 5.92 0 0 1-.94-3.2h-3.31v13.04a2.98 2.98 0 1 1-2.16-2.86V6.82a6.31 6.31 0 0 0-.92-.07 6.29 6.29 0 1 0 6.29 6.29V6.12a5.94 5.94 0 0 0 3.64 1.18V3.95a2.75 2.75 0 0 1-2.6-.75Z" />
              </svg>

              <svg v-else-if="social.tone === 'whatsapp'" class="h-6 w-6" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                <path d="M16.04 3C8.86 3 3.02 8.84 3.02 16.02c0 2.3.6 4.55 1.75 6.53L3 29l6.62-1.73a13 13 0 0 0 6.42 1.68h.01c7.18 0 13.02-5.84 13.02-13.02C29.07 8.84 23.23 3 16.04 3Zm0 23.75h-.01c-1.91 0-3.78-.51-5.42-1.48l-.39-.23-3.93 1.03 1.05-3.83-.25-.39a10.75 10.75 0 0 1-1.65-5.83c0-5.93 4.83-10.76 10.77-10.76 2.87 0 5.57 1.12 7.6 3.15a10.7 10.7 0 0 1 3.15 7.6c0 5.94-4.83 10.76-10.76 10.76Zm5.9-8.06c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.59-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.15-.15.32-.38.49-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.57-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.57.08-.86.4-.3.32-1.13 1.11-1.13 2.71s1.16 3.14 1.32 3.36c.16.21 2.28 3.49 5.53 4.9.77.33 1.37.53 1.84.68.77.24 1.47.21 2.03.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.3-.21-.62-.37Z" />
              </svg>
            </div>

            <h3 class="mt-4 text-sm font-black text-emerald-950">
              {{ social.name }}
            </h3>

            <p class="mt-2 text-xs font-medium leading-5 text-slate-500">
              {{ social.description }}
            </p>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.home-reveal,
.home-reveal-item {
  opacity: 0;
  transform: translateY(10px);
  animation: home-fade-up 420ms ease-out forwards;
}

@keyframes home-fade-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-reveal,
  .home-reveal-item {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
</style>
