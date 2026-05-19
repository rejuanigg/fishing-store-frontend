<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useCategoryStore } from '@/stores/category';

const emit = defineEmits(['sendCat', 'viewAll', 'toggleClose']);

const categoryStore = useCategoryStore();

const selectedSection = ref(null);
const selectedCategory = ref(null);
const sectionSearch = ref('');
const categorySearch = ref('');

onMounted(() => {
  categoryStore.fetch();
});

const sections = computed(() => categoryStore.sections);
const categories = computed(() => categoryStore.categories);

const filteredSections = computed(() => {
  const search = sectionSearch.value.trim().toLowerCase();

  if (!search) return sections.value;

  return sections.value.filter((section) => section.name.toLowerCase().includes(search));
});

const categoriesBySelectedSection = computed(() => {
  if (!selectedSection.value) return [];

  return categories.value.filter((category) => category.section_id === selectedSection.value);
});

const filteredCategories = computed(() => {
  const search = categorySearch.value.trim().toLowerCase();

  if (!search) return categoriesBySelectedSection.value;

  return categoriesBySelectedSection.value.filter((category) => category.name.toLowerCase().includes(search));
});

watch(selectedSection, () => {
  selectedCategory.value = null;
  categorySearch.value = '';
});

function selectSection(sectionId) {
  selectedSection.value = sectionId;
}

function selectCategory(categoryId) {
  selectedCategory.value = categoryId;
}

function applyFilter() {
  if (!selectedCategory.value) return;

  emit('sendCat', selectedCategory.value);
}

function clearFilters() {
  selectedSection.value = null;
  selectedCategory.value = null;
  sectionSearch.value = '';
  categorySearch.value = '';

  emit('viewAll');
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <section class="flex flex-col gap-3">
      <div>
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">Sección</span>
        <p class="mt-1 text-sm font-medium leading-6 text-slate-500">Buscá el tipo de producto para filtrar más rápido.</p>
      </div>

      <input v-model="sectionSearch" type="text" placeholder="Buscar sección..." class="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-emerald-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white">

      <div v-if="filteredSections.length" class="grid max-h-[220px] grid-cols-1 gap-2 overflow-y-auto pr-1 min-[420px]:grid-cols-2">
        <button v-for="section in filteredSections" :key="section.id" type="button" @click="selectSection(section.id)" class="flex min-h-12 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition active:scale-[0.97]" :class="selectedSection === section.id ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-[0_10px_24px_rgba(5,150,105,0.10)]' : 'border-slate-100 bg-white text-slate-600 shadow-[0_8px_20px_rgba(15,23,42,0.04)]'">
          <span class="line-clamp-2 text-sm font-black">{{ section.name }}</span>
          <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-black" :class="selectedSection === section.id ? 'border-emerald-500 bg-emerald-600 text-white' : 'border-slate-200 bg-slate-50 text-transparent'">✓</span>
        </button>
      </div>

      <div v-else class="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center">
        <p class="text-sm font-bold text-slate-500">No encontramos secciones con ese nombre.</p>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <div>
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">Categoría</span>
        <p class="mt-1 text-sm font-medium leading-6 text-slate-500">Elegí una categoría específica dentro de la sección.</p>
      </div>

      <div v-if="!selectedSection" class="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center">
        <p class="text-sm font-bold text-slate-500">Primero seleccioná una sección.</p>
      </div>

      <template v-else>
        <input v-model="categorySearch" type="text" placeholder="Buscar categoría..." class="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-emerald-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white">

        <div v-if="filteredCategories.length" class="grid max-h-[240px] grid-cols-1 gap-2 overflow-y-auto pr-1 min-[420px]:grid-cols-2">
          <button v-for="category in filteredCategories" :key="category.id" type="button" @click="selectCategory(category.id)" class="flex min-h-12 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition active:scale-[0.97]" :class="selectedCategory === category.id ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-[0_10px_24px_rgba(5,150,105,0.10)]' : 'border-slate-100 bg-white text-slate-600 shadow-[0_8px_20px_rgba(15,23,42,0.04)]'">
            <span class="line-clamp-2 text-sm font-black">{{ category.name }}</span>
            <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-black" :class="selectedCategory === category.id ? 'border-emerald-500 bg-emerald-600 text-white' : 'border-slate-200 bg-slate-50 text-transparent'">✓</span>
          </button>
        </div>

        <div v-else class="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center">
          <p class="text-sm font-bold text-slate-500">No encontramos categorías para esa búsqueda.</p>
        </div>
      </template>
    </section>

    <section class="sticky bottom-0 -mx-5 border-t border-slate-100 bg-white/95 px-5 pb-[calc(env(safe-area-inset-bottom)+4px)] pt-4 backdrop-blur-xl">
      <div class="flex items-center gap-3">
        <button type="button" @click="clearFilters" class="flex h-12 flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition active:scale-[0.97]">Ver todo</button>

        <button type="button" @click="applyFilter" :disabled="!selectedCategory" class="flex h-12 flex-1 items-center justify-center rounded-2xl bg-emerald-600 px-4 text-sm font-black text-white shadow-[0_12px_28px_rgba(5,150,105,0.20)] transition active:scale-[0.97] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100">Aplicar filtro</button>
      </div>
    </section>
  </div>
</template>
