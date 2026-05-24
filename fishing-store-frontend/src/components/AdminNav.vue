<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { cartStore } from '@/stores/cart';
import { ArrowLeft, BarChart3, ShoppingCart, Store } from '@lucide/vue';

const cart = cartStore();
const route = useRoute();
const router = useRouter();

const props = defineProps({
  navType: {
    type: String,
    default: '',
  },
});

const isAdminNav = computed(() => props.navType === 'admin');
const isShopNav = computed(() => props.navType === 'shop');

const adminTitle = computed(() => {
  const name = String(route.name ?? '');

  if (name.includes('product')) return 'Productos';
  if (name.includes('categor')) return 'Categorías';
  if (name.includes('section')) return 'Secciones';
  if (name.includes('order')) return 'Órdenes';

  return 'Panel de control';
});

function goBack() {
  router.back();
}
</script>

<template>
  <nav v-if="isAdminNav" class="w-full">
    <div class="flex items-center gap-2">
      <button type="button" @click="goBack" class="flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white px-3 text-sm font-black text-blue-950 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition active:scale-[0.95]">
        <ArrowLeft class="h-4 w-4" />
        <span>Volver</span>
      </button>

      <RouterLink to="/admin-panel/dashboard" class="flex min-w-0 flex-1 items-center gap-3 rounded-[24px] border border-slate-100 bg-white/95 px-3 py-2 shadow-[0_10px_26px_rgba(15,23,42,0.06)] backdrop-blur-xl transition active:scale-[0.98]">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <BarChart3 class="h-5 w-5" />
        </div>

        <div class="min-w-0">
          <span class="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Admin</span>
          <span class="block truncate text-sm font-black text-blue-950">{{ adminTitle }}</span>
        </div>
      </RouterLink>

      <RouterLink to="/admin-panel/dashboard" class="hidden h-11 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 px-4 text-sm font-black text-blue-700 transition active:scale-[0.95] min-[520px]:flex">
        Panel
      </RouterLink>
    </div>
  </nav>

  <nav v-else class="w-full">
    <div class="flex items-center justify-between gap-2">
      <button type="button" @click="goBack" class="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white px-3 text-sm font-black text-blue-950 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition active:scale-[0.95]">
        <ArrowLeft class="h-4 w-4" />
        <span>Volver</span>
      </button>

      <RouterLink to="/" class="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white px-3 text-sm font-black text-blue-950 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition active:scale-[0.95]">
        <Store class="h-4 w-4 text-blue-700" />
        <span>Inicio</span>
      </RouterLink>

      <RouterLink v-if="isShopNav" to="/cart" class="relative flex h-11 items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-3 text-sm font-black text-blue-900 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition active:scale-[0.95]">
          <ShoppingCart class="h-4 w-4" />


        <span v-if="cart.count > 0" class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-black text-white ring-2 ring-white">
          {{ cart.count }}
        </span>
      </RouterLink>
    </div>
  </nav>
</template>
