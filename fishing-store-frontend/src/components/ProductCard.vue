<script setup>
import { useAverage } from '@/composables/useAverage';
import { useRouter } from 'vue-router';

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
  return router.push({name:'products-edit', params:{ id:id }})
}

const {average} = useAverage(props.product.califications)

</script>

<template>

  <div class="bg-white rounded-2xl p-3 shadow-sm border border-emerald-100 h-max  ">
    <div @click="toProductView(props.product.id)">
      <div class="bg-emerald-100 h-28 rounded-lg mb-2">
          <img v-if="props.product.images?.length" :src="props.product.images[0].image" class="w-full h-full rounded-lg border border-emerald-200 object-cover">
          <span v-else>NADA</span>
      </div>
      <h3 class="text-sm font-semibold text-emerald-700">{{ props.product.name }}</h3>
      <p class="text-sm text-emerald-600">⭐ {{ average }}</p>
      <p class="text-sm text-emerald-600">${{ props.product.price }}</p>
    </div>

    <button @click="toEdit(props.product.id)"  v-if="isAdmin===true" class="mt-2 w-full border-2 border-emerald-500 text-emerald-500 font-semibold py-2 rounded-lg text-sm active:scale-95">
      Editar
    </button>



    <button v-else @click="$emit('addCart', props.product)" class="mt-2 w-full bg-emerald-500 text-white py-2 rounded-lg text-sm active:scale-95">
    Agregar al Carrito
    </button>
  </div>

</template>

<style scoped>


</style>
