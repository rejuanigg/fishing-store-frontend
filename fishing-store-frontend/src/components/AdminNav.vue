<script setup>

import { cartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue';

const authStore = useAuthStore();
const cart = cartStore();
const route = useRoute()
const router = useRouter()

const props = defineProps({
  navType:{
    type:String,
    default:''
  }
})

</script>

<template>

  <div v-if="navType === 'admin'" class="w-full flex items-center justify-between">

    <RouterLink to="/admin-panel/dashboard" class="flex items-center gap-3 active:scale-95 transition">
      <div class="h-11 w-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v18h18" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v-3.75m4.5 3.75v-6.75m4.5 6.75v-9.75" />
        </svg>
      </div>

      <div class="flex flex-col">
        <span class="text-xs font-medium uppercase tracking-wide text-gray-400">Admin</span>
        <span class="text-sm font-semibold text-emerald-950">Panel de control</span>
      </div>
    </RouterLink>

  </div>

  <div v-else class="w-full flex items-center justify-between gap-4">

    <RouterLink to="/" class="h-11 w-11 rounded-2xl bg-gray-50 flex items-center justify-center text-emerald-900 active:scale-95 transition">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
      </svg>
    </RouterLink>

    <span class="flex-1 text-center text-sm font-semibold text-emerald-950 truncate">
      {{ route.name }}
    </span>

    <RouterLink v-if="navType === 'shop'" to="/cart" class="relative h-11 w-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-900 active:scale-95 transition">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>

      <span class="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-bold text-white">
        {{ cart.count }}
      </span>
    </RouterLink>

    <div v-else class="h-11 w-11">
      
    </div>

  </div>

</template>

