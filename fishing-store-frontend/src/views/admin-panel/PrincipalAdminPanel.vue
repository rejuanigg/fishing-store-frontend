<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { ChartBarStacked, PackageOpen, TableOfContents} from '@lucide/vue';

const adminItems = ref([
      {
        name:'Secciones',
        icon:TableOfContents,
        url:'/admin-panel/sections'
      },
      {
        name:'Categorias',
        icon: ChartBarStacked,
        url:'/admin-panel/categories'
      },
      {
        name:'Productos',
        icon:PackageOpen,
        url:'/admin-panel/products'
      },
])


</script>

<template>

  <div class="w-full min-h-screen p-5">

    <section class="bg-emerald-600 p-5 flex flex-col gap-5 rounded-lg">
      <span class="text-emerald-50 text-sm">Panel Administrativo</span>
      <h2 class="text-white font-bold text-3xl">Bienvenido</h2>
      <p class="text-emerald-50">Gestiona productos, stock y órdenes desde un solo lugar.</p>
      <button class="bg-amber-500 p-2 rounded-lg text-white font-semibold">Ver mis ordenes</button>
    </section>
    <section class="flex flex-col items-center w-full gap-5 pt-5 pb-20">
      <span class="text-xl text-emerald-900">Gestion rápida</span>
      <div class="grid grid-cols-2 gap-5 w-full">
        <RouterLink v-for="item in adminItems"  :to="item.url" class="border border-gray-500 rounded-xl p-10 flex flex-col items-center gap-2">
          <component :is="item.icon" class="w-8 h-8 text-emerald-900" />
          <span class="text-emerald-600 font-semibold ">{{ item.name }}</span>
        </RouterLink>
      </div>
    </section>
  </div>

</template>
