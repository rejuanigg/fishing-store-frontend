<script setup>
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Modal from '@/components/UI/Modal.vue';
import { useCategoryStore } from '@/stores/category';
import { useToastStore } from '@/stores/toast';

const toast = useToastStore();
const categoryStore = useCategoryStore();

const route = useRoute();
const router = useRouter();

const catId = Number(route.params.id);

const pageLoading = ref(true);
const updateLoading = ref(false);
const deleteLoading = ref(false);

const cat = ref(null);
const name = ref('');
const selectedSection = ref(null);

const modal = ref({
  visible: false,
  variant: 'warning',
  title: '',
  text: '',
  confirmText: '',
  action: null,
  showCancel: true,
});

const sections = computed(() => categoryStore.sections);

const canSubmit = computed(() => {
  return name.value.trim() !== '' && selectedSection.value !== null && !updateLoading.value;
});

onMounted(async () => {
  try {
    await categoryStore.fetch();

    const found = categoryStore.categories.find((category) => {
      return category.id === catId;
    });

    if (!found) {
      toast.show('Error', 'No se encontró la categoría solicitada.', 'error');
      router.replace({ name: 'admin-categories' });
      return;
    }

    cat.value = found;
    name.value = found.name;
    selectedSection.value = found.section_id;
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
    toast.show('Atención', 'Completá el nombre y la sección antes de guardar.', 'warning');
    return;
  }

  modal.value = {
    visible: true,
    variant: 'warning',
    title: 'Modificar categoría',
    text: 'Los cambios serán visibles en todos los productos asociados a esta categoría.',
    confirmText: 'Guardar cambios',
    action: onSubmit,
    showCancel: true,
  };
}

async function onSubmit() {
  if (!canSubmit.value) return;

  updateLoading.value = true;

  try {
    await api.put(`/categories/${catId}`, {
      name: name.value.trim(),
      section_id: selectedSection.value,
    });

    modal.value = {
      visible: true,
      variant: 'success',
      title: 'Cambios aplicados',
      text: 'La categoría fue modificada correctamente.',
      confirmText: 'Continuar',
      action: successModal,
      showCancel: false,
    };
  } catch (error) {
    const errors = error.response?.data?.errors;
    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se pudo editar la categoría';

    toast.show('Error', message, 'error');
  } finally {
    updateLoading.value = false;
  }
}

function openDeleteModal() {
  modal.value = {
    visible: true,
    variant: 'danger',
    title: '¿Eliminar categoría?',
    text: 'Esta acción puede afectar la organización de productos asociados. Confirmá solo si estás seguro.',
    confirmText: 'Eliminar',
    action: handleDelete,
    showCancel: true,
  };
}

async function handleDelete() {
  if (deleteLoading.value) return;

  deleteLoading.value = true;

  try {
    await api.delete(`/categories/${catId}`);

    modal.value = {
      visible: true,
      variant: 'success',
      title: 'Categoría eliminada',
      text: 'La categoría fue eliminada correctamente.',
      confirmText: 'Continuar',
      action: successDeleteModal,
      showCancel: false,
    };
  } catch (error) {
    const errors = error.response?.data?.errors;
    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se pudo eliminar la categoría';

    toast.show('Error', message, 'error');
  } finally {
    deleteLoading.value = false;
  }
}

async function successModal() {
  await categoryStore.refresh();

  toast.show('Éxito', 'Categoría modificada correctamente', 'success');

  router.replace({ name: 'admin-categories' });
}

async function successDeleteModal() {
  await categoryStore.refresh();

  toast.show('Éxito', 'Categoría eliminada correctamente', 'success');

  router.replace({ name: 'admin-categories' });
}
</script>

<template>
  <section class="min-h-screen bg-slate-50">
    <div v-if="pageLoading" class="flex min-h-[100dvh] w-full items-center justify-center px-5">
      <div class="rounded-[34px] border border-slate-100 bg-white px-8 py-10 text-center shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">
          Panel admin
        </span>

        <h2 class="mt-2 text-xl font-black text-blue-950">
          Cargando categoría...
        </h2>

        <p class="mt-2 text-sm font-medium leading-6 text-slate-500">
          Estamos buscando la información guardada.
        </p>
      </div>
    </div>

    <div v-else class="mx-auto flex w-full max-w-screen-md flex-col gap-8 px-5 pb-32 pt-6">
      <section class="flex flex-col gap-2">
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">
          Panel admin
        </span>

        <h1 class="text-2xl font-black tracking-tight text-blue-950">
          Configuración de categoría
        </h1>

        <p class="text-sm font-medium leading-6 text-slate-500">
          Modificá el nombre y la sección asociada a esta categoría.
        </p>
      </section>

      <form @submit.prevent="openSuccessModal" class="rounded-[34px] border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-black text-blue-900">
              Sección
            </label>

            <select
              v-model="selectedSection"
              class="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-blue-950 outline-none transition focus:border-blue-500"
            >
              <option :value="null" disabled>
                Seleccioná una sección
              </option>

              <option v-for="section in sections" :key="section.id" :value="section.id">
                {{ section.name }}
              </option>
            </select>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-black text-blue-900">
              Nombre
            </label>

            <input
              v-model="name"
              type="text"
              placeholder="Ej: Cañas de pesca"
              class="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-blue-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500"
            >
          </div>

          <button
            type="submit"
            :disabled="!canSubmit"
            class="h-13 rounded-2xl bg-blue-600 text-sm font-black text-white shadow-[0_14px_32px_rgba(5,150,105,0.22)] transition active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100"
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
            Eliminá la categoría solo si ya no forma parte de la organización del catálogo.
          </p>
        </div>

        <button
          type="button"
          @click="openDeleteModal"
          :disabled="deleteLoading"
          class="mt-5 h-13 w-full rounded-2xl border border-red-200 bg-red-50 text-sm font-black text-red-600 transition active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100"
        >
          <span v-if="deleteLoading">Cargando...</span>
          <span v-else>Eliminar categoría</span>
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
