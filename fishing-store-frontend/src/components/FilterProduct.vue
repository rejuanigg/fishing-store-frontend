<script setup>
import { useCategory } from '@/composables/useCategory';
import { computed, ref } from 'vue';

const {sections, categories} = useCategory();

const selectedSection = ref(null);
const emit = defineEmits(['sendCat', 'viewAll'])

const getSelect = (id) =>{return selectedSection.value = id}

const filterCatBySec = computed(()=>{
  return categories.value.filter(({section_id})=>section_id === selectedSection.value)
})

const toggleSection = () => { return selectedSection.value = null}

</script>

<template>
  <div class="bg-emerald-50 border-2 p-5 border-emerald-400 rounded-xl h-150 w-2/10">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-emerald-900">Filtrar productos</h2>
      <span @click="$emit('viewAll')" class="w-1/4 bg-emerald-100 border-2 border-emerald-600 text-center rounded-lg text-emerald-900 font-medium cursor-pointer">Todo</span>
    </div>
    <div class="h-2/4 w-full mt-5">
      <div v-for="section in sections" class=" w-full h-10 bg-emerald-200 flex items-center justify-between px-5 border border-emerald-500 rounded-lg">
        <span class="font-semibold"  >{{ section.name }}</span>
        <span v-if="selectedSection === null" @click="getSelect(section.id)">Down</span>
        <span v-else @click="toggleSection">Up</span>
      </div>
      <ul>
        <li @click="$emit('sendCat', categories.id)" v-for="categories in filterCatBySec">{{ categories.name }}</li>
      </ul>
    </div>

  </div>
</template>
