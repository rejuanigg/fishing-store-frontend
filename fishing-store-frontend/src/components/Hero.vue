<script setup>

</script>

<template>
  <section class="relative overflow-hidden rounded-b-[38px] bg-emerald-950 text-white">

    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        class="w-full h-full object-cover opacity-20"
      >

      <div class="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-emerald-950/70 to-emerald-950"></div>
    </div>

    <div class="relative px-5 pt-8 pb-10 flex flex-col gap-7">

      <div class="flex items-center gap-3">

        <div class="h-11 w-11 rounded-2xl overflow-hidden border border-white/10">
          <img
          src="../assets/dorado1.jpg"
          class="w-full h-full object-cover"
          >
        </div>

        <div class="flex flex-col">
          <span class="text-sm font-bold tracking-wide">
            Pescando con tito
          </span>

          <span class="text-xs text-emerald-200">
            Pesca Argentina
          </span>
        </div>

      </div>

      <div class="flex flex-col gap-4">

        <span class="w-fit px-3 py-1 rounded-full bg-white/10 text-emerald-100 text-xs font-medium">
          +165K seguidores en Facebook
        </span>

        <h1 class="text-[32px] leading-tight font-black max-w-[310px]">
          Equipamiento confiable para cada salida.
        </h1>

        <p class="text-sm leading-7 text-emerald-100/90 max-w-[330px]">
          Productos utilizados y recomendados en jornadas reales de pesca, expediciones y contenido semanal.
        </p>

      </div>

      <div class="flex gap-3">

        <button class="flex-1 h-13 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-95 transition">
          Ver Productos
        </button>

      </div>

    </div>

  </section>
</template>
