<script setup>
import { useFormatPrice } from '@/composables/useFormatPrice';
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const auth = useAuthStore();

const orderId = Number(route.params.id);
const order = ref(null);

onMounted(async () => {
  const response = await api.get(`/orders/${orderId}`);
  order.value = response.data.data;
});

const statusLabels = {
  waiting: 'En espera',
  processing: 'En proceso',
  completed: '¡Listo!',
  cancelled: 'Cancelado'
}

const cancelOrder = (id) =>{
  const cancelValue = 'cancelled'
  updateStatus(cancelValue, id)
}

const updatedStatus = ref({});

const updateStatus = async (newStatus, id) => {
  const response = await api.patch(`/orders/${id}`, { status: newStatus })
  updatedStatus.value[id]=response.data.data.status
}

</script>



<template>

  <div v-if="order" class="min-h-screen pb-28">

    <section class="px-5 pt-6 flex flex-col gap-5">

      <div class="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex flex-col gap-5">

        <div class="flex items-start justify-between gap-4">

          <div class="flex flex-col gap-1">

            <span class="text-sm font-medium text-emerald-600 uppercase tracking-wide">
              {{ auth.advancedAccess ? 'Detalle de orden' : 'Detalle de pedido' }}
            </span>

            <h1 class="text-2xl font-bold text-emerald-950">
              {{ auth.advancedAccess ? 'Orden' : 'Pedido' }} #{{ order.id }}
            </h1>

          </div>


          <span
            class="px-3 h-8 rounded-full text-xs font-semibold flex items-center justify-center capitalize transition"
            :class="{
              'bg-amber-100 text-amber-700': (updatedStatus[order.id] ?? order.status) === 'waiting',
              'bg-blue-100 text-blue-700': (updatedStatus[order.id] ?? order.status) === 'processing',
              'bg-emerald-100 text-emerald-700': (updatedStatus[order.id] ?? order.status) === 'completed',
              'bg-red-100 text-red-700': (updatedStatus[order.id] ?? order.status) === 'cancelled'
            }"
          >
            {{ statusLabels[updatedStatus[order.id] ?? order.status] }}
          </span>

        </div>

        <div class="grid grid-cols-2 gap-3">

          <div class="bg-gray-50 rounded-2xl p-4 flex flex-col gap-1">

            <span class="text-xs uppercase tracking-wide text-gray-500 font-medium">
              Fecha
            </span>

            <span class="text-sm font-semibold text-emerald-950">
              {{ order.datetime }}
            </span>

          </div>

          <div class="bg-gray-50 rounded-2xl p-4 flex flex-col gap-1">

            <span class="text-xs uppercase tracking-wide text-gray-500 font-medium">
              Productos
            </span>

            <span class="text-sm font-semibold text-emerald-950">
              {{ order.details?.length || 0 }}
            </span>

          </div>

        </div>

        <div v-if="auth.advancedAccess" class="flex flex-col gap-2">

          <span class="text-xs uppercase tracking-wide text-gray-500 font-medium">
            Estado de la orden
          </span>

          <select @change="updateStatus($event.target.value, order.id)" class="h-12 px-4 rounded-2xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 outline-none">

            <option value="" disabled selected hidden>
              Cambiar estado
            </option>

            <option value="waiting">
              En espera
            </option>

            <option value="processing">
              Empaquetando
            </option>

            <option value="completed">
              ¡Listo!
            </option>

            <option value="cancelled">
              Cancelado
            </option>

          </select>

        </div>

      </div>

    </section>

    <section class="px-5 pt-6 flex flex-col gap-4">

      <div class="flex items-center justify-between">

        <h2 class="text-lg font-bold text-emerald-950">
          Productos
        </h2>

        <span class="text-sm text-gray-400">
          {{ order.details?.length || 0 }} items
        </span>

      </div>

      <div v-if="order.details?.length" v-for="detail in order.details" :key="detail.id" class="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm flex items-center gap-4">

        <img :src="detail.products.images?.[0]?.image" class="h-20 w-20 rounded-2xl object-cover border border-gray-100">

        <div class="flex-1 flex flex-col gap-1">

          <span class="text-sm font-semibold text-emerald-950">
            {{ detail.products.name }}
          </span>

          <span class="text-xs text-gray-500">
            Cantidad: {{ detail.quantity }}
          </span>

          <span class="text-sm font-bold text-emerald-700">
            $ {{ detail.price }}
          </span>

        </div>

      </div>

      <div v-else class="bg-white border border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-3">

        <span class="text-lg font-semibold text-emerald-950">
          No hay productos
        </span>

        <p class="text-sm text-gray-500 text-center leading-6">
          Esta orden todavía no posee productos asociados.
        </p>

      </div>

    </section>

    <section v-if="!auth.advancedAccess && order.status !== 'completed' && order.status !== 'cancelled'" class="px-5 pt-6">

      <div class="bg-red-50 border border-red-100 rounded-3xl p-5 flex flex-col gap-4">

        <div class="flex flex-col gap-1">

        <span class="text-sm font-semibold text-red-600">
          Cancelar pedido
        </span>

        <p class="text-sm leading-6 text-red-500">
          Si cancelás esta orden no se preparará el producto para ser entregado.
        </p>

      </div>

      <button @click="cancelOrder(order.id)" class="h-12 rounded-2xl bg-red-500 text-white text-sm font-semibold active:scale-95 transition">
        Cancelar orden
      </button>

      </div>

    </section>

    <section class="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white/95 backdrop-blur-md px-5 py-4">

      <div class="max-w-screen-md mx-auto flex items-center justify-between gap-4">

        <div class="flex flex-col">

          <span class="text-xs uppercase tracking-wide text-gray-500 font-medium">
            Total
          </span>

          <span class="text-2xl font-bold text-emerald-950">
            $ {{ order.total }}
          </span>

        </div>

        <button v-if="!auth.advancedAccess && order.status !== 'completed' && order.status !== 'cancelled'" class="h-12 px-5 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-95 transition">
          Seguir pedido
        </button>

      </div>

    </section>

  </div>

</template>
