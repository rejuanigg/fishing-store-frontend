<script setup>
import Modal from '@/components/UI/Modal.vue';
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCategoryStore } from '@/stores/category';
import { useToastStore } from '@/stores/toast';

const toast = useToastStore();
const categoryStore = useCategoryStore();
const router = useRouter();

const fetchLoading = ref(false);

const name = ref('');
const sectionId = ref(null);

const modal = ref({
  visible: false,
  variant: 'warning',
  title: '',
  text: '',
  confirmText: '',
  action: null,
  showCancel: true,
});

onMounted(() => {
  categoryStore.fetch();
});

const sections = computed(() => categoryStore.sections);

const canSubmit = computed(() => {
  return name.value.trim() !== '' && sectionId.value !== null && !fetchLoading.value;
});

function closeModal() {
  modal.value.visible = false;
}

async function onSubmit() {
  if (!canSubmit.value) return;

  fetchLoading.value = true;

  try {
    await api.post('/categories', {
      name: name.value.trim(),
      section_id: sectionId.value,
    });

    modal.value = {
      visible: true,
      variant: 'success',
      title: 'Categoría creada',
      text: 'La categoría fue creada correctamente. Podés visualizarla desde el panel de administrador.',
      confirmText: 'Continuar',
      action: successModal,
      showCancel: false,
    };
  } catch (error) {
    const errors = error.response?.data?.errors;
    const message = errors ? Object.values(errors).flat().join(' | ') : error.response?.data?.message ?? 'No se pudo crear la categoría';

    toast.show('Error', message, 'error');
  } finally {
    fetchLoading.value = false;
  }
}

async function successModal() {
  await categoryStore.refresh();

  toast.show('Éxito', 'Categoría creada correctamente', 'success');

  router.replace({ name: 'admin-categories' });
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <div class="mx-auto flex w-full max-w-screen-md flex-col gap-8 px-5 pb-20 pt-6">
      <section class="flex flex-col gap-2">
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">Panel admin</span>
        <h1 class="text-2xl font-black tracking-tight text-emerald-950">Crear categoría</h1>
        <p class="text-sm font-medium leading-6 text-slate-500">Elegí una sección y cargá el nombre de la nueva categoría.</p>
      </section>

      <form @submit.prevent="onSubmit" class="rounded-[34px] border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-black text-emerald-900">Nombre</label>
            <input v-model="name" type="text" placeholder="Ej: Reels, Cañas, Señuelos..." class="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-emerald-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500">
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-black text-emerald-900">Sección</label>

            <select v-model="sectionId" class="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-emerald-950 outline-none transition focus:border-emerald-500">
              <option :value="null" disabled>Seleccioná una sección</option>
              <option v-for="section in sections" :key="section.id" :value="section.id">{{ section.name }}</option>
            </select>
          </div>

          <button type="submit" :disabled="!canSubmit" class="h-13 rounded-2xl bg-emerald-600 text-sm font-black text-white shadow-[0_14px_32px_rgba(5,150,105,0.22)] transition active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100">
            <span v-if="fetchLoading">Cargando...</span>
            <span v-else>Guardar categoría</span>
          </button>
        </div>
      </form>
    </div>

    <Modal v-if="modal.visible" :variant="modal.variant" :title="modal.title" :text="modal.text" :confirm-text="modal.confirmText" :show-cancel="modal.showCancel" @confirm-action="modal.action" @close-modal="closeModal" />
  </div>
</template>
