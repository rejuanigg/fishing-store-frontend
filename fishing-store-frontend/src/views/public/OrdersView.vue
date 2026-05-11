<script setup>
import OrderCard from '@/components/OrderCard.vue';
import api from '@/services/api';
import { onMounted, ref } from 'vue';

const orders = ref(null)

onMounted(async()=>{
  const response = await api.get('/orders')
  orders.value = response.data.data
})

</script>

<template>

  <div class="min-h-screen pb-28">

    <section class="px-5 pt-6 flex flex-col gap-5">

      <div class="flex flex-col gap-2">

        <h1 class="text-2xl font-bold text-emerald-950">
          Órdenes
        </h1>

        <p class="text-sm leading-6 text-gray-500">
          Visualizá y gestioná las compras realizadas dentro de la tienda.
        </p>

      </div>

    </section>

    <section class="px-5 pt-6 flex flex-col gap-4">

      <OrderCard :orders="orders"></OrderCard>

    </section>

  </div>

</template>
