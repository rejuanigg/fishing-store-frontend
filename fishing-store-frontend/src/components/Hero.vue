<script setup>

</script>

<template>
  <section class="relative overflow-hidden rounded-b-[32px] bg-emerald-950 text-white shadow-[0_18px_40px_rgba(2,44,34,0.22)]">

    <div class="absolute inset-0">
      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" class="h-full w-full object-cover opacity-25">
      <div class="absolute inset-0 bg-gradient-to-b from-emerald-950/35 via-emerald-950/80 to-emerald-950"></div>
      <div class="absolute -right-20 top-20 h-52 w-52 rounded-full bg-emerald-400/20 blur-3xl"></div>
      <div class="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl"></div>
    </div>

    <div class="relative px-5 pt-7 pb-9">

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-12 w-12 overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-sm">
            <img src="../assets/dorado1.jpg" class="h-full w-full object-cover">
          </div>

          <div class="flex flex-col">
            <span class="text-sm font-bold tracking-wide text-white">Pescando con tito</span>
            <span class="text-xs font-medium text-emerald-200">Pesca Argentina</span>
          </div>
        </div>

        <span class="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-emerald-100 ring-1 ring-white/10">
          +165K
        </span>
      </div>

      <div class="mt-8 flex flex-col gap-4">
        <span class="w-fit rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-semibold text-emerald-100 ring-1 ring-emerald-300/15">
          Recomendado en jornadas reales
        </span>

        <h1 class="max-w-[315px] text-[34px] font-black leading-[1.08] tracking-tight text-white">
          Equipamiento confiable para cada salida.
        </h1>

        <p class="max-w-[320px] text-[15px] leading-7 text-emerald-50/85">
          Productos probados en pesca, expediciones y contenido semanal.
        </p>
      </div>

      <button class="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-emerald-500 text-sm font-bold text-white shadow-lg shadow-emerald-950/25 transition active:scale-[0.98]">
        Ver productos
      </button>

    </div>

  </section>
</template>
