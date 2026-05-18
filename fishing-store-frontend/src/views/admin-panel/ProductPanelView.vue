<script setup>
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import { useAuthStore } from '@/stores/auth';
import Loading from '@/components/UI/Loading.vue';

const auth = useAuthStore();
const isAdmin = ref(false);

const products = ref([]);
const searchValue = ref('');

const loading = ref(true)

//Autenticacion
if (auth.advancedAccess){
  isAdmin.value = true;
}

// Carga de productos
onMounted(async()=>{
  const response = await api.get('/products')
  products.value = response.data.data
  loading.value = false
})

//filtrado

const featureFilter = ref(null)

const filterByType = (value) => {
  return value.filter((v)=>v.name.toLowerCase().includes(searchValue.value.toLowerCase()))
}

const filterByName = computed(()=>{
  if (featureFilter.value === null ){
    return filterByType(products.value)
  }
  return filterByType(
    products.value.filter(p=>Boolean(p.is_featured) === Boolean(featureFilter.value))
  )
})


const refreshProducts = async() => {
  const response = await api.get('/products')
  products.value = response.data.data
}

const productFeatured = ref(null)
const filterByFeatured = ref(null)


const addFeature = async(value)=>{
  productFeatured.value = value
  const response = await api.patch(`/products/${productFeatured.value.id}/featured`,{
    is_featured:!productFeatured.value.is_featured
  })
  await refreshProducts()

  const index = products.value.findIndex(p => p.id === productFeatured.value.id)
  products.value[index] = response.data.data

  filterByFeatured.value = products.value.filter(p=>p.is_featured === true);
}

</script>


<template>

  <div v-if="loading" class="flex min-h-screen w-full items-center justify-center overflow-hidden">
    <Loading />
  </div>

  <div v-else class="min-h-screen">

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

  <div class="flex gap-2 rounded-2xl bg-white p-1 shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-slate-100">
    <button @click="featureFilter = null" :class="featureFilter === null ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 active:bg-slate-50'" class="flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition active:scale-[0.98]">Todos</button>
    <button @click="featureFilter = false" :class="featureFilter === false ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 active:bg-slate-50'" class="flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition active:scale-[0.98]">Sin destacar</button>
    <button @click="featureFilter = true" :class="featureFilter === true ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 active:bg-slate-50'" class="flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition active:scale-[0.98]">Destacados</button>
  </div>

  </section>

    <main class="px-5 pt-6 pb-28 grid grid-cols-2 gap-4">

      <ProductCard
      v-for="product in filterByName"
      :key="product.id"
      :product="product"
      :is-admin="isAdmin"
      @toggle-featured="addFeature"
      />

    </main>

  </div>

</template>
