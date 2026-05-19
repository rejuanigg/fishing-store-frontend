<script setup>
import SearchBar from '@/components/SearchBar.vue';
import Loading from '@/components/UI/Loading.vue';
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToastStore } from '@/stores/toast';

const router = useRouter();
const toast = useToastStore();

const sections = ref([]);
const searchValue = ref('');
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await api.get('/sections');
    sections.value = response.data.data;
  } catch (error) {
    const message = error.response?.data?.message ?? 'No se pudieron cargar las secciones';
    toast.show('Error', message, 'error');
  } finally {
    isLoading.value = false;
  }
});

const filteredSections = computed(() => {
  const search = searchValue.value.trim().toLowerCase();

  if (!search) return sections.value;

  return sections.value.filter((section) => {
    return section.name.toLowerCase().includes(search);
  });
});

function toEdit(id) {
  router.push({
    name: 'admin-section-edit',
    params: { id },
  });
}
</script>

<template>
  <div v-if="isLoading" class="min-h-[100dvh] bg-slate-50">
    <Loading />
  </div>

  <div v-else class="min-h-[100dvh] bg-slate-50">
    <section class="mx-auto flex w-full max-w-5xl flex-col gap-5 px-5 pt-6">
      <div class="flex flex-col gap-2">
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">
          Panel admin
        </span>

        <h1 class="text-2xl font-black tracking-tight text-emerald-950">
          Gestión de secciones
        </h1>

        <p class="text-sm font-medium leading-6 text-slate-500">
          Editá y administrá las secciones principales del catálogo.
        </p>
      </div>

      <div class="rounded-[30px] border border-slate-100 bg-white p-3 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
        <div class="flex items-center gap-3">
          <div class="min-w-0 flex-1">
            <SearchBar v-model="searchValue" />
          </div>

          <RouterLink
            to="/admin-panel/sections/create"
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-black text-white shadow-[0_12px_28px_rgba(5,150,105,0.20)] transition active:scale-[0.95]"
          >
            +
          </RouterLink>
        </div>
      </div>
    </section>

    <main class="mx-auto w-full max-w-5xl px-5 pb-28 pt-6">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 class="text-lg font-black text-emerald-950">
            Secciones registradas
          </h2>

          <p class="mt-1 text-xs font-semibold text-slate-500">
            {{ filteredSections.length }} secciones encontradas
          </p>
        </div>

        <span class="shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-black text-emerald-700">
          Catálogo
        </span>
      </div>

      <section v-if="filteredSections.length" class="grid grid-cols-1 gap-3 min-[640px]:grid-cols-2">
        <article
          v-for="section in filteredSections"
          :key="section.id"
          class="rounded-[28px] border border-slate-100 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition active:scale-[0.99]"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0 flex-1">
              <span class="line-clamp-2 text-base font-black leading-5 text-emerald-950">
                {{ section.name }}
              </span>

              <p class="mt-2 text-sm font-semibold text-slate-500">
                Sección principal
              </p>
            </div>

            <button
              type="button"
              @click="toEdit(section.id)"
              class="flex h-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 px-4 text-sm font-black text-emerald-700 transition active:scale-[0.95]"
            >
              Editar
            </button>
          </div>
        </article>
      </section>

      <section
        v-else
        class="rounded-[34px] border border-dashed border-emerald-200 bg-white px-6 py-12 text-center shadow-[0_14px_35px_rgba(15,23,42,0.05)]"
      >
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-3xl">
          🗂️
        </div>

        <h3 class="mt-5 text-lg font-black text-emerald-950">
          No encontramos secciones
        </h3>

        <p class="mt-2 text-sm font-medium leading-6 text-slate-500">
          Probá cambiando la búsqueda o creá una nueva sección.
        </p>

        <RouterLink
          to="/admin-panel/sections/create"
          class="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-emerald-600 px-6 text-sm font-black text-white shadow-[0_12px_28px_rgba(5,150,105,0.20)] transition active:scale-[0.98]"
        >
          Crear sección
        </RouterLink>
      </section>
    </main>
  </div>
</template>
