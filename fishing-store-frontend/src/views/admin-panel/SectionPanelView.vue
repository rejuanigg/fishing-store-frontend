<script setup>
import api from '@/services/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');

async function onSubmit() {
  const response = await api.post('/sections', {
    name: name.value
  })
  return router.push('/admin-panel')
}

</script>

<template>

  <div class="min-h-screen">
    <form @submit.prevent="onSubmit" class="border-2 border-emerald-600 p-5 flex flex-col gap-5 rounded-lg">
      <label class="text-emerald-900 font-semibold">Nombre</label>
      <input v-model="name" placeholder="Introduce el nombre de seccion" class="p-2 min-h-[44px] bg-emerald-50 border border-emerald-600 rounded-lg" type="text">
      <button class="bg-emerald-600 rounded-lg py-2 text-emerald-100 font-semibold">Add</button>
      <span class="text-center border-2 border-emerald-600 rounded-lg py-2 text-emerald-900 font-semibold">Ir a mis secciones</span>
    </form>
  </div>

</template>
