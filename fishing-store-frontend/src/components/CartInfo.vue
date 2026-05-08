<script setup>
import api from '@/services/api';
import { cartStore } from '@/stores/cart';
import { useFormatPrice } from '@/composables/useFormatPrice';
import { computed } from 'vue';

const cart = cartStore();

function confirmOrder(){
  api.post('/orders', { products: cart.product.map(p => ({ product_id: p.id, quantity: p.quantity})) })
}

const formatedPriceValue = (value) => {
  const { formatedPrice } = useFormatPrice(value);
  return formatedPrice;
}
  ;
</script>

<template>

<div class="flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <span class="text-sm text-gray-500">
      Total
    </span>
    <span class="text-2xl font-bold text-emerald-950">
      {{ formatedPriceValue(cart.total) }}
    </span>
  </div>

  <button @click="confirmOrder"
    class="h-14 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-[0.98] transition shadow-lg shadow-emerald-100">
    Continuar compra
  </button>
</div>

</template>
