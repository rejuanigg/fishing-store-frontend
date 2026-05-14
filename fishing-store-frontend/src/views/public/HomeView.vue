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
            <h2 class="text-xl font-bold text-emerald-950">Productos destacados</h2>
            <p class="text-sm text-gray-500 mt-1">Recomendados por el creador.</p>
          </div>

          <RouterLink to="/products" class="text-sm font-semibold text-emerald-600">Ver todos</RouterLink>

        </div>

        <div class="grid grid-cols-2 gap-4">

          <div class="bg-white rounded-[28px] border border-gray-100 p-3 shadow-sm flex flex-col gap-3">

            <div class="relative bg-gray-100 rounded-[22px] overflow-hidden h-40">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9" class="w-full h-full object-cover">
              <span class="absolute top-3 left-3 px-3 h-7 rounded-full bg-emerald-500 text-white text-[10px] font-semibold flex items-center">TOP</span>
            </div>

            <div class="flex flex-col gap-1">
              <h3 class="text-sm font-semibold text-emerald-950 leading-6">Caña Shimano FX</h3>
              <span class="text-xs text-gray-400">⭐ 4.8</span>
              <span class="text-lg font-bold text-emerald-700">$120.000</span>
            </div>

            <button class="h-11 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-95 transition">Agregar</button>

          </div>

          <div class="bg-white rounded-[28px] border border-gray-100 p-3 shadow-sm flex flex-col gap-3">

            <div class="relative bg-gray-100 rounded-[22px] overflow-hidden h-40">
              <img src="https://images.unsplash.com/photo-1511884642898-4c92249e20b6" class="w-full h-full object-cover">
            </div>

            <div class="flex flex-col gap-1">
              <h3 class="text-sm font-semibold text-emerald-950 leading-6">Reel Marine Pro</h3>
              <span class="text-xs text-gray-400">⭐ 4.9</span>
              <span class="text-lg font-bold text-emerald-700">$89.990</span>
            </div>

            <button class="h-11 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-95 transition">Agregar</button>

          </div>

        </div>

      </section>

      <section class="bg-white border border-gray-100 rounded-[32px] p-5 shadow-sm flex flex-col gap-5">

  <div class="flex items-center gap-4">

    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" class="h-16 w-16 rounded-2xl object-cover border border-gray-100">

    <div class="flex-1 flex flex-col gap-1">
      <h2 class="text-lg font-bold text-emerald-950">Fishing With Saul</h2>
      <p class="text-sm leading-6 text-gray-500">Canal oficial con salidas de pesca, reviews, expediciones y recomendaciones de equipo.</p>
    </div>

  </div>

  <div class="grid grid-cols-3 gap-3">

    <div class="bg-gray-50 rounded-2xl p-3 flex flex-col items-center">
      <span class="text-lg font-bold text-emerald-950">165K</span>
      <span class="text-xs text-gray-500">Facebook</span>
    </div>

    <div class="bg-gray-50 rounded-2xl p-3 flex flex-col items-center">
      <span class="text-lg font-bold text-emerald-950">10K+</span>
      <span class="text-xs text-gray-500">YouTube</span>
    </div>

    <div class="bg-gray-50 rounded-2xl p-3 flex flex-col items-center">
      <span class="text-lg font-bold text-emerald-950">10K+</span>
      <span class="text-xs text-gray-500">TikTok</span>
    </div>

  </div>

  <a href="#" target="_blank" class="h-12 rounded-2xl bg-red-500 text-white text-sm font-semibold flex items-center justify-center active:scale-95 transition">
    Ver canal de YouTube
  </a>

</section>



      <section class="flex flex-col gap-4">

        <div>
          <h2 class="text-xl font-bold text-emerald-950">Redes sociales</h2>
          <p class="text-sm text-gray-500 mt-1">Seguime en todas las plataformas.</p>
        </div>

        <div class="grid grid-cols-2 gap-4">

          <a href="#" class="bg-white border border-gray-100 rounded-[28px] p-5 flex flex-col gap-3 shadow-sm active:scale-[0.98] transition">
            <span class="text-3xl">▶️</span>
            <span class="text-sm font-semibold text-emerald-950">YouTube</span>
            <span class="text-xs text-gray-500 leading-5">Videos, expediciones y reviews.</span>
          </a>

          <a href="#" class="bg-white border border-gray-100 rounded-[28px] p-5 flex flex-col gap-3 shadow-sm active:scale-[0.98] transition">
            <span class="text-3xl">📸</span>
            <span class="text-sm font-semibold text-emerald-950">Instagram</span>
            <span class="text-xs text-gray-500 leading-5">Fotos y contenido diario.</span>
          </a>

          <a href="#" class="bg-white border border-gray-100 rounded-[28px] p-5 flex flex-col gap-3 shadow-sm active:scale-[0.98] transition">
            <span class="text-3xl">🎵</span>
            <span class="text-sm font-semibold text-emerald-950">TikTok</span>
            <span class="text-xs text-gray-500 leading-5">Clips rápidos y tips.</span>
          </a>

          <a href="#" class="bg-white border border-gray-100 rounded-[28px] p-5 flex flex-col gap-3 shadow-sm active:scale-[0.98] transition">
            <span class="text-3xl">💬</span>
            <span class="text-sm font-semibold text-emerald-950">WhatsApp</span>
            <span class="text-xs text-gray-500 leading-5">Contacto directo y consultas.</span>
          </a>

        </div>

      </section>

    </main>

  </div>

</template>
