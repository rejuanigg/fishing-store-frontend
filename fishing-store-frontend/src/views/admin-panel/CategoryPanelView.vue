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
      <form class="bg-red-300 w-4/5 h-120 p-10" @submit.prevent="onSubmit">
        <div class="flex flex-col">

        <div class="w-full flex justify-center h-1/5">
          <h2 class="text-xl font-bold">Añade una Seccion</h2>
        </div>


          <div>
            <div>

              <div class="w-1/4">
                <span>Seccion</span>
                <select v-model="sectionId" >
                  <option v-for="section in sections" :value="section.id">{{ section.name }}</option>
                </select>
              </div>

            </div>
          </div>
        </div>


        <div class="h-1/6 flex flex-col">
          <label for="" class="font-semibold">Nombre</label>
          <input v-model="name" type="text" name="sa" id="s" class="bg-white h-full">
        </div>

        <button class="h-1/6 font-semibold">
          Add
        </button>

      </form>
  </div>
</template>
