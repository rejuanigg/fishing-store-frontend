<script setup>
import { ref, onMounted, computed } from 'vue';
import { cartStore } from '@/stores/cart';
import ProductCard from '@/components/ProductCard.vue';
import api from '@/services/api';
import FilterProduct from '@/components/FilterProduct.vue';
import SearchBar from '@/components/SearchBar.vue';

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

</script>



<template>

  <div class="min-h-screen pb-28">

    <header class="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">

      <section class="px-5 py-4 flex flex-col gap-4">

        <SearchBar v-model="searchValue"></SearchBar>

        <div class="flex items-center gap-3">

          <button @click="toggleOpen" class="flex-1 h-11 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-[0.98] transition">
            Filtrar
          </button>

          <button class="flex-1 h-11 rounded-2xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold active:scale-[0.98] transition">
            Ordenar
          </button>

        </div>

      </section>

    </header>

    <main class="px-5 pt-6 pb-10 grid grid-cols-2 gap-4">

      <ProductCard v-for="product in filterProdByCat" :key="product.id" :product="product" @add-cart="addCartItem" />

    </main>

    <div v-if="toggle" class="fixed inset-0 z-50">

      <button @click="toggleClose" class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></button>

      <div class="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl p-5 z-10 animate-slide-up">

        <FilterProduct @send-cat="getSelect" @view-all="viewAll" @toggle-close="toggleClose" />

      </div>

    </div>

  </div>

</template>

<style scoped>

</style>
