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
  <nav v-if="active" class="relative flex h-full w-full items-center justify-between">
    <RouterLink to="/" custom v-slot="{ href, navigate, isExactActive }">
      <a :href="href" @click="navigate" class="relative flex h-full flex-1 flex-col items-center justify-center gap-1 rounded-2xl transition active:scale-95" :class="isExactActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-400'">
        <span v-if="isExactActive" class="absolute top-1 h-1 w-7 rounded-full bg-emerald-500"></span>

        <House class="h-[22px] w-[22px]" />

        <span class="text-[11px] font-black">
          Home
        </span>
      </a>
    </RouterLink>

    <RouterLink to="/products" custom v-slot="{ href, navigate, isActive }">
      <a :href="href" @click="navigate" class="relative flex h-full flex-1 flex-col items-center justify-center gap-1 rounded-2xl transition active:scale-95" :class="isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-400'">
        <span v-if="isActive" class="absolute top-1 h-1 w-7 rounded-full bg-emerald-500"></span>

        <FishingHook class="h-[22px] w-[22px]" />

        <span class="text-[11px] font-black">
          Productos
        </span>
      </a>
    </RouterLink>

    <RouterLink to="/cart" custom v-slot="{ href, navigate, isActive }">
      <a :href="href" @click="navigate" class="relative -mt-8 flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 border-[#F9FAFB] text-white shadow-lg transition active:scale-95" :class="isActive ? 'bg-emerald-700 shadow-emerald-300 ring-4 ring-emerald-100' : 'bg-emerald-500 shadow-emerald-200'">
        <CartIcon class="h-6 w-6" />

        <span class="text-[10px] font-black">
          Carrito
        </span>

        <span v-if="isActive" class="absolute -bottom-2 h-1.5 w-9 rounded-full bg-emerald-600"></span>
      </a>
    </RouterLink>

    <RouterLink to="/orders" custom v-slot="{ href, navigate, isActive }">
      <a :href="href" @click="navigate" class="relative flex h-full flex-1 flex-col items-center justify-center gap-1 rounded-2xl transition active:scale-95" :class="isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-400'">
        <span v-if="isActive" class="absolute top-1 h-1 w-7 rounded-full bg-emerald-500"></span>

        <ArrowRightLeft class="h-[22px] w-[22px]" />

        <span class="text-[11px] font-black">
          Órdenes
        </span>
      </a>
    </RouterLink>

    <RouterLink to="/user" custom v-slot="{ href, navigate, isActive }">
      <a :href="href" @click="navigate" class="relative flex h-full flex-1 flex-col items-center justify-center gap-1 rounded-2xl transition active:scale-95" :class="isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-400'">
        <span v-if="isActive" class="absolute top-1 h-1 w-7 rounded-full bg-emerald-500"></span>

        <User class="h-[22px] w-[22px]" />

        <span class="text-[11px] font-black">
          Usuario
        </span>
      </a>
    </RouterLink>
  </nav>
</template>
