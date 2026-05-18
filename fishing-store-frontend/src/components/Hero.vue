<script setup>

</script>

<template>
  <section class="relative overflow-hidden rounded-b-[34px] bg-emerald-950 text-white shadow-[0_16px_38px_rgba(2,44,34,0.20)]">
    <div class="absolute inset-0">
      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" class="h-full w-full object-cover opacity-30">
      <div class="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-emerald-950/72 to-emerald-950"></div>
      <div class="absolute -right-24 top-16 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl"></div>
      <div class="absolute -left-24 bottom-[-40px] h-56 w-56 rounded-full bg-cyan-200/10 blur-3xl"></div>
    </div>

    <div class="relative px-5 pb-7 pt-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-12 w-12 overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-1 backdrop-blur-md">
            <img src="../assets/dorado1.jpg" class="h-full w-full rounded-xl object-cover">
          </div>

          <div class="flex flex-col">
            <span class="text-sm font-black tracking-wide text-white">Pescando con Tito</span>
            <span class="text-xs font-semibold text-emerald-100/80">Pesca Argentina</span>
          </div>
        </div>

        <div class="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md">
          <span class="text-[11px] font-black text-emerald-50">+165K</span>
        </div>
      </div>

      <div class="mt-7">

        <h1 class="mt-5 max-w-[335px] text-[33px] font-black leading-[1.05] tracking-tight text-white">
          Equipamiento confiable para tu próxima salida.
        </h1>

        <p class="mt-3 max-w-[330px] text-[14px] font-medium leading-6 text-emerald-50/85">
          Cañas, reels y accesorios recomendados para comprar simple y coordinar por WhatsApp.
        </p>
      </div>

      <div class="mt-6 flex gap-3">
        <button class="flex h-13 flex-1 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-black text-white shadow-[0_12px_28px_rgba(16,185,129,0.24)] transition active:scale-[0.98]">
          Ver productos
        </button>

        <button class="flex h-13 items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-4 text-sm font-black text-white backdrop-blur-md transition active:scale-[0.98]">
          Destacados
        </button>
      </div>
    </div>
  </section>
</template>
