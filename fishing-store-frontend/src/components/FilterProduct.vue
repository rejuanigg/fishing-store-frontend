<script setup>
import { useCategory } from '@/composables/useCategory';
import { computed, ref } from 'vue';

const {sections, categories} = useCategory();

const selectedSection = ref(null);
const emit = defineEmits(['sendCat', 'viewAll', 'toggleClose'])

const selected = computed((id)=>{
  return selectedSection.value = id
})

const filterCatBySec = computed(()=>{
  return categories.value.filter(({section_id})=>section_id === selectedSection.value)
})

</script>

<template>

  <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[70vh]">

    <h3 class="font-semibold mb-4">Filtros</h3>

    <div class="flex flex-col gap-2 mt-6">
      <p class="font-semibold text-emerald-800 text-xl">Tipo de producto</p>
      <select class="border-2 p-2 bg-emerald-100 text-emerald-900 border-emerald-600 rounded-lg" v-model="selectedSection">
        <option value="">Cañas de pescar, Reels, Tanzas, etc...</option>
        <option :value="section.id" v-for="section in sections">{{ section.name }}</option>
      </select>
      <ul class="mb-6 flex flex-col px-5 gap-5 bg-emerald-50">
        <li class="p-2" @click="$emit('sendCat', categories.id)" v-for="categories in filterCatBySec">{{ categories.name }}</li>
      </ul>
    </div>




    <div class="">
      <button @click="$emit('viewAll')" class="w-1/2 border rounded-lg py-2">Ver todo</button>
      <button @click="$emit('toggleClose')" class="w-1/2 bg-emerald-500 text-white rounded-lg py-2">Ok</button>
    </div>

  </div>

</template>
