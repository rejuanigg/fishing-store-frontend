<script setup>
import Loading from '@/components/UI/Loading.vue';
import Modal from '@/components/UI/Modal.vue';
import { useFormatDate } from '@/composables/useFormatDate';
import { useFormatPrice } from '@/composables/useFormatPrice';
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/stores/toast';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const auth = useAuthStore();
const toast = useToastStore();

const orderId = Number(route.params.id);
const order = ref(null);

const loading = ref(true);
const cancelLoading = ref(false);
const statusLoading = ref(false);

const modal = ref({
  visible: false,
  variant: 'warning',
  title: '',
  text: '',
  confirmText: '',
  action: null,
  showCancel: true,
});

const statusLabels = {
  waiting: 'En espera',
  processing: 'En proceso',
  completed: '¡Listo!',
  cancelled: 'Cancelado',
};

const { formatPrice } = useFormatPrice();

const currentStatus = computed(() => {
  return order.value?.status ?? 'waiting';
});

const canCancelOrder = computed(() => {
  return !auth.advancedAccess && currentStatus.value !== 'completed' && currentStatus.value !== 'cancelled';
});

const orderItemsCount = computed(() => {
  return order.value?.details?.length ?? 0;
});

onMounted(() => {
  fetchOrder();
});

async function fetchOrder() {
  loading.value = true;

  try {
    const response = await api.get(`/orders/${orderId}`);
    order.value = response.data.data;
  } catch (error) {
    const message = error.response?.data?.message ?? 'No se pudo cargar la orden.';
    toast.show('Error', message, 'error');
    router.replace('/orders');
  } finally {
    loading.value = false;
  }
}

function formatData(value) {
  return useFormatDate(value);
}

async function updateStatus(newStatus, id) {
  if (statusLoading.value) return;

  statusLoading.value = true;

  try {
    const response = await api.patch(`/orders/${id}`, {
      status: newStatus,
    });

    order.value.status = response.data.data.status;

    toast.show('Éxito', 'Estado actualizado correctamente.', 'success');
  } catch (error) {
    const errors = error.response?.data?.errors;
    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se pudo actualizar el estado de la orden.';

    toast.show('Error', message, 'error');
  } finally {
    statusLoading.value = false;
  }
}

function openDangerModal(id) {
  modal.value = {
    visible: true,
    variant: 'danger',
    title: 'Cancelar orden',
    text: 'Al cancelar la orden, el pedido dejará de prepararse. Esta acción no debería realizarse si el producto ya fue entregado.',
    confirmText: 'Cancelar orden',
    action: () => cancelOrder(id),
    showCancel: true,
  };
}

async function cancelOrder(id) {
  if (cancelLoading.value) return;

  cancelLoading.value = true;

  try {
    const response = await api.patch(`/orders/${id}/cancel`, {
      status: 'cancelled',
    });

    order.value.status = response.data.data.status ?? 'cancelled';

    modal.value = {
      visible: true,
      variant: 'success',
      title: 'Orden cancelada',
      text: 'La orden se canceló correctamente.',
      confirmText: 'Continuar',
      action: successModal,
      showCancel: false,
    };
  } catch (error) {
    const errors = error.response?.data?.errors;
    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se pudo cancelar la orden.';

    toast.show('Error', message, 'error');
  } finally {
    cancelLoading.value = false;
  }
}

function closeModal() {
  if (cancelLoading.value || statusLoading.value) return;

  modal.value.visible = false;
}

async function handleModalConfirm() {
  if (typeof modal.value.action !== 'function') {
    modal.value.visible = false;
    return;
  }

  await modal.value.action();
}

function successModal() {
  modal.value.visible = false;
  router.push('/orders');
}
</script>

<template>
  <div v-if="loading" class="min-h-[100dvh] bg-slate-50">
    <Loading />
  </div>

  <div v-else class="min-h-[100dvh] bg-slate-50 pb-56">
    <section class="mx-auto w-full max-w-screen-md px-5 pt-6">
      <div class="overflow-hidden rounded-[34px] border border-emerald-100 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div class="relative bg-emerald-950 p-5 text-white">
          <div class="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-400/20 blur-3xl"></div>
          <div class="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl"></div>

          <div class="relative flex items-start justify-between gap-4">
            <div class="min-w-0">
              <span class="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
                {{ auth.advancedAccess ? 'Detalle de orden' : 'Detalle de pedido' }}
              </span>

              <h1 class="mt-2 text-3xl font-black tracking-tight">
                {{ auth.advancedAccess ? 'Orden' : 'Pedido' }} #{{ order.id }}
              </h1>

              <p class="mt-2 text-sm font-medium text-emerald-50/80">
                {{ formatData(order.datetime) }}
              </p>
            </div>

            <span class="flex h-9 shrink-0 items-center justify-center rounded-full px-4 text-xs font-black ring-1 ring-inset" :class="{
              'bg-amber-50 text-amber-700 ring-amber-200': currentStatus === 'waiting',
              'bg-blue-50 text-blue-700 ring-blue-200': currentStatus === 'processing',
              'bg-emerald-50 text-emerald-700 ring-emerald-200': currentStatus === 'completed',
              'bg-red-50 text-red-700 ring-red-200': currentStatus === 'cancelled'
            }">
              {{ statusLabels[currentStatus] }}
            </span>
          </div>
        </div>

        <div class="p-5">
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-[24px] bg-slate-50 p-4">
              <span class="text-[11px] font-black uppercase tracking-wide text-slate-400">
                Fecha
              </span>

              <p class="mt-2 text-sm font-black leading-5 text-emerald-950">
                {{ formatData(order.datetime) }}
              </p>
            </div>

            <div class="rounded-[24px] bg-slate-50 p-4">
              <span class="text-[11px] font-black uppercase tracking-wide text-slate-400">
                Productos
              </span>

              <p class="mt-2 text-xl font-black text-emerald-700">
                {{ orderItemsCount }}
              </p>
            </div>
          </div>

          <div v-if="auth.advancedAccess" class="mt-5 flex flex-col gap-2">
            <div class="flex items-center justify-between gap-3">
              <span class="text-[11px] font-black uppercase tracking-wide text-slate-400">
                Estado de la orden
              </span>

              <span v-if="statusLoading" class="text-xs font-black text-emerald-600">
                Cargando...
              </span>
            </div>

            <div class="relative">
              <select @change="updateStatus($event.target.value, order.id)" :value="currentStatus" :disabled="statusLoading" class="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm font-black text-slate-600 outline-none transition disabled:bg-slate-100 disabled:text-slate-400 focus:border-emerald-400">
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
      </div>
    </section>

    <section class="mx-auto w-full max-w-screen-md px-5 pt-7">
      <div class="flex items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-black tracking-tight text-emerald-950">
            Productos
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Artículos incluidos en esta orden.
          </p>
        </div>

        <span class="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-black text-slate-500 shadow-sm ring-1 ring-slate-100">
          {{ orderItemsCount }} {{ orderItemsCount === 1 ? 'item' : 'items' }}
        </span>
      </div>

      <div class="mt-4 flex flex-col gap-3">
        <template v-if="order.details?.length">
          <article v-for="detail in order.details" :key="detail.id" class="flex items-center gap-4 rounded-[28px] border border-emerald-100/80 bg-white p-4 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
            <div class="h-20 w-20 shrink-0 overflow-hidden rounded-3xl bg-emerald-50">
              <img v-if="detail.products?.images?.[0]?.image" :src="detail.products.images[0].image" class="h-full w-full object-cover" :alt="detail.products?.name">
              <div v-else class="flex h-full w-full items-center justify-center text-2xl">
                🎣
              </div>
            </div>

            <div class="min-w-0 flex-1">
              <h3 class="line-clamp-2 text-sm font-black leading-5 text-emerald-950">
                {{ detail.products?.name }}
              </h3>

              <p class="mt-1 text-xs font-semibold text-slate-500">
                Cantidad: {{ detail.quantity }}
              </p>

              <p class="mt-2 text-base font-black text-emerald-700">
                {{ formatPrice(detail.price) }}
              </p>
            </div>
          </article>
        </template>

        <div v-else class="flex flex-col items-center justify-center rounded-[34px] border border-dashed border-emerald-200 bg-white px-6 py-12 text-center shadow-sm">
          <div class="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-3xl">
            🧾
          </div>

          <h3 class="mt-5 text-xl font-black text-emerald-950">
            No hay productos
          </h3>

          <p class="mt-2 max-w-[260px] text-sm leading-6 text-slate-500">
            Esta orden todavía no posee productos asociados.
          </p>
        </div>
      </div>
    </section>

    <section v-if="canCancelOrder" class="mx-auto w-full max-w-screen-md px-5 pt-6">
      <div class="rounded-[30px] border border-red-100 bg-red-50 p-5 shadow-sm">
        <span class="text-sm font-black text-red-600">
          Cancelar pedido
        </span>

        <p class="mt-2 text-sm leading-6 text-red-500">
          Si cancelás esta orden, el pedido dejará de prepararse.
        </p>

        <button @click="openDangerModal(order.id)" :disabled="cancelLoading" class="mt-4 h-12 w-full rounded-2xl bg-red-500 text-sm font-black text-white transition active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100">
          <span v-if="cancelLoading">Cargando...</span>
          <span v-else>Cancelar orden</span>
        </button>
      </div>
    </section>

    <section class="fixed bottom-0 left-0 right-0 z-40 px-5 pb-[calc(env(safe-area-inset-bottom)+12px)]">
      <div class="mx-auto flex w-full max-w-screen-md items-center justify-between gap-4 rounded-[28px] border border-emerald-100 bg-white/95 p-4 shadow-[0_-12px_35px_rgba(15,23,42,0.10)] backdrop-blur-md">
        <div class="min-w-0 flex flex-col">
          <span class="text-[11px] font-black uppercase tracking-wide text-slate-400">
            Total
          </span>

          <span class="truncate text-2xl font-black tracking-tight text-emerald-950">
            {{ formatPrice(order.total) }}
          </span>
        </div>

        <button v-if="canCancelOrder" type="button" class="h-12 rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition active:scale-[0.98]">
          Seguir pedido
        </button>
      </div>
    </section>

    <Modal
      v-if="modal.visible"
      :variant="modal.variant"
      :title="modal.title"
      :text="modal.text"
      :confirm-text="cancelLoading ? 'Cargando...' : modal.confirmText"
      :show-cancel="modal.showCancel"
      @confirm-action="handleModalConfirm"
      @close-modal="closeModal"
    />
  </div>
</template>
