<script setup>
import Modal from '@/components/UI/Modal.vue';
import api from '@/services/api';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCategoryStore } from '@/stores/category';
import { useToastStore } from '@/stores/toast';
import { useFormatPrice } from '@/composables/useFormatPrice';

const toast = useToastStore();
const router = useRouter();
const categoryStore = useCategoryStore();

const fetchLoading = ref(false);

const selectedSection = ref(null);
const selectedCategory = ref(null);

const name = ref('');
const description = ref('');
const price = ref('');
const actualStock = ref(1);

const newCategories = ref([]);

const modal = ref({
  visible: false,
  variant: 'warning',
  title: '',
  text: '',
  confirmText: '',
  action: null,
  showCancel: true,
});

const { formatPrice } = useFormatPrice();

onMounted(() => {
  categoryStore.fetch();
});

const sections = computed(() => categoryStore.sections);
const categories = computed(() => categoryStore.categories);

const filterCatBySec = computed(() => {
  if (!selectedSection.value) return [];

  return categories.value.filter((category) => {
    return category.section_id === selectedSection.value;
  });
});

const canAddCategory = computed(() => {
  return selectedCategory.value !== null;
});

const canSubmit = computed(() => {
  return (
    name.value.trim() !== '' &&
    description.value.trim() !== '' &&
    Number(price.value) > 0 &&
    newCategories.value.length > 0 &&
    Number(actualStock.value) > 0 &&
    !fetchLoading.value
  );
});

watch(selectedSection, () => {
  selectedCategory.value = null;
});

function closeModal() {
  modal.value.visible = false;
}

function handlePrice(event) {
  const value = event.target.value.replace(/\D/g, '').slice(0, 7);
  price.value = value;
}

function addCategory() {
  if (!selectedCategory.value) return;

  const alreadyExists = newCategories.value.some((category) => {
    return category.id === selectedCategory.value.id;
  });

  if (alreadyExists) {
    toast.show('Atención', 'Esta categoría ya fue agregada.', 'warning');
    return;
  }

  newCategories.value.push(selectedCategory.value);
  selectedCategory.value = null;
}

function removeCategory(categoryId) {
  newCategories.value = newCategories.value.filter((category) => {
    return category.id !== categoryId;
  });
}

function upStock() {
  actualStock.value++;
}

function downStock() {
  if (actualStock.value <= 1) return;

  actualStock.value--;
}

function normalizeStock() {
  if (!actualStock.value || actualStock.value < 1) {
    actualStock.value = 1;
  }
}

async function onSubmit() {
  if (!canSubmit.value) {
    toast.show('Atención', 'Completá todos los campos antes de guardar.', 'warning');
    return;
  }

  fetchLoading.value = true;

  try {
    const response = await api.post('/products', {
      name: name.value.trim(),
      description: description.value.trim(),
      price: Number(price.value),
      categories: newCategories.value.map((category) => category.id),
    });

    await api.post('/stocks', {
      product_id: response.data.data.id,
      quantity: Number(actualStock.value),
    });

    const productId = response.data.data.id;

    modal.value = {
      visible: true,
      variant: 'success',
      title: 'Producto creado',
      text: 'El producto fue creado correctamente. Ahora podés cargar sus imágenes.',
      confirmText: 'Cargar imágenes',
      action: () => successModal(productId),
      showCancel: false,
    };
  } catch (error) {
    const errors = error.response?.data?.errors;
    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se puede crear el producto, revisá bien antes de enviar.';

    toast.show('Error', message, 'error');
  } finally {
    fetchLoading.value = false;
  }
}

function successModal(id) {
  toast.show('Éxito', 'Producto creado correctamente', 'success');

  router.replace({
    name: 'admin-product-image',
    params: { id },
  });
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <div class="mx-auto flex w-full max-w-screen-md flex-col gap-8 px-5 pb-32 pt-6">
      <section class="flex flex-col gap-2">
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">
          Panel admin
        </span>

        <h1 class="text-2xl font-black tracking-tight text-emerald-950">
          Crear producto
        </h1>

        <p class="text-sm font-medium leading-6 text-slate-500">
          Creá un producto para mostrarlo en la tienda. Después vas a poder cargar sus imágenes.
        </p>
      </section>

      <form @submit.prevent="onSubmit" class="rounded-[34px] border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-black text-emerald-900">
              Nombre
            </label>

            <input v-model="name" type="text" placeholder="Ej: Reel Shimano FX" class="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-emerald-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500">
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-black text-emerald-900">
              Precio
            </label>

            <input :value="price" @input="handlePrice" type="text" inputmode="numeric" placeholder="Ej: 120000" maxlength="7" class="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-emerald-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500">

            <span class="text-sm font-black text-emerald-700">
              {{ formatPrice(Number(price) || 0) }}
            </span>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-black text-emerald-900">
              Descripción
            </label>

            <textarea v-model="description" placeholder="Describe el producto..." class="min-h-[140px] rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-emerald-950 outline-none resize-none transition placeholder:text-slate-400 focus:border-emerald-500"></textarea>
          </div>

          <div class="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-black text-emerald-900">
                Sección
              </label>

              <select v-model="selectedSection" class="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-emerald-950 outline-none transition focus:border-emerald-500">
                <option :value="null" disabled>
                  Seleccioná una sección
                </option>

                <option v-for="section in sections" :key="section.id" :value="section.id">
                  {{ section.name }}
                </option>
              </select>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-black text-emerald-900">
                Categoría
              </label>

              <select v-model="selectedCategory" :disabled="!selectedSection" class="h-13 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-emerald-950 outline-none transition disabled:bg-slate-100 disabled:text-slate-400 focus:border-emerald-500">
                <option :value="null">
                  Seleccioná una categoría
                </option>

                <option v-for="category in filterCatBySec" :key="category.id" :value="category">
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <button type="button" @click="addCategory" :disabled="!canAddCategory" class="h-11 rounded-2xl border border-emerald-100 bg-emerald-50 text-sm font-black text-emerald-700 transition active:scale-[0.98] disabled:border-slate-100 disabled:bg-slate-100 disabled:text-slate-400 disabled:active:scale-100">
              Agregar categoría
            </button>

            <div v-if="newCategories.length" class="flex flex-wrap gap-2">
              <span v-for="category in newCategories" :key="category.id" class="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-800">
                <span class="max-w-[180px] truncate">
                  {{ category.name }}
                </span>

                <button type="button" @click="removeCategory(category.id)" class="text-red-500 font-black">
                  ×
                </button>
              </span>
            </div>

            <p v-else class="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500">
              Agregá al menos una categoría para clasificar el producto.
            </p>
          </div>

          <section class="rounded-[28px] border border-slate-100 bg-slate-50 p-4">
            <div>
              <h2 class="text-lg font-black text-emerald-950">
                Inventario
              </h2>

              <p class="mt-1 text-sm font-medium leading-6 text-slate-500">
                Seleccioná el stock disponible para este producto.
              </p>
            </div>

            <div class="mt-4 flex items-center justify-center gap-4">
              <button type="button" @click="downStock" class="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-xl font-black text-emerald-700 transition active:scale-[0.96]">
                -
              </button>

              <input v-model.number="actualStock" @blur="normalizeStock" min="1" type="number" class="h-11 w-24 rounded-2xl border border-slate-200 bg-white text-center text-lg font-black text-emerald-950 outline-none focus:border-emerald-500">

              <button type="button" @click="upStock" class="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-xl font-black text-emerald-700 transition active:scale-[0.96]">
                +
              </button>
            </div>
          </section>

          <button type="submit" :disabled="!canSubmit" class="h-13 rounded-2xl bg-emerald-600 text-sm font-black text-white shadow-[0_14px_32px_rgba(5,150,105,0.22)] transition active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100">
            <span v-if="fetchLoading">Cargando...</span>
            <span v-else>Guardar producto</span>
          </button>
        </div>
      </form>
    </div>

    <Modal v-if="modal.visible" :variant="modal.variant" :title="modal.title" :text="modal.text" :confirm-text="modal.confirmText" :show-cancel="modal.showCancel" @confirm-action="modal.action" @close-modal="closeModal" />
  </div>
</template>
