<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import api from '@/services/api';
import FilterProduct from '@/components/FilterProduct.vue';
import SearchBar from '@/components/SearchBar.vue';
import Loading from '@/components/UI/Loading.vue';

const products = ref([]);
const selectedCategory = ref(null);
const toggle = ref(false)
const searchValue = ref('')

const loading = ref(true)

const getSelect = (id) =>{return selectedCategory.value = id}

const toggleOpen = () => { toggle.value = true }
const toggleClose = () => { toggle.value = false }

onMounted(async()=>{
  const response = await api.get('/products')
  products.value = response.data.data
  loading.value = false
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

const viewAll = () =>{ return selectedCategory.value = null}

</script>



<template>
  <div v-if="loading" class="flex min-h-[100dvh] w-full items-center justify-center bg-slate-50">
    <Loading />
  </div>

  <div v-else class="min-h-[100dvh] bg-slate-50 pb-28">
    <section class="px-5 pt-5">
      <div>
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">Catálogo</span>
        <h1 class="mt-1 text-2xl font-black tracking-tight text-emerald-950">Productos de pesca</h1>
        <p class="mt-1 text-sm font-medium leading-6 text-slate-500">Buscá equipos, accesorios y productos disponibles.</p>
      </div>

      <div class="mt-4">
        <SearchBar v-model="searchValue" />
      </div>
    </section>

    <div class="sticky top-16 z-30 mt-4 border-y border-slate-100 bg-slate-50/95 px-5 py-3 backdrop-blur-xl">
      <div class="mx-auto flex max-w-screen-md items-center gap-3">
        <button @click="toggleOpen" type="button" class="flex h-11 flex-1 items-center justify-center rounded-2xl bg-emerald-600 px-4 text-sm font-black text-white shadow-[0_10px_24px_rgba(5,150,105,0.18)] transition active:scale-[0.98]">
          Filtrar
        </button>

        <button type="button" class="flex h-11 flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition active:scale-[0.98]">
          Ordenar
        </button>
      </div>
    </div>

    <main class="px-5 pt-6">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 class="text-lg font-black text-emerald-950">Disponibles en tienda</h2>
          <p class="mt-1 text-xs font-semibold text-slate-500">
            {{ filterProdByCat.length }} productos encontrados
          </p>
        </div>

        <span class="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-black text-emerald-700">
          Stock real
        </span>
      </div>

      <div v-if="filterProdByCat.length > 0" class="grid grid-cols-2 gap-4 pb-10">
        <ProductCard v-for="product in filterProdByCat" :key="product.id" :product="product" />
      </div>

      <div v-else class="mt-6 rounded-[34px] border border-dashed border-emerald-200 bg-white px-6 py-12 text-center shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-3xl">
          🎣
        </div>

        <h3 class="mt-5 text-lg font-black text-emerald-950">No encontramos productos</h3>

        <p class="mt-2 text-sm font-medium leading-6 text-slate-500">
          Probá cambiando la búsqueda o limpiando los filtros aplicados.
        </p>

        <button @click="viewAll" type="button" class="mt-6 h-12 rounded-2xl bg-emerald-600 px-6 text-sm font-black text-white shadow-[0_12px_28px_rgba(5,150,105,0.20)] transition active:scale-[0.98]">
          Ver todos
        </button>
      </div>
    </main>

    <div v-if="toggle" class="fixed inset-0 z-[1000]">
      <button @click="toggleClose" type="button" class="absolute inset-0 bg-emerald-950/45 backdrop-blur-[3px]"></button>

      <div class="absolute bottom-0 left-0 right-0 z-10 rounded-t-[34px] border-t border-white/80 bg-white p-5 shadow-[0_-18px_45px_rgba(15,23,42,0.18)] animate-slide-up">
        <div class="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200"></div>

        <div class="mb-5">
          <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">Filtros</span>
          <h2 class="mt-1 text-xl font-black text-emerald-950">Refinar productos</h2>
          <p class="mt-1 text-sm font-medium leading-6 text-slate-500">Elegí una categoría para encontrar más rápido lo que buscás.</p>
        </div>

        <FilterProduct @send-cat="getSelect" @view-all="viewAll" @toggle-close="toggleClose" />
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
