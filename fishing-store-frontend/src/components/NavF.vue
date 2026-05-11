<script setup>
import { routerKey, RouterLink, useRouter } from 'vue-router';
import CartIcon from './CartIcon.vue';
import { ArrowRightLeft, FishingHook, FishingRod, User } from '@lucide/vue';

const props = defineProps({
  active: {
    type:Boolean,
    default:true
  }
})

</script>

<template>

  <div v-if="active" class="w-full h-full px-2 py-3 flex items-center justify-between">

    <RouterLink to="/" class="flex-1 h-full flex flex-col items-center justify-center gap-1 text-gray-400 active:scale-95 transition">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
      <span class="text-[11px] font-medium">Home</span>
    </RouterLink>

    <RouterLink to="/products" class="flex-1 h-full flex flex-col items-center justify-center gap-1 text-gray-400 active:scale-95 transition">
      <FishingHook class="w-[22px] h-[22px]" />
      <span class="text-[11px] font-medium">Productos</span>
    </RouterLink>

    <RouterLink to="/cart" class="relative -mt-8 h-16 w-16 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200 flex flex-col items-center justify-center text-white active:scale-95 transition border-4 border-[#F9FAFB]">
      <CartIcon class="w-6 h-6" />
      <span class="text-[10px] font-semibold">Carrito</span>
    </RouterLink>

    <RouterLink to="/orders" class="flex-1 h-full flex flex-col items-center justify-center gap-1 text-gray-400 active:scale-95 transition">
      <ArrowRightLeft />
      <span class="text-[11px] font-medium">Ordenes</span>
    </RouterLink>

    <RouterLink to="/user" @click="toProfile" class="flex-1 h-full flex flex-col items-center justify-center gap-1 text-gray-400 active:scale-95 transition">
      <User />
      <span class="text-[11px] font-medium">Usuario</span>
    </RouterLink>

  </div>

</template>
