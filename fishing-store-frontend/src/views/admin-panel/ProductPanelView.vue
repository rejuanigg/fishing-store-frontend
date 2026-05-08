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

  <div class="min-h-screen">

  <section class="px-5 pt-6 flex flex-col gap-5">

    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-bold text-emerald-950">Gestion de productos</h1>

      <p class="text-sm leading-6 text-gray-500">
      Administrá, editá y organizá los productos visibles dentro de la tienda.
      </p>
    </div>

    <div class="flex items-center gap-3">

    <div class="flex-1">
      <SearchBar v-model="searchValue"></SearchBar>
    </div>

    <RouterLink
    to="/admin-panel/products/create"
    class="h-12 w-12 shrink-0 rounded-2xl bg-emerald-500 text-white text-xl font-semibold flex items-center justify-center active:scale-95 transition"
    >
    +
    </RouterLink>

  </div>

  </section>

    <main class="px-5 pt-6 pb-28 grid grid-cols-2 gap-4">

      <ProductCard
      v-for="product in filterByName"
      :key="product.id"
      :product="product"
      :is-admin="isAdmin"
      />

    </main>

  </div>

</template>
