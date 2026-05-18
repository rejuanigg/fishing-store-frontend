<script setup>
import SearchBar from '@/components/SearchBar.vue';
import Loading from '@/components/UI/Loading.vue';
import { useCategoryStore } from '@/stores/category';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const categoryStore = useCategoryStore()

onMounted(() => categoryStore.fetch())

const sections = computed(() => categoryStore.sections)
const categories = computed(() => categoryStore.categories)

const router = useRouter();

const sectionName = (sectionId) => {
  const section = sections.value.find(s => s.id === sectionId);
  return section ? section.name : 'Sin sección';
}

const toEdit = (id) => {
  return router.push({name:'admin-category-edit', params:{ id:id }})
}

const searchValue = ref('')

const filterByName = computed(()=>{
  return categories.value.filter((cat)=>cat.name.toLowerCase().includes(searchValue.value.toLowerCase()))
})

</script>

<template>


  <div v-if="isLoading" class="flex min-h-screen w-full items-center justify-center overflow-hidden">
    <Loading />
  </div>

  <div v-else>

    <section class="px-5 pt-6 flex flex-col gap-5 w-full">

      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-bold text-emerald-950">
          Gestión de Categorías
        </h1>

        <p class="text-sm leading-6 text-gray-500">
          Editá, organizá y administrá las categorías visibles dentro de la tienda.
        </p>
      </div>

      <div class="flex items-center gap-3">

        <div class="flex-1">
          <SearchBar v-model="searchValue"></SearchBar>
        </div>

        <RouterLink
          to="/admin-panel/categories/create"
          class="h-12 w-12 shrink-0 rounded-2xl bg-emerald-500 text-white text-xl font-semibold flex items-center justify-center active:scale-95 transition"
        >
          +
        </RouterLink>

      </div>

    </section>

    <section class="px-5 pt-6 pb-28 flex flex-col gap-3">

      <div
        v-for="category in filterByName"
        :key="category.id"
        class="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm active:scale-[0.99] transition"
      >

        <div class="flex items-start justify-between gap-4">

          <div class="flex flex-col gap-1">

            <span class="text-base font-semibold text-emerald-950">
              {{ category.name }}
            </span>
            <p class="text-sm text-gray-500"> {{ sectionName(category.section_id) }}</p>

          </div>

          <button
            @click="toEdit(category.id)"
            class="h-10 px-4 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-semibold whitespace-nowrap active:scale-95 transition"
          >
            Editar
          </button>

        </div>

      </div>

    </section>
  </div>


</template>
