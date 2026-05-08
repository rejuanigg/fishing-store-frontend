<script setup>
import SearchBar from '@/components/SearchBar.vue';
import { useCategory } from '@/composables/useCategory';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const {categories , sections} = useCategory();

const sectionName = (sectionId) => {
  const section = sections.value.find(s => s.id === sectionId);
  return section ? section.name : 'Sin sección';
}

const toEdit = (id) => {
  return router.push({name:'category-edit', params:{ id:id }})
}

const search = ref('')
</script>
<template>


    <section class="px-5 py-8 flex flex-col w-full">
      <h1 class="text-emerald-900 text-2xl font-semibold mt-2">Gestión de Categorías</h1>
      <p class="text-emerald-500 text-base">Editá, organizá y administrá las categorías visibles en la tienda.</p>
      <div class="flex gap-2">
        <SearchBar v-model="search"></SearchBar>
        <RouterLink to="/admin-panel/categories/create" class="border-2 border-emerald-300 px-3 py-1 rounded-lg text-emerald-900 flex flex-col items-center">
        +
        </RouterLink>
      </div>
    </section>

    <section class="p-5 flex flex-col gap-4">

        <div v-for="category in categories" class="bg-white border border-gray-500 rounded-3xl p-4">
          <div class="flex justify-around mt-3 w-full">
            <div class="flex flex-col items-center gap-3 pb-3">
              <span class="text-lg font-bold mt-1">{{ category.name }}</span>
              <p class="text-xs text-emerald-500">
                Seccion: {{sectionName(category.section_id)}}
              </p>
            </div>
          </div>


          <div class="flex gap-3">
            <button @click="toEdit(category.id)" class="flex-1 h-10 rounded-xl text-sm font-semibold flex items-center justify-center bg-emerald-100 text-emerald-800">Editar</button>

          </div>

        </div>

    </section>

</template>
