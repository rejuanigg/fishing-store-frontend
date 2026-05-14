<script setup>
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAverage } from '@/composables/useAverage';
import { useFormatPrice } from '@/composables/useFormatPrice';
import { cartStore } from '@/stores/cart';
import Score from '@/components/Score.vue';
import Loading from '@/components/UI/Loading.vue';

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

function addCartItem() {
  cart.addProduct(product.value);
}

</script>

<template>

  <div v-if="loading" class="flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-50">
    <Loading />
  </div>

  <div v-else class="w-full min-h-screen bg-gray-50 pb-28">

    <section class="px-3 pt-3 flex flex-col gap-3">

      <div class="relative bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">

        <div class="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span class="h-8 px-3 rounded-full bg-white/90 backdrop-blur-md border border-gray-100 text-[11px] font-semibold text-emerald-700 flex items-center justify-center">
            Nuevo
          </span>
        </div>

        <div v-if="product.stocks?.[0]?.quantity <= 0" class="absolute top-4 right-4 z-10">
          <span class="h-8 px-3 rounded-full bg-red-100 text-red-600 text-[11px] font-semibold flex items-center justify-center">Sin stock</span>
        </div>

        <img class="h-80 w-full object-contain bg-gray-100 p-4" :src="product.images?.[item]?.image" alt="Imagen del producto">


      </div>

      <div v-if="product.images?.length > 1" class="flex gap-2 overflow-x-auto pb-1 pt-2 px-1 snap-x snap-mandatory">
        <img v-for="(img, index) in product.images" :key="index" :src="img.image" @click="item = index" class="h-20 w-20 object-cover rounded-2xl border-2 cursor-pointer shrink-0 snap-start transition" :class="item === index ? 'border-emerald-500 scale-105 shadow-sm shadow-emerald-100' : 'border-gray-200 opacity-70'">
      </div>

    </section>

    <section class="px-5 pt-5 flex flex-col gap-5">

      <div class="flex flex-col gap-3">

        <div class="flex items-start justify-between gap-4">

          <div class="flex-1 flex flex-col gap-2">
            <h1 class="text-2xl font-bold leading-tight text-emerald-950">{{ product.name }}</h1>

            <div class="flex items-center gap-3">
              <Score :product-id="product.id" :initial-score="averageValue"></Score>
              <span class="text-sm font-medium text-gray-500">({{ averageValue }})</span>
            </div>
          </div>

        </div>

        <div class="flex items-end justify-between gap-4">
          <span class="text-3xl font-black tracking-tight text-emerald-700">{{ formatedPriceValue }}</span>

          <span v-if="product.stocks?.[0]?.quantity > 0" class="h-8 px-3 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center justify-center">Disponible</span>

          <span v-else class="h-8 px-3 rounded-full bg-red-50 text-red-600 text-xs font-semibold flex items-center justify-center">No disponible</span>
        </div>

      </div>

      <div class="grid grid-cols-2 gap-3">

        <div class="bg-white border border-gray-100 rounded-3xl p-4 flex flex-col gap-1 shadow-sm">
          <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide">Stock</span>
          <span class="text-sm font-bold text-emerald-950">{{ product.stocks?.[0]?.quantity > 0 ? product.stocks?.[0]?.quantity + ' unidades' : 'Sin stock' }}</span>
        </div>

        <div class="bg-white border border-gray-100 rounded-3xl p-4 flex flex-col gap-1 shadow-sm">
          <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide">Categoría</span>
          <span class="text-sm font-bold text-emerald-950">{{ product.categories?.[0]?.name ?? 'General' }}</span>
        </div>

      </div>

      <section class="bg-white border border-gray-100 rounded-[32px] p-5 shadow-sm flex flex-col gap-4">

        <div class="flex flex-col gap-1">
          <h2 class="text-lg font-bold text-emerald-950">Descripción</h2>
          <p class="text-sm text-gray-500">Información del producto.</p>
        </div>

        <p class="text-[15px] leading-7 text-gray-600 text-pretty">{{ product.description }}</p>

      </section>

      <section class="bg-emerald-50 border border-emerald-100 rounded-[32px] p-5 flex flex-col gap-4">

        <div class="flex items-center gap-3">
          <div class="h-11 w-11 rounded-2xl bg-white flex items-center justify-center text-emerald-700 shadow-sm">✓</div>

          <div class="flex flex-col">
            <span class="text-sm font-bold text-emerald-950">Compra segura</span>
            <span class="text-xs leading-5 text-emerald-700">Consultá disponibilidad y detalles antes de finalizar tu pedido.</span>
          </div>
        </div>

      </section>

    </section>

    <div class="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 px-5 py-4">

      <div class="max-w-screen-md mx-auto flex items-center gap-4">

        <div class="flex flex-col">
          <span class="text-xs font-medium text-gray-400 uppercase tracking-wide">Total</span>
          <span class="text-lg font-black text-emerald-950">{{ formatedPriceValue }}</span>
        </div>

        <button v-if="product.stocks?.[0]?.quantity > 0" @click="addCartItem" class="flex-1 h-13 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-[0.98] transition">Añadir al carrito</button>

        <span v-else class="flex-1 h-13 rounded-2xl bg-gray-100 text-gray-400 text-sm font-semibold flex items-center justify-center">Sin stock</span>

      </div>

    </div>

  </div>

</template>
