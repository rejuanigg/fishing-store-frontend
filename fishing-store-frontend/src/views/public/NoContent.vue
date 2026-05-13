<script setup lang="ts">
import { FishOff } from '@lucide/vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-emerald-50 via-white to-white px-5">
    <section class="flex w-full max-w-md flex-col items-center text-center">
      <div class="relative mb-8">
        <div class="absolute inset-0 rounded-full bg-emerald-200 blur-2xl opacity-60"></div>

        <div class="relative flex h-28 w-28 items-center justify-center rounded-full border border-emerald-100 bg-white shadow-sm">
          <FishOff class="h-14 w-14 text-emerald-600" stroke-width="1.8" />
        </div>
      </div>

      <span class="mb-3 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
        Error 404
      </span>

      <h1 class="text-4xl font-black tracking-tight text-emerald-950">
        Página no encontrada
      </h1>

      <p class="mt-4 max-w-sm text-sm leading-6 text-gray-500">
        Parece que este pez se escapó del anzuelo. La página que buscás no existe o fue movida.
      </p>

      <RouterLink to="/" class="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-emerald-500 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-600 active:scale-95">
        Volver al inicio
      </RouterLink>
    </section>
  </main>
</template>
