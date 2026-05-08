<script setup>
import { RouterLink } from 'vue-router';
import CartIcon from './CartIcon.vue';
import { FishingRod } from '@lucide/vue';

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
      <FishingRod class="w-[22px] h-[22px]" />
      <span class="text-[11px] font-medium">Productos</span>
    </RouterLink>

    <RouterLink to="/cart" class="relative -mt-8 h-16 w-16 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200 flex flex-col items-center justify-center text-white active:scale-95 transition border-4 border-[#F9FAFB]">
      <CartIcon class="w-6 h-6" />
      <span class="text-[10px] font-semibold">Carrito</span>
    </RouterLink>

    <RouterLink to="/favorites" class="flex-1 h-full flex flex-col items-center justify-center gap-1 text-gray-400 active:scale-95 transition">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="m12 21-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18z"/></svg>
      <span class="text-[11px] font-medium">Favoritos</span>
    </RouterLink>

    <a href="https://wa.me/5490000000000" target="_blank" class="flex-1 h-full flex flex-col items-center justify-center gap-1 text-gray-400 active:scale-95 transition">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="m3 21 1.9-5.7a9 9 0 1 1 3.8 3.8z"/></svg>
      <span class="text-[11px] font-medium">WhatsApp</span>
    </a>

  </div>

</template>
