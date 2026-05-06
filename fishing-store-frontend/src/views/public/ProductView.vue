<script setup>
import api from '@/services/api';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const productId = Number(route.params.id)
const product = ref(null)

onMounted(async()=>{
  const response = await api.get(`/products/${productId}`)
  product.value = response.data.data
})

</script>

<template>
<div v-if="product">
  <h1>{{ product.name }}</h1>
</div>
<div v-else>
  Nada che
</div>

</template>
