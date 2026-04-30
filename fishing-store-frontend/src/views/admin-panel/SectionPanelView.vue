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
  <div class="bg-red-50 w-full h-full flex justify-center items-center">
      <form @submit.prevent="onSubmit" class="bg-red-300 w-4/5 h-120 p-10">
        
        <div class="w-full flex justify-center h-1/5">
          <h2 class="text-xl font-bold">Añade una Seccion</h2>
        </div>


        <div class="h-1/6 flex flex-col">
          <label for="" class="font-semibold">Nombre</label>
          <input v-model="name"  type="text" name="sa" id="s" class="bg-white h-full">
        </div>

        <button class="h-1/6 font-semibold">
          Agregar Seccion
        </button>

      </form>
  </div>
</template>
