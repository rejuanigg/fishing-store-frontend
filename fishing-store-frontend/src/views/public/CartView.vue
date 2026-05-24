<script setup>
import CartItem from '@/components/CartItem.vue';
import { cartStore } from '@/stores/cart';
import CartInfo from '@/components/CartInfo.vue';

const cart = cartStore();

</script>

<template>
  <section class="min-h-screen bg-slate-50 pb-40">

    <div class="px-5 pt-6">
      <div class="relative overflow-hidden rounded-[34px] bg-blue-950 p-5 text-white shadow-[0_18px_45px_rgba(2,44,34,0.18)]">
        <div class="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-400/20 blur-3xl"></div>
        <div class="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl"></div>

        <div class="relative flex items-end justify-between gap-4">
          <div>
            <span class="text-xs font-black uppercase tracking-[0.22em] text-blue-300">
              Resumen de compra
            </span>

            <h1 class="mt-2 text-3xl font-black tracking-tight">
              Tu carrito
            </h1>

            <p class="mt-2 max-w-[260px] text-sm leading-6 text-blue-50/80">
              Revisá tus productos antes de continuar con la compra.
            </p>
          </div>

          <div class="shrink-0 rounded-3xl bg-white/10 px-4 py-3 text-right ring-1 ring-white/10">
            <span class="block text-2xl font-black">
              {{ cart.product.length }}
            </span>

            <span class="block text-[11px] font-bold text-blue-100">
              items
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="cart.product.length > 0" class="px-5 pt-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-black tracking-tight text-blue-950">
            Productos
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Modificá cantidades o eliminá productos.
          </p>
        </div>

        <button @click="cart.delete" class="rounded-2xl bg-red-50 px-4 py-2 text-xs font-black text-red-500 active:scale-[0.98] transition">
          Vaciar
        </button>
      </div>

      <div class="mt-4 flex flex-col gap-4">
        <CartItem />
      </div>
    </div>

    <div v-else class="px-5 pt-8">
      <div class="flex flex-col items-center justify-center rounded-[34px] border border-dashed border-blue-200 bg-white px-6 py-14 text-center shadow-sm">
        <div class="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-3xl">
          🛒
        </div>

        <h2 class="mt-5 text-xl font-black text-blue-950">
          Tu carrito está vacío
        </h2>

        <p class="mt-2 max-w-[260px] text-sm leading-6 text-slate-500">
          Agregá productos desde el catálogo para continuar con tu compra.
        </p>

        <RouterLink to="/products" class="mt-6 flex h-12 items-center justify-center rounded-2xl bg-blue-500 px-6 text-sm font-black text-white shadow-lg shadow-blue-500/20 active:scale-[0.98] transition">
          Ver productos
        </RouterLink>
      </div>
    </div>

    <section v-if="cart.product.length > 0" class="fixed bottom-0 left-0 right-0 z-40 border-t border-blue-100 bg-white/95 px-5 py-4 backdrop-blur-md shadow-[0_-12px_35px_rgba(15,23,42,0.08)]">
      <div class="mx-auto w-full max-w-screen-md">
        <CartInfo />
      </div>
    </section>

  </section>
</template>
