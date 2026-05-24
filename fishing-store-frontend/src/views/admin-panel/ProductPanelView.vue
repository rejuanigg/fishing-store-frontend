<script setup>
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import { useAuthStore } from '@/stores/auth';
import Loading from '@/components/UI/Loading.vue';
import { useToastStore } from '@/stores/toast';
import { CircleOff } from '@lucide/vue';

const toast = useToastStore();
const auth = useAuthStore();

const products = ref([]);
const searchValue = ref('');
const featureFilter = ref(null);

const loading = ref(true);
const loadingMore = ref(false);
const featuredLoadingId = ref(null);

const meta = ref(null);

const isAdmin = computed(() => {
  return auth.advancedAccess === true;
});

const hasMorePages = computed(() => {
  return meta.value && meta.value.current_page < meta.value.last_page;
});

onMounted(() => {
  fetchProducts();
});

async function fetchProducts(page = 1) {
  if (page === 1) {
    loading.value = true;
  } else {
    loadingMore.value = true;
  }

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
  } catch (error) {
    const errors = error.response?.data?.errors;

    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se pudieron cargar los productos';

    toast.show('Error', message, 'error');
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
}

async function loadMore() {
  if (!hasMorePages.value || loadingMore.value) return;

  await fetchProducts(meta.value.current_page + 1);
}

const filteredProducts = computed(() => {
  const search = searchValue.value.trim().toLowerCase();

  let result = products.value;

  if (featureFilter.value !== null) {
    result = result.filter((product) => {
      return Boolean(product.is_featured) === Boolean(featureFilter.value);
    });
  }

  if (search) {
    result = result.filter((product) => {
      return product.name.toLowerCase().includes(search);
    });
  }

  return result;
});

async function addFeature(product) {
  if (featuredLoadingId.value) return;

  featuredLoadingId.value = product.id;

  try {
    const response = await api.patch(`/products/${product.id}/featured`, {
      is_featured: !product.is_featured,
    });

    const index = products.value.findIndex((item) => {
      return item.id === product.id;
    });

    if (index !== -1) {
      products.value[index] = response.data.data;
    }

    toast.show('Éxito', 'Producto actualizado correctamente', 'success');
  } catch (error) {
    const errors = error.response?.data?.errors;

    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? "No se pudo modificar el estado de destacado";

    toast.show('Error', message, 'error');
  } finally {
    featuredLoadingId.value = null;
  }
}
</script>

<template>
  <div v-if="loading" class="min-h-[100dvh] bg-slate-50">
    <Loading />
  </div>

  <div v-else class="min-h-[100dvh] bg-slate-50">
    <section class="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 pt-6">
      <div class="flex flex-col gap-2">
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">
          Panel admin
        </span>

        <h1 class="text-2xl font-black tracking-tight text-emerald-950">
          Gestión de productos
        </h1>

        <p class="text-sm font-medium leading-6 text-slate-500">
          Administrá, editá y organizá los productos visibles dentro de la tienda.
        </p>
      </div>

      <div class="rounded-[30px] border border-slate-100 bg-white p-3 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
        <div class="flex items-center gap-3">
          <div class="min-w-0 flex-1">
            <SearchBar v-model="searchValue" />
          </div>

          <RouterLink
            to="/admin-panel/products/create"
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-black text-white shadow-[0_12px_28px_rgba(5,150,105,0.20)] transition active:scale-[0.95]"
          >
            +
          </RouterLink>
        </div>
      </div>

      <div class="rounded-[28px] border border-slate-100 bg-white p-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
        <div class="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            @click="featureFilter = null"
            class="h-11 rounded-2xl px-3 text-xs font-black transition active:scale-[0.98] min-[380px]:text-sm"
            :class="featureFilter === null ? 'bg-emerald-600 text-white shadow-[0_10px_24px_rgba(5,150,105,0.18)]' : 'text-slate-500 active:bg-slate-50'"
          >
            Todos
          </button>

          <button
            type="button"
            @click="featureFilter = false"
            class="h-11 rounded-2xl px-3 text-xs font-black transition active:scale-[0.98] min-[380px]:text-sm"
            :class="featureFilter === false ? 'bg-emerald-600 text-white shadow-[0_10px_24px_rgba(5,150,105,0.18)]' : 'text-slate-500 active:bg-slate-50'"
          >
            Sin destacar
          </button>

          <button
            type="button"
            @click="featureFilter = true"
            class="h-11 rounded-2xl px-3 text-xs font-black transition active:scale-[0.98] min-[380px]:text-sm"
            :class="featureFilter === true ? 'bg-emerald-600 text-white shadow-[0_10px_24px_rgba(5,150,105,0.18)]' : 'text-slate-500 active:bg-slate-50'"
          >
            Destacados
          </button>
        </div>
      </div>
    </section>

    <main class="mx-auto w-full max-w-6xl px-5 pb-32 pt-6">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 class="text-lg font-black text-emerald-950">
            Productos registrados
          </h2>

          <p class="mt-1 text-xs font-semibold text-slate-500">
            {{ filteredProducts.length }} productos encontrados
          </p>
        </div>

        <span class="shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-black text-emerald-700">
          Admin
        </span>
      </div>

      <section v-if="filteredProducts.length" class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          :is-admin="isAdmin"
          @toggle-featured="addFeature"
        />
      </section>

      <section
        v-else
        class="rounded-[34px] border border-dashed border-emerald-200 bg-white px-6 py-12 text-center shadow-[0_14px_35px_rgba(15,23,42,0.05)]"
      >
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-3xl">
          <CircleOff />
        </div>

        <h3 class="mt-5 text-lg font-black text-emerald-950">
          No encontramos productos
        </h3>

        <p class="mt-2 text-sm font-medium leading-6 text-slate-500">
          Probá cambiando la búsqueda o modificando el filtro de destacados.
        </p>
      </section>

      <div v-if="hasMorePages" class="flex justify-center px-2 pt-8">
        <button
          type="button"
          @click="loadMore"
          :disabled="loadingMore"
          class="flex h-12 w-full max-w-[320px] items-center justify-center rounded-2xl border border-emerald-200 bg-white px-6 text-sm font-black text-emerald-700 shadow-[0_10px_25px_rgba(15,23,42,0.05)] transition active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100"
        >
          <span v-if="loadingMore">Cargando...</span>
          <span v-else>Cargar más productos</span>
        </button>
      </div>
    </main>
  </div>
</template>
