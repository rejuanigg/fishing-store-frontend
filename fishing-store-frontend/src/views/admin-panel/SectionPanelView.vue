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
      <form class="bg-red-300 w-4/5 h-120 px-20 py-10 flex flex-col " @submit.prevent="onSubmit">

        <div class="flex flex-col h-1/3 justify-center">
          <div class="w-full flex justify-center ">
            <h2 class="text-xl font-bold">Añade una Seccion</h2>
          </div>
        </div>

        <div class="w-full h-1/3">

          <div class="h-1/2 flex flex-col w-full">
            <label class="font-semibold">Nombre</label>
            <input v-model="name" type="text" name="sa" id="s" class="bg-white h-full w-full">
          </div>

        </div>

        <div class="h-1/3 w-full flex items-center justify-center gap-4">
          <button class="h-1/4 font-semibold bg-red-50 p-2 rounded-lg flex items-center">
            Agregar Seccion
          </button>
          <button class="h-1/4 font-semibold bg-red-50 p-2 rounded-lg flex items-center">
            Ir a mis Secciones
          </button>
        </div>

      </form>
  </div>
</template>
