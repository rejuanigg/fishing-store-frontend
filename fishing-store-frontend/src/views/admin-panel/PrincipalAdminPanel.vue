<script setup>
import { RouterLink } from 'vue-router';
import { ChartBarStacked, PackageOpen, TableOfContents } from '@lucide/vue';

const adminItems = [
  {
    name: 'Productos',
    description: 'Crear, editar, destacar y administrar stock.',
    icon: PackageOpen,
    url: '/admin-panel/products',
  },
  {
    name: 'Categorías',
    description: 'Organizar productos dentro de cada sección.',
    icon: ChartBarStacked,
    url: '/admin-panel/categories',
  },
  {
    name: 'Secciones',
    description: 'Administrar la estructura principal del catálogo.',
    icon: TableOfContents,
    url: '/admin-panel/sections',
  },
];
</script>

<template>
  <div class="min-h-[100dvh] bg-slate-50 pb-28">
    <section class="mx-auto w-full max-w-6xl px-5 pt-6">
      <div class="relative overflow-hidden rounded-[34px] border border-emerald-100 bg-emerald-600 p-6 shadow-[0_18px_45px_rgba(5,150,105,0.22)]">
        <div class="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/15 blur-3xl"></div>
        <div class="absolute -left-20 bottom-[-90px] h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl"></div>

        <div class="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-xl">
            <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-100">Panel administrativo</span>
            <h1 class="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">Gestioná tu tienda</h1>
            <p class="mt-3 text-sm font-semibold leading-6 text-emerald-50">Administrá productos, categorías, secciones y órdenes desde un solo lugar.</p>
          </div>

          <RouterLink to="/orders" class="flex h-13 items-center justify-center rounded-2xl bg-white px-6 text-sm font-black text-emerald-700 shadow-[0_14px_32px_rgba(15,23,42,0.12)] transition active:scale-[0.98] lg:min-w-[170px]">Ver órdenes</RouterLink>
        </div>
      </div>
    </section>

    <section class="mx-auto w-full max-w-6xl px-5 pt-8">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">Accesos</span>
          <h2 class="mt-2 text-xl font-black text-emerald-950">Gestión rápida</h2>
        </div>

        <span class="shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-black text-emerald-700">{{ adminItems.length }} secciones</span>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink v-for="item in adminItems" :key="item.name" :to="item.url" class="group rounded-[30px] border border-slate-100 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)] transition active:scale-[0.98] lg:hover:-translate-y-0.5 lg:hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          <div class="flex items-start justify-between gap-4">
            <div class="flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-active:scale-95">
              <component :is="item.icon" class="h-6 w-6" />
            </div>

            <span class="rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-black text-slate-400">Abrir</span>
          </div>

          <div class="mt-5">
            <h3 class="text-base font-black text-emerald-950">{{ item.name }}</h3>
            <p class="mt-2 text-sm font-medium leading-6 text-slate-500">{{ item.description }}</p>
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
