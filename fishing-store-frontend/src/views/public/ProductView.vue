<script setup>
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAverage } from '@/composables/useAverage';
import { useFormatPrice } from '@/composables/useFormatPrice';
import { cartStore } from '@/stores/cart';
import Score from '@/components/Score.vue';

const route = useRoute();
const router = useRouter();
const cart = cartStore();
const productId = Number(route.params.id)
const product = ref(null)
const item = ref(0)

onMounted(async()=>{
  const response = await api.get(`/products/${productId}`)
  product.value = response.data.data
})


const nextImage = () => {
  const limit = product.value.images.length - 1;
  if (item.value < limit){
    item.value ++
  }
  else {
    item.value = 0
  }
}

const prevImage = () => {
  if (item.value > 0){
    item.value --
  }
  else {
    item.value = product.value.images.length - 1
  }
}


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
<div class="w-full min-h-screen" v-if="product">

  <div class="w-full flex flex-col gap-3 px-2">
    <img
      class="h-72 w-full object-contain bg-gray-100 rounded-xl"
      :src="product.images?.[item]?.image"
      alt=""
    >
    <div class="flex gap-2 overflow-x-auto pb-1 pt-5 px-2 snap-x snap-mandatory">      <img
        v-for="(img, index) in product.images"
        :key="index"
        :src="img.image"
        @click="item = index"
        class="h-20 w-20 object-cover rounded-lg border-2 cursor-pointer shrink-0 snap-start"
        :class="item === index
          ? 'border-emerald-500 scale-105'
          : 'border-gray-200 opacity-70'">
    </div>
  </div>


  <div class=" flex flex-col gap-2 p-5">
    <h2 class="text-2xl font-semibold text-emerald-900">{{ product.name }}</h2>
    <div class="flex gap-3">
      <Score :product-id="product.id" :initial-score="averageValue"></Score>
      <span>
        ({{ averageValue }})
      </span>
    </div>
    <span class="text-emerald-700 text-3xl font-bold tracking-tight">{{ formatedPriceValue }}</span>

    <div class="flex items-center gap-2">
      <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
      <span class="text-sm text-emerald-700 font-medium">
        Disponible
      </span>
    </div>

    <div>
      {{ product.categories.name }}
    </div>

    <div class="text-gray-600 leading-7 text-[15px] border-t pt-5 mt-3 mb-32">
        {{ product.description }}

    </div>
  </div>


  <div class="bg-white/90 backdrop-blur-md w-full py-3 px-5 border-t fixed bottom-0 left-0">
    <button v-if="product.stocks?.[0]?.quantity > 0" @click="addCartItem" class="rounded-lg text-white font-medium w-full bg-emerald-500 px-5 py-4">
      Añadir al carrito
    </button>
    <span v-else class="mt-2 w-full bg-gray-100 text-gray-400 py-2 rounded-lg text-sm flex justify-center font-medium">
      Sin stock
    </span>
  </div>
</div>

<div v-else>
  Loading PROVISORIO
</div>

</template>
