<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { ChartBarStacked, PackageOpen, TableOfContents} from '@lucide/vue';

const adminItems = ref([
      {
        name:'Productos',
        icon:PackageOpen,
        url:'/admin-panel/products'
      },
      {
        name:'Categorias',
        icon: ChartBarStacked,
        url:'/admin-panel/categories'
      },
      {
        name:'Secciones',
        icon:TableOfContents,
        url:'/admin-panel/sections'
      },

])


</script>

<template>

  <div class="min-h-screen pb-28">

    <section class="px-5 pt-6 flex flex-col gap-5">

      <div class="bg-emerald-500 rounded-3xl p-6 flex flex-col gap-5 shadow-lg shadow-emerald-100">

        <div class="flex flex-col gap-2">
          <span class="text-xs font-medium uppercase tracking-wide text-emerald-100">Panel Administrativo</span>
          <h1 class="text-3xl font-bold text-white leading-tight">Gestioná tu tienda</h1>
          <p class="text-sm leading-6 text-emerald-50">Administrá productos, categorías y órdenes desde un solo lugar.</p>
        </div>

        <RouterLink to="/orders" class="flex items-center justify-center h-12 rounded-2xl bg-white text-emerald-700 text-sm font-semibold active:scale-[0.98] transition">
          Ver órdenes
        </RouterLink>

      </div>

    </section>

    <section class="px-5 pt-8 flex flex-col gap-4">

      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold text-emerald-950">Gestión rápida</h2>
        <span class="text-sm text-gray-400">{{ adminItems.length }} secciones</span>
      </div>

      <div class="grid grid-cols-2 gap-4">

        <RouterLink v-for="item in adminItems" :key="item.name" :to="item.url" class="bg-white border border-gray-100 rounded-3xl p-5 flex flex-col gap-4 shadow-sm active:scale-[0.98] transition">

          <div class="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
            <component :is="item.icon" class="w-6 h-6 text-emerald-700" />
          </div>

          <div class="flex flex-col gap-1">
            <span class="text-sm font-semibold text-emerald-950">{{ item.name }}</span>
            <p class="text-xs leading-5 text-gray-500">Gestionar sección</p>
          </div>

        </RouterLink>

      </div>

    </section>

  </div>

</template>
