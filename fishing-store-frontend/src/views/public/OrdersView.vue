<script setup>
import OrderCard from '@/components/OrderCard.vue';
import api from '@/services/api';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import Loading from '@/components/UI/Loading.vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

const orders = ref([]);
const meta = ref(null);
const searchValue = ref('');
const selectedStatus = ref(null);
const loading = ref(true);
const loadingMore = ref(false);

const fetchRecentOrders = async () => {
  const response = await api.get('/orders/recent')
  orders.value = response.data.data
  meta.value = null
}

const fetchAllOrders = async (page = 1) => {
  clearInterval(interval.value)
  if (page === 1) loading.value = true
  else loadingMore.value = true

  const response = await api.get(`/orders?page=${page}`)

  if (page === 1) {
    orders.value = response.data.data
  } else {
    orders.value = [...orders.value, ...response.data.data]
  }

  meta.value = response.data.meta
  actualView.value = 'all'
  loading.value = false
  loadingMore.value = false
}

const fetchActiveOrders = async (page = 1) => {
  clearInterval(interval.value)
  if (page === 1) loading.value = true
  else loadingMore.value = true

  const response = await api.get(`/orders/active?page=${page}`)

  if (page === 1) {
    orders.value = response.data.data
  } else {
    orders.value = [...orders.value, ...response.data.data]
  }

  meta.value = response.data.meta
  actualView.value = 'active'
  loading.value = false
  loadingMore.value = false
}

const fetchHistoricalOrders = async (page = 1) => {
  clearInterval(interval.value)
  if (page === 1) loading.value = true
  else loadingMore.value = true

  const response = await api.get(`/orders/historical?page=${page}`)

  if (page === 1) {
    orders.value = response.data.data
  } else {
    orders.value = [...orders.value, ...response.data.data]
  }

  meta.value = response.data.meta
  actualView.value = 'historical'
  loading.value = false
  loadingMore.value = false
}

const actualView = ref('');
const interval = ref(null)

onMounted(async () => {
  if (auth.advancedAccess) {
    actualView.value = 'initial'
    handleRecentClick()
  } else {
    actualView.value = 'all'
    await fetchAllOrders()
  }
  loading.value = false
})

const startRecentPolling = () => {
  clearInterval(interval.value)
  fetchRecentOrders()
  interval.value = setInterval(() => {
    fetchRecentOrders()
  }, 8000)
  actualView.value = 'initial'
}

const handleRecentClick = () => {
  clearInterval(interval.value)
  startRecentPolling()
}

const loadMore = () => {
  if (!meta.value) return
  const nextPage = meta.value.current_page + 1
  if (actualView.value === 'all') fetchAllOrders(nextPage)
  else if (actualView.value === 'active') fetchActiveOrders(nextPage)
  else if (actualView.value === 'historical') fetchHistoricalOrders(nextPage)
}

const hasMorePages = computed(() => {
  return meta.value && meta.value.current_page < meta.value.last_page
})

onUnmounted(() => {
  clearInterval(interval.value)
})

const filterById = (value) => {
  if (!searchValue.value) return value
  return value.filter((order) => Number(order.id) === Number(searchValue.value))
}

const filter = computed(() => {
  if (selectedStatus.value === null) return filterById(orders.value)
  return filterById(orders.value.filter((order) => order.status === selectedStatus.value))
})

const totalOrders = computed(() => filter.value.length)
const hasOrders = computed(() => filter.value.length > 0)

const handleStatusUpdated = (updatedOrder) => {
  const order = orders.value.find((order) => order.id === updatedOrder.id)
  if (order) order.status = updatedOrder.status
}

const getDateGroup = (datetime) => {
  const date = new Date(String(datetime).replace(' ', 'T'))
  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diffTime = startOfToday - startOfDate
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Ayer'
  if (diffDays > 1 && diffDays <= 7) return 'Últimos 7 días'
  if (date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) return 'Este mes'

  return date.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })
}

const groupedOrders = computed(() => {
  const groups = {}
  filter.value.forEach((order) => {
    const group = getDateGroup(order.datetime)
    if (!groups[group]) groups[group] = []
    groups[group].push(order)
  })
  return groups
})
</script>

<template>
  <div v-if="loading" class="flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50">
    <Loading />
  </div>

  <div v-else class="min-h-screen bg-slate-50 pb-40">
    <section class="mx-auto w-full max-w-3xl px-5 pt-6">

      <div class="relative overflow-hidden rounded-[34px] bg-blue-950 p-5 text-white shadow-[0_18px_45px_rgba(2,44,34,0.18)]">
        <div class="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-400/20 blur-3xl"></div>
        <div class="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl"></div>

        <div class="relative">
          <span class="text-xs font-black uppercase tracking-[0.22em] text-blue-300">Gestión de compras</span>

          <div class="mt-3 flex items-end justify-between gap-4">
            <div>
              <h1 class="text-3xl font-black tracking-tight">Órdenes</h1>
              <p class="mt-2 max-w-[260px] text-sm leading-6 text-blue-50/80">Buscá, filtrá y gestioná las compras de la tienda.</p>
            </div>

            <div class="shrink-0 rounded-3xl bg-white/10 px-4 py-3 text-right ring-1 ring-white/10">
              <span class="block text-2xl font-black">{{ totalOrders }}</span>
              <span class="block text-[11px] font-bold text-blue-100">órdenes</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5 rounded-[28px] border border-blue-100 bg-white p-4 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
        <SearchBar v-model="searchValue" />

        <div class="mt-4 flex gap-2 overflow-x-auto pb-1">
          <button @click="handleRecentClick" v-if="auth.advancedAccess" class="h-11 shrink-0 rounded-2xl border px-5 text-sm font-black transition active:scale-[0.98]" :class="actualView === 'initial' ? 'border-blue-950 bg-blue-950 text-white shadow-[0_10px_25px_rgba(2,44,34,0.18)]' : 'border-slate-200 bg-white text-slate-500'">Recientes</button>

          <button @click="fetchAllOrders()" class="h-11 shrink-0 rounded-2xl border px-5 text-sm font-black transition active:scale-[0.98]" :class="actualView === 'all' ? 'border-blue-950 bg-blue-950 text-white shadow-[0_10px_25px_rgba(2,44,34,0.18)]' : 'border-slate-200 bg-white text-slate-500'">Todas</button>

          <button @click="fetchActiveOrders()" class="h-11 shrink-0 rounded-2xl border px-5 text-sm font-black transition active:scale-[0.98]" :class="actualView === 'active' ? 'border-blue-950 bg-blue-950 text-white shadow-[0_10px_25px_rgba(2,44,34,0.18)]' : 'border-slate-200 bg-white text-slate-500'">Activas</button>

          <button @click="fetchHistoricalOrders()" class="h-11 shrink-0 rounded-2xl border px-5 text-sm font-black transition active:scale-[0.98]" :class="actualView === 'historical' ? 'border-blue-950 bg-blue-950 text-white shadow-[0_10px_25px_rgba(2,44,34,0.18)]' : 'border-slate-200 bg-white text-slate-500'">Históricas</button>
        </div>
      </div>

    </section>

    <section v-if="hasOrders" class="mx-auto mt-4 flex w-full max-w-3xl flex-col gap-8 px-5">
      <section v-for="(ordersGroup, groupName) in groupedOrders" :key="groupName" class="flex flex-col gap-3">
        <div class="flex items-center justify-between px-1 pt-3">
          <div>
            <h2 class="text-lg font-black text-blue-950">{{ groupName }}</h2>
            <p class="mt-1 text-xs font-medium text-slate-400">Compras agrupadas por fecha</p>
          </div>

          <span class="rounded-full bg-white px-3 py-1.5 text-xs font-black text-slate-500 shadow-sm ring-1 ring-slate-100">
            {{ ordersGroup.length }} {{ ordersGroup.length === 1 ? 'orden' : 'órdenes' }}
          </span>
        </div>

        <OrderCard :orders="ordersGroup" @status-updated="handleStatusUpdated" />
      </section>

      <button
        v-if="hasMorePages"
        @click="loadMore"
        :disabled="loadingMore"
        class="h-12 w-full rounded-2xl border border-blue-200 bg-white text-sm font-black text-blue-700 shadow-sm transition active:scale-[0.98] disabled:opacity-60">
        <span v-if="loadingMore">Cargando...</span>
        <span v-else>Cargar más</span>
      </button>
    </section>

    <section v-else class="mx-auto flex w-full max-w-3xl px-5 pt-12">
      <div class="flex w-full flex-col items-center justify-center rounded-[34px] border border-dashed border-blue-200 bg-white px-6 py-12 text-center shadow-sm">
        <div class="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-3xl">🧾</div>
        <h2 class="mt-5 text-xl font-black text-blue-950">No hay órdenes</h2>
        <p class="mt-2 max-w-[260px] text-sm leading-6 text-slate-500">No encontramos compras con los filtros seleccionados.</p>
        <button @click="selectedStatus = null; searchValue = ''" class="mt-6 h-12 rounded-2xl bg-blue-500 px-6 text-sm font-black text-white shadow-lg shadow-blue-500/20 active:scale-[0.98] transition">Limpiar filtros</button>
      </div>
    </section>
  </div>
</template>
