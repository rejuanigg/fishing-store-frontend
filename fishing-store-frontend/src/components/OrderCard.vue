<script setup>
import { useFormatDate } from '@/composables/useFormatDate';
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useFormatPrice } from '@/composables/useFormatPrice';

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

const { formatPrice } = useFormatPrice();

//formatear fecha a hora argentina
const formatData = (value) => {
  return useFormatDate(value);
}

</script>

<template>
  <article v-for="order in orders" :key="order.id" class="overflow-hidden rounded-[30px] border border-emerald-100/80 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.06)] transition active:scale-[0.99]">

    <div class="p-5">
      <div class="flex items-start justify-between gap-4">

        <div class="min-w-0">
          <span class="block text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
            {{ auth.advancedAccess ? 'Orden' : 'Pedido' }}
          </span>

          <h3 class="mt-1 text-xl font-black tracking-tight text-emerald-950">
            #{{ order.id }}
          </h3>

          <p class="mt-1 text-sm font-medium leading-6 text-slate-500">
            {{ formatData(order.datetime) }}
          </p>
        </div>

        <span class="flex h-9 shrink-0 items-center justify-center rounded-full px-4 text-xs font-black capitalize shadow-sm ring-1 ring-inset" :class="{
          'bg-amber-50 text-amber-700 ring-amber-200': order.status === 'waiting',
          'bg-blue-50 text-blue-700 ring-blue-200': order.status === 'processing',
          'bg-emerald-50 text-emerald-700 ring-emerald-200': order.status === 'completed',
          'bg-red-50 text-red-700 ring-red-200': order.status === 'cancelled'
        }">
          {{ statusLabels[order.status] }}
        </span>

      </div>

      <div class="mt-5 grid grid-cols-2 gap-3">

        <div class="rounded-[24px] bg-slate-50 p-4">
          <span class="text-[11px] font-black uppercase tracking-wide text-slate-400">
            Total
          </span>

          <p class="mt-2 text-xl font-black tracking-tight text-emerald-700">
            {{ formatPrice(order.total) }}
          </p>
        </div>

        <div class="rounded-[24px] bg-slate-50 p-4">
          <span class="text-[11px] font-black uppercase tracking-wide text-slate-400">
            Productos
          </span>

          <p class="mt-2 text-xl font-black tracking-tight text-emerald-700">
            {{ order.details.length }}
          </p>
        </div>

      </div>

      <div class="mt-5 grid gap-3" :class="auth.advancedAccess ? 'grid-cols-[1fr_1.15fr]' : 'grid-cols-1'">

        <button @click="toDetailView(order.id)" class="flex h-12 items-center justify-center rounded-2xl bg-emerald-500 px-4 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition active:scale-[0.98]">
          {{ auth.advancedAccess ? 'Detalles' : 'Ver pedido' }}
        </button>

        <div v-if="auth.advancedAccess" class="relative">
          <select @change="updateStatus($event.target.value, order.id)" :value="order.status" class="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm font-black text-slate-600 outline-none transition focus:border-emerald-400 active:scale-[0.98]">
            <option value="waiting">En espera</option>
            <option value="processing">Empaquetando</option>
            <option value="completed">Listo</option>
            <option value="cancelled">Cancelado</option>
          </select>

          <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            ▼
          </span>
        </div>

      </div>
    </div>

    <div v-if="!auth.advancedAccess" class="border-t border-slate-100 bg-slate-50/70 px-5 py-4">
      <div class="flex items-center justify-between gap-3">
        <div>
          <span class="block text-xs font-black uppercase tracking-wide text-slate-400">
            Seguimiento
          </span>

          <span class="mt-1 block text-sm font-bold text-emerald-950">
            {{ statusLabels[order.status] }}
          </span>
        </div>

        <button @click="toDetailView(order.id)" class="rounded-2xl bg-white px-4 py-2 text-sm font-black text-emerald-700 shadow-sm ring-1 ring-slate-100 transition active:scale-[0.98]">
          Ver estado
        </button>
      </div>
    </div>

  </article>
</template>
