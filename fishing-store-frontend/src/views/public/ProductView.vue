<script setup>
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAverage } from '@/composables/useAverage';
import { useFormatPrice } from '@/composables/useFormatPrice';
import { cartStore } from '@/stores/cart';
import Score from '@/components/Score.vue';
import Loading from '@/components/UI/Loading.vue';
import Toast from '@/components/UI/Toast.vue';
import { useToastStore } from '@/stores/toast';

const route = useRoute();
const router = useRouter();
const cart = cartStore();
const productId = Number(route.params.id)
const product = ref(null)
const item = ref(0)
const loading = ref(true)

onMounted(async()=>{
  const response = await api.get(`/products/${productId}`)
  product.value = response.data.data
  loading.value = false
})


const averageValue = computed(() => {
  const { average } = useAverage(product.value.califications);
  return average;
});

const formatedPriceValue = computed(() => {
  const { formatedPrice } = useFormatPrice(product.value.price);
  return formatedPrice;
});

const toast = useToastStore()

function addCartItem() {
  toast.show('Éxito', 'Producto agregado correctamente', 'success');
  cart.addProduct(product.value);
}

</script>

<template>
  <div v-if="loading" class="flex min-h-[100dvh] w-full items-center justify-center bg-slate-50">
    <Loading />
  </div>

  <div v-else class="min-h-[100dvh] w-full bg-slate-50 pb-32">
    <section class="px-4 pt-4">
      <div class="relative overflow-hidden rounded-[34px] border border-slate-100 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
        <div class="absolute left-4 top-4 z-10 flex items-center gap-2">
          <RouterLink to="/products" class="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/80 bg-white/95 text-lg font-black text-emerald-950 shadow-[0_10px_25px_rgba(15,23,42,0.10)] backdrop-blur-md">‹</RouterLink>

          <span v-if="product.is_featured" class="flex h-10 items-center justify-center rounded-2xl border border-white/80 bg-white/95 px-3 text-[11px] font-black uppercase tracking-wide text-emerald-700 shadow-[0_10px_25px_rgba(15,23,42,0.10)] backdrop-blur-md">Destacado</span>
        </div>

        <div class="absolute right-4 top-4 z-10">
          <span v-if="product.stocks?.[0]?.quantity <= 0" class="flex h-10 items-center justify-center rounded-2xl bg-red-500 px-3 text-[11px] font-black uppercase tracking-wide text-white shadow-[0_10px_25px_rgba(239,68,68,0.20)]">Sin stock</span>
          <span v-else-if="product.stocks?.[0]?.quantity <= 3" class="flex h-10 items-center justify-center rounded-2xl bg-amber-400 px-3 text-[11px] font-black uppercase tracking-wide text-amber-950 shadow-[0_10px_25px_rgba(251,191,36,0.22)]">Últimos</span>
        </div>

        <div class="relative flex h-[360px] w-full items-center justify-center bg-gradient-to-br from-emerald-50 via-slate-50 to-cyan-50 p-5">
          <div class="absolute -right-20 -top-16 h-56 w-56 rounded-full bg-emerald-100 blur-3xl"></div>
          <div class="absolute -left-20 bottom-[-70px] h-56 w-56 rounded-full bg-cyan-100 blur-3xl"></div>

          <img class="relative z-[1] h-full w-full rounded-[28px] object-contain transition duration-300" :class="product.stocks?.[0]?.quantity <= 0 ? 'opacity-70 grayscale-[0.15]' : ''" :src="product.images?.[item]?.image" :alt="product.name">
        </div>
      </div>

      <div v-if="product.images?.length > 1" class="mt-4 flex gap-3 overflow-x-auto px-1 pb-1 snap-x snap-mandatory">
        <button v-for="(img, index) in product.images" :key="index" type="button" @click="item = index" class="h-20 w-20 shrink-0 overflow-hidden rounded-3xl border-2 bg-white p-1 shadow-[0_10px_25px_rgba(15,23,42,0.05)] transition active:scale-[0.96] snap-start" :class="item === index ? 'border-emerald-500 opacity-100' : 'border-slate-100 opacity-70'">
          <img :src="img.image" class="h-full w-full rounded-[20px] object-cover" :alt="product.name">
        </button>
      </div>
    </section>

    <section class="px-5 pt-6">
      <div class="rounded-[34px] border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0 flex-1">
            <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">{{ product.categories?.[0]?.name ?? 'General' }}</span>
            <h1 class="mt-2 text-2xl font-black leading-tight tracking-tight text-emerald-950">{{ product.name }}</h1>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2">
            <Score :product-id="product.id" :initial-score="averageValue"></Score>
            <span class="text-xs font-black text-emerald-950">{{ averageValue }}</span>
          </div>

          <span v-if="product.stocks?.[0]?.quantity > 0" class="rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">Disponible</span>
          <span v-else class="rounded-full bg-red-50 px-3 py-2 text-xs font-black text-red-600">No disponible</span>
        </div>

        <div class="mt-5 flex items-end justify-between gap-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-wide text-slate-400">Precio</span>
            <p class="mt-1 text-3xl font-black tracking-tight text-emerald-700">{{ formatedPriceValue }}</p>
          </div>

          <div class="rounded-3xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-right">
            <span class="block text-[11px] font-bold uppercase tracking-wide text-emerald-600">Stock</span>
            <span class="mt-1 block text-sm font-black text-emerald-950">{{ product.stocks?.[0]?.quantity > 0 ? product.stocks?.[0]?.quantity + ' unidades' : 'Sin stock' }}</span>
          </div>
        </div>
      </div>

      <section class="mt-5 rounded-[34px] border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div class="flex items-start justify-between gap-4">
          <div>
            <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">Detalle</span>
            <h2 class="mt-2 text-xl font-black text-emerald-950">Descripción</h2>
          </div>
        </div>

        <p class="mt-4 text-[15px] font-medium leading-7 text-slate-500 text-pretty">{{ product.description }}</p>
      </section>

      <section class="mt-5 grid grid-cols-2 gap-3">
        <div class="rounded-[28px] border border-emerald-100 bg-emerald-50/70 p-4">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">✓</div>
          <h3 class="mt-3 text-sm font-black text-emerald-950">Stock real</h3>
          <p class="mt-1 text-xs font-medium leading-5 text-emerald-700">La tienda valida disponibilidad al crear tu pedido.</p>
        </div>

        <div class="rounded-[28px] border border-cyan-100 bg-white p-4 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">↗</div>
          <h3 class="mt-3 text-sm font-black text-emerald-950">Por WhatsApp</h3>
          <p class="mt-1 text-xs font-medium leading-5 text-slate-500">Coordinás pago, retiro o entrega después de enviar el pedido.</p>
        </div>
      </section>
    </section>

    <div class="fixed inset-x-0 bottom-0 z-40 border-t border-slate-100 bg-white/95 px-5 py-4 shadow-[0_-10px_30px_rgba(15,23,42,0.07)] backdrop-blur-xl">
      <div class="mx-auto flex max-w-screen-md items-center gap-4">
        <div class="min-w-0">
          <span class="text-[11px] font-bold uppercase tracking-wide text-slate-400">Total</span>
          <span class="block truncate text-lg font-black text-emerald-950">{{ formatedPriceValue }}</span>
        </div>

        <button v-if="product.stocks?.[0]?.quantity > 0" @click="addCartItem" class="flex h-14 flex-1 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-[0_14px_32px_rgba(5,150,105,0.22)] transition active:scale-[0.98]">Añadir al carrito</button>

        <span v-else class="flex h-14 flex-1 items-center justify-center rounded-2xl bg-slate-100 px-5 text-sm font-black text-slate-400">Sin stock</span>
      </div>
    </div>
  </div>
</template>
