<script setup>
import SearchBar from '@/components/SearchBar.vue';
import { useCategory } from '@/composables/useCategory';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const {sections} = useCategory();

const toEdit = (id) => {
  return router.push({name:'section-edit', params:{ id:id }})
}

</script>

<template>

  <section class="px-5 pt-6 flex flex-col gap-5 w-full">

    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-bold text-emerald-950">
        Gestión de Secciones
      </h1>

      <p class="text-sm leading-6 text-gray-500">
        Editá y administrá las secciones.
      </p>
    </div>

    <div class="flex items-center gap-3">

      <div class="flex-1">
        <SearchBar v-model="search"></SearchBar>
      </div>

      <RouterLink
        to="/admin-panel/sections/create"
        class="h-12 w-12 shrink-0 rounded-2xl bg-emerald-500 text-white text-xl font-semibold flex items-center justify-center active:scale-95 transition"
      >
        +
      </RouterLink>

    </div>

  </section>

  <section class="px-5 pt-6 pb-28 flex flex-col gap-3">

    <div
      v-for="section in sections"
      :key="section.id"
      class="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm active:scale-[0.99] transition"
    >

      <div class="flex items-start justify-between gap-4">

        <div class="flex flex-col gap-1">
          <span class="text-base font-semibold text-emerald-950">
            {{ section.name }}
          </span>
        </div>

        <button
          @click="toEdit(section.id)"
          class="h-10 px-4 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-semibold whitespace-nowrap active:scale-95 transition"
        >
          Editar
        </button>

      </div>

    </div>

  </section>

</template>

