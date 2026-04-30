<script setup>
import { useCategory } from '@/composables/useCategory';
import api from '@/services/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const {sections} = useCategory();
const name = ref('');
const sectionId = ref(null);

async function onSubmit(){
  const response = await api.post('/categories',{
    name: name.value,
    section_id: sectionId.value
  })

  return router.push('/admin-panel')
}

</script>


<template>
    <div class="bg-red-50 w-full h-full flex justify-center items-center">
      <form class="bg-red-300 w-4/5 h-120 px-20 py-10 flex flex-col " @submit.prevent="onSubmit">

        <div class="flex flex-col h-1/3 justify-center">
          <div class="w-full flex justify-center ">
            <h2 class="text-xl font-bold">Añade una Categoria</h2>
          </div>
        </div>

        <div class="w-full h-1/3">

          <div class="w-full h-1/2">
            <span class="font-semibold">Seccion</span>
            <select
            class="w-full bg-red-50 h-3/5"
            v-model="sectionId" >
              <option v-for="section in sections" :value="section.id">{{ section.name }}</option>
            </select>
          </div>

          <div class="h-1/2 flex flex-col w-full">
            <label for="" class="font-semibold">Nombre</label>
            <input v-model="name" type="text" name="sa" id="s" class="bg-white h-full w-full">
          </div>

        </div>

        <div class="h-1/3 w-full flex items-center justify-center gap-4">
          <button class="h-1/4 font-semibold bg-red-50 p-2 rounded-lg flex items-center">
            Agregar Categoria
          </button>
          <button class="h-1/4 font-semibold bg-red-50 p-2 rounded-lg flex items-center">
            Ir a mis categorias
          </button>
        </div>



      </form>
  </div>
</template>
