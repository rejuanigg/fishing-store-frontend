<script setup>

</script>

<template>
  <section class="relative overflow-hidden rounded-b-[40px] bg-emerald-950 text-white">

    <div class="absolute inset-0 opacity-20">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        class="w-full h-full object-cover"
      >
    </div>

    <div class="relative px-5 pt-10 pb-12 flex flex-col gap-8">

      <div class="flex items-center justify-between">

        <div class="flex items-center gap-3">

          <div class="flex flex-col">
            <span class="text-lg font-bold">
              Pescando con Sergio
            </span>

            <span class="text-sm text-emerald-200">
              Fishing Creator & Outdoor YouTuber
            </span>
          </div>
        </div>


      </div>

      <div class="flex flex-col gap-4">

        <div class="flex flex-col gap-2">
          <span class="w-fit px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 text-xs font-semibold border border-emerald-300/20">
            +250K seguidores
          </span>

          <h1 class="text-4xl leading-tight font-black max-w-[320px]">
            Equipamiento real para pesca real.
          </h1>
        </div>

        <p class="text-sm leading-7 text-emerald-100 max-w-[340px]">
          Productos recomendados y utilizados en cada salida, videos y expediciones.
        </p>

      </div>

      <div class="grid grid-cols-2 gap-3">

        <button class="h-13 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-95 transition">
          Explorar productos
        </button>

        <button class="h-13 rounded-2xl border border-white/15 bg-white/5 backdrop-blur text-white text-sm font-semibold active:scale-95 transition">
          Último video
        </button>

      </div>

      <div class="flex items-center gap-3 overflow-x-auto pb-1">

        <div class="min-w-[110px] h-20 rounded-3xl bg-white/5 border border-white/10 backdrop-blur px-4 flex flex-col justify-center">
          <span class="text-2xl font-black">320K</span>
          <span class="text-xs text-emerald-200">YouTube</span>
        </div>

        <div class="min-w-[110px] h-20 rounded-3xl bg-white/5 border border-white/10 backdrop-blur px-4 flex flex-col justify-center">
          <span class="text-2xl font-black">180K</span>
          <span class="text-xs text-emerald-200">Instagram</span>
        </div>

        <div class="min-w-[110px] h-20 rounded-3xl bg-white/5 border border-white/10 backdrop-blur px-4 flex flex-col justify-center">
          <span class="text-2xl font-black">95K</span>
          <span class="text-xs text-emerald-200">TikTok</span>
        </div>

      </div>

    </div>

  </section>
</template>

