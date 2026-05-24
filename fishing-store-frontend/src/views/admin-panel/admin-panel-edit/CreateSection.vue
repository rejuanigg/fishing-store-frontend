<script setup>
import Modal from '@/components/UI/Modal.vue';
import api from '@/services/api';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToastStore } from '@/stores/toast';
import { useCategoryStore } from '@/stores/category';

const toast = useToastStore();
const router = useRouter();
const categoryStore = useCategoryStore();

const name = ref('');
const fetchLoading = ref(false);

const modal = ref({
  visible: false,
  variant: 'warning',
  title: '',
  text: '',
  confirmText: '',
  action: null,
  showCancel: true,
});

const canSubmit = computed(() => {
  return name.value.trim() !== '' && !fetchLoading.value;
});

function closeModal() {
  modal.value.visible = false;
}

async function onSubmit() {
  if (!canSubmit.value) {
    toast.show('Atención', 'Ingresá un nombre para la sección.', 'warning');
    return;
  }

  fetchLoading.value = true;

  try {
    await api.post('/sections', {
      name: name.value.trim(),
    });

    modal.value = {
      visible: true,
      variant: 'success',
      title: 'Sección creada',
      text: 'La sección fue creada correctamente. Podés visualizarla desde el panel de administrador.',
      confirmText: 'Continuar',
      action: successModal,
      showCancel: false,
    };
  } catch (error) {
    const errors = error.response?.data?.errors;

    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se pudo crear la sección';

    toast.show('Error', message, 'error');
  } finally {
    fetchLoading.value = false;
  }
}

async function successModal() {
  await categoryStore.refresh();

  toast.show('Éxito', 'Sección creada correctamente', 'success');

  router.replace({ name: 'admin-sections' });
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <div class="mx-auto flex w-full max-w-screen-md flex-col gap-8 px-5 pb-32 pt-6">
      <section class="flex flex-col gap-2">
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">
          Panel admin
        </span>

        <h1 class="text-2xl font-black tracking-tight text-blue-950">
          Crear sección
        </h1>

        <p class="text-sm font-medium leading-6 text-slate-500">
          Creá una sección para organizar las categorías y productos de la tienda.
        </p>
      </section>

      <form @submit.prevent="onSubmit" class="rounded-[34px] border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-black text-blue-900">
              Nombre
            </label>

            <input
              v-model="name"
              type="text"
              placeholder="Ej: Accesorios"
              class="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-blue-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500"
            >
          </div>

          <button
            type="submit"
            :disabled="!canSubmit"
            class="h-13 rounded-2xl bg-blue-600 text-sm font-black text-white shadow-[0_14px_32px_rgba(5,150,105,0.22)] transition active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100"
          >
            <span v-if="fetchLoading">Cargando...</span>
            <span v-else>Guardar sección</span>
          </button>
        </div>
      </form>
    </div>

    <Modal
      v-if="modal.visible"
      :variant="modal.variant"
      :title="modal.title"
      :text="modal.text"
      :confirm-text="modal.confirmText"
      :show-cancel="modal.showCancel"
      @confirm-action="modal.action"
      @close-modal="closeModal"
    />
  </div>
</template>
