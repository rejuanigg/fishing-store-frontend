<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

import Hero from '@/components/Hero.vue';
import ProductCard from '@/components/ProductCard.vue';
import Loading from '@/components/UI/Loading.vue';

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
  <div class="min-h-screen bg-slate-50 pb-32">
    <Hero />

    <main class="px-5 pt-6">
      <section class="relative overflow-hidden rounded-[34px] border border-emerald-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div class="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-100 blur-3xl"></div>
        <div class="absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-cyan-100 blur-3xl"></div>

        <div class="relative flex items-start justify-between gap-4">
          <div class="min-w-0">
            <div class="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
              <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span class="text-[11px] font-black uppercase tracking-[0.16em] text-emerald-700">Selección del creador</span>
            </div>

            <h2 class="mt-4 text-2xl font-black leading-tight tracking-tight text-emerald-950">Productos destacados</h2>
            <p class="mt-2 max-w-[260px] text-sm font-medium leading-6 text-slate-500">Equipos recomendados para comprar rápido y preparar tu próxima salida.</p>
          </div>

          <RouterLink to="/products" class="shrink-0 rounded-2xl border border-emerald-100 bg-white px-4 py-2.5 text-xs font-black text-emerald-700 shadow-[0_10px_25px_rgba(15,23,42,0.05)] transition active:scale-[0.96]">Ver todos</RouterLink>
        </div>

        <div v-if="loadingFeatured" class="relative mt-5 flex min-h-[220px] items-center justify-center rounded-[28px] border border-emerald-100 bg-slate-50/80">
          <Loading />
        </div>

        <div v-else-if="featuredProducts.length > 0" class="relative mt-5 grid gap-4" :class="featuredProducts.length === 1 ? 'grid-cols-1' : 'grid-cols-2'">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" @addCart="addCart" />
        </div>

        <div v-else class="relative mt-5 rounded-[28px] border border-dashed border-emerald-200 bg-emerald-50/40 px-6 py-10 text-center">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-white text-2xl shadow-[0_12px_30px_rgba(15,23,42,0.06)]">🎣</div>
          <h3 class="mt-4 text-lg font-black text-emerald-950">No hay productos destacados</h3>
          <p class="mt-2 text-sm font-medium leading-6 text-slate-500">Cuando marques productos desde el panel admin, van a aparecer acá como vidriera principal.</p>
        </div>
      </section>

      <section class="mt-8 overflow-hidden rounded-[34px] border border-slate-100 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div class="relative p-5">
          <div class="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-100 blur-3xl"></div>

          <div class="relative flex items-center gap-4">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" class="h-16 w-16 rounded-[24px] border border-white object-cover shadow-[0_12px_30px_rgba(15,23,42,0.10)]">

            <div class="min-w-0 flex-1">
              <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">Canal oficial</span>
              <h2 class="mt-1 truncate text-xl font-black tracking-tight text-emerald-950">Pescando con Tito</h2>
              <p class="mt-1 text-sm font-medium leading-6 text-slate-500">Salidas de pesca, reviews y recomendaciones reales.</p>
            </div>
          </div>

          <div class="relative mt-5 grid grid-cols-3 gap-3">
            <div class="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-3 text-center">
              <span class="block text-lg font-black text-emerald-950">165K</span>
              <span class="mt-1 block text-[11px] font-bold text-slate-500">Facebook</span>
            </div>

            <div class="rounded-3xl border border-slate-100 bg-slate-50 p-3 text-center">
              <span class="block text-lg font-black text-emerald-950">10K+</span>
              <span class="mt-1 block text-[11px] font-bold text-slate-500">YouTube</span>
            </div>

            <div class="rounded-3xl border border-slate-100 bg-slate-50 p-3 text-center">
              <span class="block text-lg font-black text-emerald-950">10K+</span>
              <span class="mt-1 block text-[11px] font-bold text-slate-500">TikTok</span>
            </div>
          </div>

          <a href="#" target="_blank" class="relative mt-5 flex min-h-[54px] items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-[0_14px_32px_rgba(5,150,105,0.22)] transition active:scale-[0.98]">Ver contenido del canal</a>
        </div>
      </section>

      <section class="mt-8">
        <div class="flex items-end justify-between gap-4">
          <div>
            <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">Comunidad</span>
            <h2 class="mt-2 text-2xl font-black tracking-tight text-emerald-950">Seguinos en redes</h2>
            <p class="mt-1 text-sm font-medium leading-6 text-slate-500">Consultas, novedades y contenido de pesca en un solo lugar.</p>
          </div>
        </div>

        <div class="mt-5 grid grid-cols-2 gap-4">
          <a v-for="social in socialLinks" :key="social.id" :href="social.href" class="group rounded-[30px] border border-slate-100 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)] transition active:scale-[0.98]">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl transition group-active:scale-95">{{ social.icon }}</div>
            <h3 class="mt-4 text-sm font-black text-emerald-950">{{ social.name }}</h3>
            <p class="mt-2 text-xs font-medium leading-5 text-slate-500">{{ social.description }}</p>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>
