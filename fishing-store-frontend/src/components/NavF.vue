<script setup>
import { RouterLink } from 'vue-router';
import CartIcon from './CartIcon.vue';
import { ArrowRightLeft, FishingHook, House, User } from '@lucide/vue';

defineProps({
  active: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <nav v-if="active" class="w-full h-full px-2 py-3 flex items-center justify-between">

    <RouterLink to="/" class="flex-1 h-full flex flex-col items-center justify-center gap-1 text-gray-400 active:scale-95 transition" active-class="text-emerald-600">
      <House class="h-[22px] w-[22px]" />
      <span class="text-[11px] font-semibold">Home</span>
    </RouterLink>

    <RouterLink to="/products" class="flex-1 h-full flex flex-col items-center justify-center gap-1 text-gray-400 active:scale-95 transition" active-class="text-emerald-600">
      <FishingHook class="h-[22px] w-[22px]" />
      <span class="text-[11px] font-semibold">Productos</span>
    </RouterLink>

    <RouterLink to="/cart" class="relative -mt-8 h-16 w-16 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200 flex flex-col items-center justify-center text-white active:scale-95 transition border-4 border-[#F9FAFB]">
      <CartIcon class="h-6 w-6" />
      <span class="text-[10px] font-bold">Carrito</span>
    </RouterLink>

    <RouterLink to="/orders" class="flex-1 h-full flex flex-col items-center justify-center gap-1 text-gray-400 active:scale-95 transition" active-class="text-emerald-600">
      <ArrowRightLeft class="h-[22px] w-[22px]" />
      <span class="text-[11px] font-semibold">Órdenes</span>
    </RouterLink>

    <RouterLink to="/user" class="flex-1 h-full flex flex-col items-center justify-center gap-1 text-gray-400 active:scale-95 transition" active-class="text-emerald-600">
      <User class="h-[22px] w-[22px]" />
      <span class="text-[11px] font-semibold">Usuario</span>
    </RouterLink>

  </nav>
</template>
