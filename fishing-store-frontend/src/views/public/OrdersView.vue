<script setup>
import OrderCard from '@/components/OrderCard.vue';
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import { useFormatDate } from '@/composables/useFormatDate';
import Loading from '@/components/UI/Loading.vue';

const orders = ref([])

const searchValue = ref("");
const selectedStatus = ref(null)

const loading = ref(true)

onMounted(async()=>{
  const response = await api.get('/orders')
  orders.value = response.data.data.sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
  loading.value = false
})

const filterById = (value) => {
  if (!searchValue.value) return value;

  return value.filter((order) => {
    return Number(order.id) === Number(searchValue.value);
  });
}

const filter = computed(() => {
  if (selectedStatus.value === null) {
    return filterById(orders.value)
  }
  else {
    return filterById(orders.value.filter(order => order.status === selectedStatus.value))
  }
})

const handleStatusUpdated = (updatedOrder) => {
  const order = orders.value.find(order => order.id === updatedOrder.id)

  if (order) {
    order.status = updatedOrder.status
  }
}

//
const getDateGroup = (datetime) => {
  const date = new Date(String(datetime).replace(' ', 'T'))
  const today = new Date()

  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  const diffTime = startOfToday - startOfDate
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return 'Hoy'
  }

  if (diffDays === 1) {
    return 'Ayer'
  }

  if (diffDays > 1 && diffDays <= 7) {
    return 'Últimos 7 días'
  }

  if (date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
    return 'Este mes'
  }

  return date.toLocaleDateString('es-AR', {
    month: 'long',
    year: 'numeric'
  })
}

const groupedOrders = computed(() => {
  const groups = {}

  filter.value.forEach((order) => {
    const group = getDateGroup(order.datetime)

    if (!groups[group]) {
      groups[group] = []
    }

    groups[group].push(order)
  })

  return groups
})

</script>

<template>
  <div v-if="loading" class="flex min-h-screen w-full items-center justify-center overflow-hidden">
    <Loading />
  </div>

  <div v-else class="min-h-screen pb-28">
    <section class="mx-auto flex w-full max-w-3xl flex-col gap-5 px-5 pt-6">
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-bold text-emerald-950">Órdenes</h1>
        <p class="text-sm text-gray-500">Buscá, filtrá y gestioná las compras de la tienda.</p>
      </div>

      <SearchBar v-model="searchValue" />

      <div class="flex gap-2 overflow-x-auto pb-1">
        <button @click="selectedStatus = null" :class="selectedStatus === null ? 'h-10 shrink-0 rounded-2xl bg-emerald-500 px-4 text-sm font-semibold text-white' : 'h-10 shrink-0 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600'">Todas</button>

        <button @click="selectedStatus = 'waiting'" :class="selectedStatus === 'waiting' ? 'h-10 shrink-0 rounded-2xl bg-emerald-500 px-4 text-sm font-semibold text-white' : 'h-10 shrink-0 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600'">En espera</button>

        <button @click="selectedStatus = 'processing'" :class="selectedStatus === 'processing' ? 'h-10 shrink-0 rounded-2xl bg-emerald-500 px-4 text-sm font-semibold text-white' : 'h-10 shrink-0 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600'">En proceso</button>

        <button @click="selectedStatus = 'completed'" :class="selectedStatus === 'completed' ? 'h-10 shrink-0 rounded-2xl bg-emerald-500 px-4 text-sm font-semibold text-white' : 'h-10 shrink-0 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600'">Listas</button>

        <button @click="selectedStatus = 'cancelled'" :class="selectedStatus === 'cancelled' ? 'h-10 shrink-0 rounded-2xl bg-emerald-500 px-4 text-sm font-semibold text-white' : 'h-10 shrink-0 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600'">Canceladas</button>
      </div>
    </section>

    <section v-for="(ordersGroup, groupName) in groupedOrders" :key="groupName" class="mx-auto flex w-full max-w-3xl flex-col gap-3 px-5">
      <div class="flex items-center justify-between px-1 pt-10 pb-5">
        <h2 class="text-lg font-bold text-emerald-950">{{ groupName }}</h2>
        <span class="text-sm text-gray-400">{{ ordersGroup.length }} órdenes</span>
      </div>

      <OrderCard :orders="ordersGroup" @status-updated="handleStatusUpdated" />
    </section>
  </div>
</template>
