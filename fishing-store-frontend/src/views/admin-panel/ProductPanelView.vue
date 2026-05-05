<script setup>
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const isAdmin = ref(false);

const products = ref([]);
const searchValue = ref('');

//Autenticacion
if (auth.advancedAccess){
  isAdmin.value = true;
}

// Carga de productos
onMounted(async()=>{
  const response = await api.get('/products')
  products.value = response.data.data
})

//filtrado
const filterByName = computed(()=>{
  return products.value.filter((product)=>product.name.toLowerCase().includes(searchValue.value.toLowerCase()))
})

</script>


<template>
<div class="min-h-screen p-3">
  <div class="flex flex-col gap-5 p-5">
    <h2 class="font-semibold text-center text-emerald-900">Bienvenido al Panel de Productos</h2>
    <div class="flex gap-5">
      <SearchBar v-model="searchValue"></SearchBar>
      <RouterLink to="/admin-panel/products/create" class="border-2 border-emerald-400 px-3 py-1 rounded-lg text-emerald-900 flex flex-col items-center">
        +
      </RouterLink>
    </div>
  </div>
<main class="p-4 grid grid-cols-2  gap-4 min-h-screen">
    <ProductCard  v-for="product in filterByName" :key="product.id" :product="product" :is-admin="isAdmin" />
  </main>
</div>



</template>
