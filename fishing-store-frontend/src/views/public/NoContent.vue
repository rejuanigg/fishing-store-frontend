<script setup lang="ts">
import { FishOff } from '@lucide/vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-blue-50 via-white to-white px-5">
    <section class="flex w-full max-w-md flex-col items-center text-center">
      <div class="relative mb-8">
        <div class="absolute inset-0 rounded-full bg-blue-200 blur-2xl opacity-60"></div>

        <div class="relative flex h-28 w-28 items-center justify-center rounded-full border border-blue-100 bg-white shadow-sm">
          <FishOff class="h-14 w-14 text-blue-600" stroke-width="1.8" />
        </div>
      </div>

      <span class="mb-3 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
        Error 404
      </span>

      <h1 class="text-4xl font-black tracking-tight text-blue-950">
        Página no encontrada
      </h1>

      <p class="mt-4 max-w-sm text-sm leading-6 text-gray-500">
        Parece que este pez se escapó del anzuelo. La página que buscás no existe o fue movida.
      </p>

      <RouterLink to="/" class="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-blue-500 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-blue-600 active:scale-95">
        Volver al inicio
      </RouterLink>
    </section>
  </main>
</template>
