<script setup>
import api from '@/services/api';
import { cartStore } from '@/stores/cart';
import { useFormatPrice } from '@/composables/useFormatPrice';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const cart = cartStore();
const router = useRouter();

function confirmOrder(){
  api.post('/orders', { products: cart.product.map(p => ({ product_id: p.id, quantity: p.quantity})) })
  cart.delete()
  return router.push('/orders')
}

const { formatPrice } = useFormatPrice();

</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="rounded-[28px] border border-emerald-100 bg-white p-4 shadow-[0_-10px_35px_rgba(15,23,42,0.08)]">
      <div class="flex items-start justify-between gap-4">
        <div>
          <span class="text-[11px] font-black uppercase tracking-wide text-slate-400">
            Total
          </span>

          <p class="mt-1 text-sm font-semibold text-slate-500">
            {{ cart.count }} {{ cart.count === 1 ? 'producto' : 'productos' }}
          </p>
        </div>

        <span class="text-2xl font-black tracking-tight text-emerald-950">
          {{ formatPrice(cart.total) }}
        </span>
      </div>

      <button
        @click="confirmOrder"
        :disabled="cart.product.length === 0 || loading"
        class="mt-4 flex h-14 w-full items-center justify-center rounded-2xl bg-emerald-500 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
      >
        <span v-if="loading">
          Procesando...
        </span>

        <span v-else>
          Continuar compra
        </span>
      </button>

      <p class="mt-3 text-center text-[11px] font-medium leading-5 text-slate-400">
        El total final se confirma al generar la orden.
      </p>
    </div>
  </div>
</template>
