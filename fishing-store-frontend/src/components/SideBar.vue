<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const emits = defineEmits(['toggleClose']);

const items = ref([
  {
    title:'Tus Items',
    item:[
      {
        name:'Secciones',
        url:'/admin-panel/sections'
      },
      {
        name:'Categorias',
        url:'/admin-panel/categories'
      },
      {
        name:'Productos',
        url:'/admin-panel/products'
      }
    ],
  },
  {
    title:'Dashboard',
    item:[
      {
        name:'Ordenes',
        url:'/section-panel'
      },
      {
        name:'Gestionar Stock',
        url:'/section'
      }
    ],
  },
  {
    title:'Tus Items',
    item:[
      {
        name:'Secciones',
        url:'/section-panel'
      }
    ],
  },
])

</script>


<template>



<div class="fixed inset-0 z-50 flex flex-col justify-end">
  <div class="absolute inset-0 bg-black/20 -z-10"></div>

<div class="relative bg-white rounded-t-2xl max-h-[50vh] w-full flex flex-col overflow-hidden">

    <div class="shrink-0 bg-white border-b border-gray-100 p-4">
      <span @click="$emit('toggleClose')" class="text-amber-600 font-extrabold">x</span>
      <p class="w-full text-emerald-800 font-semibold flex justify-center">Opciones</p>
    </div>
    <div class="overflow-y-auto p-4 bg-white">

      <div v-for="preitem in items" class="flex flex-col">
        <span class="w-full text-emerald-800 font-semibold">{{ preitem.title }}</span>
        <ul class="flex flex-col">
          <RouterLink class="py-2 pl-5 text-emerald-800" :to="subitem.url" v-for="subitem in preitem.item">{{ subitem.name }}</RouterLink>
        </ul>
      </div>

    </div>

  </div>
</div>

</template>
