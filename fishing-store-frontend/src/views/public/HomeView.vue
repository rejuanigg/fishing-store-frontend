<script setup>
import Hero from '@/components/Hero.vue';

</script>

<template>
<Hero></Hero>
<div class="min-h-screen bg-gray-50 pb-32">

    <main class="px-5 pt-8 flex flex-col gap-10">

      <section class="flex flex-col gap-4">

        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-emerald-950">
              Productos destacados
            </h2>

            <p class="text-sm text-gray-500 mt-1">
              Recomendados por el creador.
            </p>
          </div>

          <button class="text-sm font-semibold text-emerald-600">
            Ver todos
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4">

          <div class="bg-white rounded-[28px] border border-gray-100 p-3 shadow-sm flex flex-col gap-3">

            <div class="relative bg-gray-100 rounded-[22px] overflow-hidden h-40">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
                class="w-full h-full object-cover"
              >

              <span class="absolute top-3 left-3 px-3 h-7 rounded-full bg-emerald-500 text-white text-[10px] font-semibold flex items-center">
                TOP
              </span>
            </div>

            <div class="flex flex-col gap-1">
              <h3 class="text-sm font-semibold text-emerald-950 leading-6">
                Caña Shimano FX
              </h3>

              <span class="text-xs text-gray-400">
                ⭐ 4.8
              </span>

              <span class="text-lg font-bold text-emerald-700">
                $120.000
              </span>
            </div>

            <button class="h-11 rounded-2xl bg-emerald-500 text-white text-sm font-semibold">
              Agregar
            </button>

          </div>

          <div class="bg-white rounded-[28px] border border-gray-100 p-3 shadow-sm flex flex-col gap-3">

            <div class="relative bg-gray-100 rounded-[22px] overflow-hidden h-40">
              <img
                src="https://images.unsplash.com/photo-1511884642898-4c92249e20b6"
                class="w-full h-full object-cover"
              >
            </div>

            <div class="flex flex-col gap-1">
              <h3 class="text-sm font-semibold text-emerald-950 leading-6">
                Reel Marine Pro
              </h3>

              <span class="text-xs text-gray-400">
                ⭐ 4.9
              </span>

              <span class="text-lg font-bold text-emerald-700">
                $89.990
              </span>
            </div>

            <button class="h-11 rounded-2xl bg-emerald-500 text-white text-sm font-semibold">
              Agregar
            </button>

          </div>

        </div>

      </section>

      <section class="flex flex-col gap-4">

        <div>
          <h2 class="text-xl font-bold text-emerald-950">
            Redes sociales
          </h2>

          <p class="text-sm text-gray-500 mt-1">
            Seguime en todas las plataformas.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">

          <div class="bg-white border border-gray-100 rounded-[28px] p-5 flex flex-col gap-3 shadow-sm">
            <span class="text-3xl">▶️</span>
            <span class="text-sm font-semibold text-emerald-950">
              YouTube
            </span>
            <span class="text-xs text-gray-500 leading-5">
              Videos, expediciones y reviews.
            </span>
          </div>

          <div class="bg-white border border-gray-100 rounded-[28px] p-5 flex flex-col gap-3 shadow-sm">
            <span class="text-3xl">📸</span>
            <span class="text-sm font-semibold text-emerald-950">
              Instagram
            </span>
            <span class="text-xs text-gray-500 leading-5">
              Fotos y contenido diario.
            </span>
          </div>

          <div class="bg-white border border-gray-100 rounded-[28px] p-5 flex flex-col gap-3 shadow-sm">
            <span class="text-3xl">🎵</span>
            <span class="text-sm font-semibold text-emerald-950">
              TikTok
            </span>
            <span class="text-xs text-gray-500 leading-5">
              Clips rápidos y tips.
            </span>
          </div>

          <div class="bg-white border border-gray-100 rounded-[28px] p-5 flex flex-col gap-3 shadow-sm">
            <span class="text-3xl">💬</span>
            <span class="text-sm font-semibold text-emerald-950">
              WhatsApp
            </span>
            <span class="text-xs text-gray-500 leading-5">
              Contacto directo y consultas.
            </span>
          </div>

        </div>

      </section>

    </main>

  </div>

</template>

<style scoped>

</style>
