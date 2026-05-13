<script setup>
import { useFormatDate } from '@/composables/useFormatDate';
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = useAuthStore();

const emit = defineEmits(['statusUpdated'])
defineProps(['orders'])

const toDetailView = (id) => {
  return router.push({name:'order-details', params:{id:id}})
}

const statusLabels = {
  waiting: 'En espera',
  processing: 'En proceso',
  completed: '¡Listo!',
  cancelled: 'Cancelado'
}

//Edicion

const updateStatus = async (newStatus, id) => {
  const response = await api.patch(`/orders/${id}`, { status: newStatus });

  emit('statusUpdated', response.data.data);
}

//formatear fecha a hora argentina
const formatData = (value) => {
  return useFormatDate(value);
}

</script>

<template>

  <div v-for="order in orders" :key="order.id" class="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex flex-col gap-5 active:scale-[0.99] transition">

    <div class="flex items-start justify-between gap-4">
      <div class="flex flex-col gap-1">

        <span class="text-lg font-semibold text-emerald-950">
          {{ auth.advancedAccess ? 'Orden' : 'Pedido' }} #{{ order.id }}
        </span>

        <span class="text-sm text-gray-500">
          {{formatData(order.datetime) }}
        </span>

      </div>

      <span class="px-3 h-8 rounded-full text-xs font-semibold flex items-center justify-center capitalize transition" :class="{
        'bg-amber-100 text-amber-700': order.status === 'waiting',
        'bg-blue-100 text-blue-700': order.status === 'processing',
        'bg-emerald-100 text-emerald-700': order.status === 'completed',
        'bg-red-100 text-red-700': order.status === 'cancelled'
      }">
        {{ statusLabels[order.status] }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-3">

      <div class="bg-gray-50 rounded-2xl p-4 flex flex-col gap-1">

        <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Total
        </span>

        <span class="text-lg font-bold text-emerald-900">
          $ {{ order.total }}
        </span>

      </div>

      <div class="bg-gray-50 rounded-2xl p-4 flex flex-col gap-1">

        <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Productos
        </span>

        <span class="text-lg font-bold text-emerald-900">
          {{ order.details.length }}
        </span>

      </div>

    </div>

    <div class="flex items-center gap-3">

      <button @click="toDetailView(order.id)" class="flex-1 h-11 rounded-2xl bg-emerald-500 text-white text-sm font-semibold flex items-center justify-center active:scale-95 transition">
        {{ auth.advancedAccess ? 'Ver detalles' : 'Ver pedido' }}
      </button>

      <select @change="updateStatus($event.target.value, order.id)" :value="order.status" v-if="auth.advancedAccess" class="h-11 px-5 rounded-2xl border border-gray-200 text-gray-700 text-sm font-semibold active:scale-95 transition">
        <option value="" disabled selected hidden>Todos los estado</option>
        <option value="waiting">En espera</option>
        <option value="processing">Empaquetando</option>
        <option value="completed">¡Listo!</option>
        <option value="cancelled">Cancelado</option>
      </select>

    </div>

    <div v-if="!auth.advancedAccess" class="flex items-center justify-between px-1">

      <span class="text-xs text-gray-400">
        Seguimiento de orden
      </span>

      <button class="text-sm font-semibold text-emerald-700 active:scale-95 transition">
        Ver estado
      </button>

    </div>

  </div>

</template>
