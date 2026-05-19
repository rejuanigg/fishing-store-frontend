<script setup>
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Modal from '@/components/UI/Modal.vue';
import { useToastStore } from '@/stores/toast';
import { useCategoryStore } from '@/stores/category';

const toast = useToastStore();
const categoryStore = useCategoryStore();

const route = useRoute();
const router = useRouter();

const secId = Number(route.params.id);

const sec = ref(null);
const name = ref('');

const pageLoading = ref(true);
const updateLoading = ref(false);
const deleteLoading = ref(false);

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
  return name.value.trim() !== '' && !updateLoading.value;
});

onMounted(async () => {
  try {
    await categoryStore.fetch();

    const found = categoryStore.sections.find((section) => {
      return section.id === secId;
    });

    if (!found) {
      toast.show('Error', 'No se encontró la sección solicitada.', 'error');
      router.replace({ name: 'admin-sections' });
      return;
    }

    sec.value = found;
    name.value = found.name;
  } finally {
    pageLoading.value = false;
  }
});

function closeModal() {
  if (updateLoading.value || deleteLoading.value) return;

  modal.value.visible = false;
}

function openSuccessModal() {
  if (!canSubmit.value) {
    toast.show('Atención', 'Ingresá un nombre para la sección.', 'warning');
    return;
  }

  modal.value = {
    visible: true,
    variant: 'warning',
    title: 'Modificar sección',
    text: 'Los cambios serán visibles en las categorías y productos asociados a esta sección.',
    confirmText: 'Guardar cambios',
    action: onSubmit,
    showCancel: true,
  };
}

async function onSubmit() {
  if (!canSubmit.value) return;

  updateLoading.value = true;

  try {
    await api.put(`/sections/${secId}`, {
      name: name.value.trim(),
    });

    modal.value = {
      visible: true,
      variant: 'success',
      title: 'Cambios aplicados',
      text: 'La sección fue modificada correctamente.',
      confirmText: 'Continuar',
      action: successModal,
      showCancel: false,
    };
  } catch (error) {
    const errors = error.response?.data?.errors;

    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se pudo editar la sección';

    toast.show('Error', message, 'error');
  } finally {
    updateLoading.value = false;
  }
}

function openDeleteModal() {
  modal.value = {
    visible: true,
    variant: 'danger',
    title: '¿Eliminar sección?',
    text: 'Esta acción puede afectar la organización de categorías y productos asociados. Confirmá solo si estás seguro.',
    confirmText: 'Eliminar',
    action: handleDelete,
    showCancel: true,
  };
}

async function handleDelete() {
  if (deleteLoading.value) return;

  deleteLoading.value = true;

  try {
    await api.delete(`/sections/${secId}`);

    modal.value = {
      visible: true,
      variant: 'success',
      title: 'Sección eliminada',
      text: 'La sección fue eliminada correctamente.',
      confirmText: 'Continuar',
      action: successDeleteModal,
      showCancel: false,
    };
  } catch (error) {
    const errors = error.response?.data?.errors;

    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se pudo eliminar la sección';

    toast.show('Error', message, 'error');
  } finally {
    deleteLoading.value = false;
  }
}

async function refreshCategoryStore() {
  if (typeof categoryStore.refresh === 'function') {
    await categoryStore.refresh();
    return;
  }

  await categoryStore.fetch();
}

async function successModal() {
  await refreshCategoryStore();

  toast.show('Éxito', 'Sección modificada correctamente', 'success');

  router.replace({ name: 'admin-sections' });
}

async function successDeleteModal() {
  await refreshCategoryStore();

  toast.show('Éxito', 'Sección eliminada correctamente', 'success');

  router.replace({ name: 'admin-sections' });
}
</script>

<template>
  <section class="min-h-screen bg-slate-50">
    <div v-if="pageLoading" class="flex min-h-[100dvh] w-full items-center justify-center px-5">
      <div class="rounded-[34px] border border-slate-100 bg-white px-8 py-10 text-center shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">
          Panel admin
        </span>

        <h2 class="mt-2 text-xl font-black text-emerald-950">
          Cargando sección...
        </h2>

        <p class="mt-2 text-sm font-medium leading-6 text-slate-500">
          Estamos buscando la información guardada.
        </p>
      </div>
    </div>

    <div v-else class="mx-auto flex w-full max-w-screen-md flex-col gap-8 px-5 pb-32 pt-6">
      <section class="flex flex-col gap-2">
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">
          Panel admin
        </span>

        <h1 class="text-2xl font-black tracking-tight text-emerald-950">
          Editar sección
        </h1>

        <p class="text-sm font-medium leading-6 text-slate-500">
          Modificá el nombre de la sección visible en el catálogo.
        </p>
      </section>

      <form @submit.prevent="openSuccessModal" class="rounded-[34px] border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-black text-emerald-900">
              Nombre
            </label>

            <input
              v-model="name"
              type="text"
              placeholder="Ej: Accesorios"
              class="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-emerald-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
            >
          </div>

          <button
            type="submit"
            :disabled="!canSubmit"
            class="h-13 rounded-2xl bg-emerald-600 text-sm font-black text-white shadow-[0_14px_32px_rgba(5,150,105,0.22)] transition active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100"
          >
            <span v-if="updateLoading">Cargando...</span>
            <span v-else>Guardar cambios</span>
          </button>
        </div>
      </form>

      <section class="rounded-[34px] border border-red-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
        <div>
          <h2 class="text-lg font-black text-red-600">
            Zona peligrosa
          </h2>

          <p class="mt-1 text-sm font-medium leading-6 text-slate-500">
            Eliminá la sección solo si ya no forma parte de la estructura del catálogo.
          </p>
        </div>

        <button
          type="button"
          @click="openDeleteModal"
          :disabled="deleteLoading"
          class="mt-5 h-13 w-full rounded-2xl border border-red-200 bg-red-50 text-sm font-black text-red-600 transition active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100"
        >
          <span v-if="deleteLoading">Cargando...</span>
          <span v-else>Eliminar sección</span>
        </button>
      </section>
    </div>

    <Modal
      v-if="modal.visible"
      :variant="modal.variant"
      :title="modal.title"
      :text="modal.text"
      :confirm-text="updateLoading || deleteLoading ? 'Cargando...' : modal.confirmText"
      :show-cancel="modal.showCancel"
      @confirm-action="modal.action"
      @close-modal="closeModal"
    />
  </section>
</template>
