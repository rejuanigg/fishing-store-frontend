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

const selectCategory = () =>{
  
}

</script>

<template>

  <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl px-5 pt-5 pb-8 max-h-[75vh] overflow-y-auto shadow-2xl flex flex-col gap-6">

    <div class="w-14 h-1.5 rounded-full bg-gray-200 mx-auto"></div>

    <div class="flex items-center justify-between">

      <div class="flex flex-col">
        <h3 class="text-lg font-bold text-emerald-950">Filtros</h3>
        <p class="text-sm text-gray-500">Encontrá productos más rápido.</p>
      </div>

      <button @click="$emit('toggleClose')" class="h-10 w-10 rounded-2xl bg-gray-100 text-gray-500 text-lg font-semibold active:scale-95 transition">
        ×
      </button>

    </div>

    <div class="flex flex-col gap-3">

      <label class="text-sm font-semibold text-emerald-900">
        Tipo de producto
      </label>

      <select v-model="selectedSection" class="h-12 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-emerald-950 outline-none">

        <option value="" disabled selected hidden>
          Elige una seccion
        </option>

        <option v-for="section in sections" :key="section.id" :value="section.id">
          {{ section.name }}
        </option>

      </select>

    </div>

    <div class="flex flex-col gap-3">

      <span class="text-sm font-semibold text-emerald-900">
        Categorías
      </span>

      <div class="flex flex-wrap gap-2">

        <button v-for="category in filterCatBySec" :key="category.id" @click="$emit('sendCat', category.id)" class="px-4 h-10 rounded-2xl bg-emerald-50 text-emerald-700 text-sm font-medium active:scale-95 transition">
          {{ category.name }}
        </button>

      </div>

    </div>

    <div class="flex items-center gap-3 pt-2">

      <button @click="$emit('viewAll')" class="flex-1 h-12 rounded-2xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold active:scale-95 transition">
        Ver todo
      </button>

      <button @click="$emit('toggleClose')" class="flex-1 h-12 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-95 transition">
        Aplicar
      </button>

    </div>

  </div>

</template>
