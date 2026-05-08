<script setup>
import { ref, onMounted, computed } from 'vue';
import { cartStore } from '@/stores/cart';
import ProductCard from '@/components/ProductCard.vue';
import api from '@/services/api';
import FilterProduct from '@/components/FilterProduct.vue';
import SearchBar from '@/components/SearchBar.vue';
import NavF from '@/components/NavF.vue';

const cart = cartStore()
const products = ref([]);
const selectedCategory = ref(null);
const toggle = ref(false)
const searchValue = ref('')

const getSelect = (id) =>{return selectedCategory.value = id}

const toggleOpen = () => { toggle.value = true }
const toggleClose = () => { toggle.value = false }

onMounted(async()=>{
  const response = await api.get('/products')
  products.value = response.data.data
})

const filterByName = (value) =>{return value.filter((product)=>product.name.toLowerCase().includes(searchValue.value.toLowerCase()))}

const filterProdByCat =  computed(()=>{
    if (selectedCategory.value === null) {
      return filterByName(products.value);
    }
    else{
      return filterByName(products.value.filter(products=>products.categories.some((category => category.id === selectedCategory.value))))
    }
  });

function addCartItem(product) {
  cart.addProduct(product);
}

const viewAll = () =>{ return selectedCategory.value = null}

console.log(products.value)
</script>



<template>

  <NavF :active="false"></NavF>

  <header class="p-4 space-y-3">
    <SearchBar v-model="searchValue"></SearchBar>
    <div class="flex gap-2">
      <button @click="toggleOpen" class="flex-1 min-h-[44px] bg-emerald-500 text-white rounded-lg">Filtrar</button>
      <button class="flex-1 min-h-[44px] border border-emerald-300 rounded-lg">Ordenar</button>
    </div>
  </header>

  <main class="p-4 grid grid-cols-2  gap-4 min-h-screen">
    <ProductCard v-for="product in filterProdByCat" :key="product.id" :product="product" @add-cart="addCartItem"/>
  </main>

  <div class="fixed inset-0 z-50" v-if="toggle === true">
    <div class="absolute inset-0 bg-black/30"></div>
    <FilterProduct @send-cat="getSelect" @view-all="viewAll" @toggle-close="toggleClose"/>
  </div>

</template>


<style scoped>

</style>
