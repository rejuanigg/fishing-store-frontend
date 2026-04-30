<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

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

  <!-- <div v-for="item in items" class="bg-emerald-400 w-2/4 h-20 flex items-center px-20">
    <div class="w-full flex justify-between">
      <span>{{ item.name }}</span>
      <span>DOWN</span>
    </div>
  </div> -->


  <div class="bg-slate-400 h-full w-1/4 px-10 ">
    <span>Opciones</span>
    <div class="bg-slate-300 h-4/5 px-10 flex flex-col justify-center gap-2">
      <div v-for="item in items"  class="w-full bg-red-50 border-b">
        <span class="">{{ item.title }}</span>
        <ul v-for="subitem in item.item" class="bg-white w-full pl-10">
          <li >
            <RouterLink :to="subitem.url">{{ subitem.name }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>
