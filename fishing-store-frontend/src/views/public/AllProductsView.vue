<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import api from '@/services/api';
import FilterProduct from '@/components/FilterProduct.vue';
import SearchBar from '@/components/SearchBar.vue';
import Loading from '@/components/UI/Loading.vue';

const products = ref([]);
const selectedCategory = ref(null);
const toggle = ref(false);
const searchValue = ref('');

const loading = ref(true);
const loadingMore = ref(false);
const meta = ref(null);

const hasMorePages = computed(() => {
  return meta.value && meta.value.current_page < meta.value.last_page;
});

async function fetchProducts(page = 1) {
  if (page === 1) loading.value = true;
  else loadingMore.value = true;

  try {
    const response = await api.get('/products', {
      params: {
        page,
      },
    });

    if (page === 1) {
      products.value = response.data.data;
    } else {
      products.value = [...products.value, ...response.data.data];
    }

    meta.value = response.data.meta;
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
}

onMounted(() => {
  fetchProducts();
});

async function loadMore() {
  if (!hasMorePages.value || loadingMore.value) return;

  await fetchProducts(meta.value.current_page + 1);
}

function getSelect(id) {
  selectedCategory.value = id;
  toggleClose();
}

function toggleOpen() {
  toggle.value = true;
}

function toggleClose() {
  toggle.value = false;
}

function filterByName(value) {
  return value.filter((product) => product.name.toLowerCase().includes(searchValue.value.toLowerCase()));
}

const filterProdByCat = computed(() => {
  if (selectedCategory.value === null) {
    return filterByName(products.value);
  }

  return filterByName(
    products.value.filter((product) => product.categories.some((category) => category.id === selectedCategory.value))
  );
});

function viewAll() {
  selectedCategory.value = null;
  toggleClose();
}
</script>


<template>
  <div v-if="loading" class="flex min-h-[100dvh] w-full items-center justify-center bg-slate-50">
    <Loading />
  </div>

  <div v-else class="min-h-[100dvh] bg-slate-50 pb-28">
    <section class="px-5 pt-5">
  <div class="mx-auto w-full max-w-6xl">
    <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">
      Catálogo
    </span>

    <h1 class="mt-1 text-2xl font-black tracking-tight text-emerald-950">
      Productos de pesca
    </h1>

    <p class="mt-1 text-sm font-medium leading-6 text-slate-500">
      Buscá equipos, accesorios y productos disponibles.
    </p>
  </div>
</section>

<section class="sticky top-16 z-40 mt-4 border-y border-slate-100 bg-slate-50/95 px-5 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl">
  <div class="mx-auto flex w-full max-w-6xl flex-col gap-3 min-[520px]:flex-row min-[520px]:items-center">
    <div class="min-w-0 flex-1">
      <SearchBar v-model="searchValue" />
    </div>

    <div class="grid grid-cols-2 gap-2 min-[520px]:flex min-[520px]:shrink-0">
      <button @click="toggleOpen" type="button" class="flex h-11 items-center justify-center rounded-2xl bg-emerald-600 px-4 text-sm font-black text-white shadow-[0_10px_24px_rgba(5,150,105,0.18)] transition active:scale-[0.98] min-[520px]:min-w-[130px]">
        Filtrar
      </button>

      <button v-if="selectedCategory !== null" @click="viewAll" type="button" class="flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition active:scale-[0.98] min-[520px]:min-w-[130px]">
        Limpiar
      </button>

      <button v-else type="button" class="flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-400 shadow-[0_8px_20px_rgba(15,23,42,0.04)] min-[520px]:min-w-[130px]">
        Sin filtro
      </button>
    </div>
  </div>
</section>

    <main class="mx-auto w-full max-w-6xl px-5 pt-6">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 class="text-lg font-black text-emerald-950">
            Disponibles en tienda
          </h2>

          <p class="mt-1 text-xs font-semibold text-slate-500">
            {{ filterProdByCat.length }} productos encontrados
          </p>
        </div>

        <span class="shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-black text-emerald-700">
          Stock real
        </span>
      </div>

      <div v-if="filterProdByCat.length > 0">
        <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4">
          <ProductCard v-for="product in filterProdByCat" :key="product.id" :product="product" />
        </div>

        <div v-if="hasMorePages" class="flex justify-center px-2 pb-32 pt-8">
          <button @click="loadMore" :disabled="loadingMore" type="button" class="flex h-12 w-full max-w-[320px] items-center justify-center rounded-2xl border border-emerald-200 bg-white px-6 text-sm font-black text-emerald-700 shadow-[0_10px_25px_rgba(15,23,42,0.05)] transition active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100">
            <span v-if="loadingMore">Cargando...</span>
            <span v-else>Cargar más productos</span>
          </button>
        </div>
      </div>

      <div v-else class="mt-6 rounded-[34px] border border-dashed border-emerald-200 bg-white px-6 py-12 text-center shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-3xl">
          🎣
        </div>

        <h3 class="mt-5 text-lg font-black text-emerald-950">
          No encontramos productos
        </h3>

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

      <div class="absolute bottom-0 left-0 right-0 z-10 mx-auto max-h-[86dvh] max-w-screen-md overflow-hidden rounded-t-[34px] border-t border-white/80 bg-white shadow-[0_-18px_45px_rgba(15,23,42,0.18)] animate-slide-up">
        <div class="border-b border-slate-100 px-5 pb-4 pt-4">
          <div class="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200"></div>

          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">
                Filtros
              </span>

              <h2 class="mt-1 text-xl font-black text-emerald-950">
                Refinar productos
              </h2>

              <p class="mt-1 text-sm font-medium leading-6 text-slate-500">
                Elegí una categoría para encontrar más rápido lo que buscás.
              </p>
            </div>

            <button @click="toggleClose" type="button" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-lg font-black text-slate-500 transition active:scale-[0.96]">
              ×
            </button>
          </div>
        </div>

        <div class="max-h-[calc(86dvh-150px)] overflow-y-auto px-5 py-5 pb-[calc(env(safe-area-inset-bottom)+24px)]">
          <FilterProduct @send-cat="getSelect" @view-all="viewAll" @toggle-close="toggleClose" />
        </div>
      </div>
    </div>
  </div>
</template>
