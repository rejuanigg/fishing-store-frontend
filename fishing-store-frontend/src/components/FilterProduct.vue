<script setup>
import { useCategory } from '@/composables/useCategory';
import { computed, ref } from 'vue';

const {sections, categories} = useCategory();

const selectedSection = ref(null);
const emit = defineEmits(['sendCat'])

const getSelect = (id) =>{return selectedSection.value = id}

const filterCatBySec = computed(()=>{
  return categories.value.filter(({section_id})=>section_id === selectedSection.value)
})

</script>

<template>
  <div class="bg-emerald-50 border-2 p-5 border-emerald-400 rounded-xl h-150 w-2/10">
    <h2 class="text-xl font-semibold text-emerald-900">Filtrar productos</h2>
    <div class="h-2/4 w-full">
      <div v-for="section in sections" class=" w-full h-2/10 bg-emerald-200 flex items-center justify-between px-5 border border-emerald-500 rounded-lg">
        <span class="font-semibold" @click="getSelect(section.id)" >{{ section.name }}</span>
      </div>
      <ul>
        <li @click="$emit('sendCat', categories.id)" v-for="categories in filterCatBySec">{{ categories.name }}</li>
      </ul>
    </div>

  </div>
</template>
