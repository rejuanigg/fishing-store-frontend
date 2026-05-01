<script setup>
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import ProductCard from '@/components/ProductCard.vue';

const products = ref([]);
const nameP = ref('');

onMounted(async()=>{
  const response = await api.get('/products')
  products.value = response.data.data
})

const filterByName = computed(()=>{
  return products.value.filter((product)=>product.name.toLowerCase().includes(nameP.value.toLowerCase()))
})

</script>


<template>
  <div class="bg-red-50 w-full h-full flex justify-center items-center flex-col">
    <div class="bg-red-300 h-9/10 w-9/10 flex flex-col gap-10 items-center">
      <h1 class="pt-5">Bienvenid@ al panel Productos</h1>
      <div class="bg-emerald-400 h-9/10 w-full flex flex-col items-center">

        <div class="bg-red-500 w-5/10 flex items-center justify-between px-5">
          <span>Buscar</span>
          <input class="bg-gray-300 w-8/10 h-1/2" v-model="nameP" type="text">
        </div>

        <div class="bg-slate-500 w-full h-4/5 mt-5 flex flex-col gap-5 items-center">
          <div class="w-6/10 h-1/5 bg-slate-100 flex justify-center items-center">
            <span>
              <RouterLink to="/admin-panel/products/create">Add</RouterLink>  
            </span>
          </div>

          <div class="h-3/5 grid grid-cols-2 sm:grid-cols-3 gap-10">
            <ProductCard v-for="product in filterByName" :key="product" :product="product"></ProductCard>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>
