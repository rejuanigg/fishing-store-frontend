<script setup>
import { useAverage } from '@/composables/useAverage';
import { useRouter } from 'vue-router';
import { useFormatPrice } from '@/composables/useFormatPrice';
import { computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();

const toProductView = (id) => {
  return router.push({name:'product-view', params:{ id:id }})
};

const toEdit = (id) => {
  return router.push({name:'admin-products-edit', params:{ id:id }})
}

const {average} = useAverage(props.product.califications)

const formatedPriceValue = (value) => {
  const { formatedPrice } = useFormatPrice(value);
  return formatedPrice;
};

</script>

<template>

  <div class="bg-white rounded-2xl p-3 shadow-sm border border-emerald-100 h-max  ">
    <div @click="toProductView(props.product.id)">
      <div class="relative bg-emerald-100 h-28 rounded-lg mb-2">

        <span v-if="props.product.stocks?.[0]?.quantity === 0" class="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
          Sin stock
        </span>

        <img
          v-if="props.product.images?.length"
          :src="props.product.images[0].image"
          class="w-full h-full rounded-lg border border-emerald-200 object-cover"
        >

        <img
          v-else
          src="../assets/1.png"
          class="w-full h-full rounded-lg border border-emerald-200 object-cover"
        >

    </div>

    <h3 class="text-sm font-semibold text-emerald-700">{{ props.product.name }}</h3>
    <p class="text-sm text-emerald-600">⭐ {{ average }}</p>
    <p class="text-sm text-emerald-600">{{ formatedPriceValue(props.product.price) }}</p>
    </div>

    <button v-if="isAdmin" @click="toEdit(props.product.id)" class="mt-2 w-full border-2 border-emerald-500 text-emerald-500 font-semibold py-2 rounded-lg text-sm active:scale-95">
      Editar
    </button>

    <button v-else-if="props.product.stocks?.[0]?.quantity > 0" @click="$emit('addCart', props.product)" class="mt-2 w-full bg-emerald-500 text-white py-2 rounded-lg text-sm active:scale-95">
      Agregar al carrito
    </button>

    <span v-else class="mt-2 w-full bg-gray-100 text-gray-400 py-2 rounded-lg text-sm flex justify-center font-medium">
      Sin stock
    </span>
  </div>

</template>

