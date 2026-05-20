<script setup>
import api from '@/services/api';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import Modal from '@/components/UI/Modal.vue';
import { useCategoryStore } from '@/stores/category';
import { useToastStore } from '@/stores/toast';
import { useFormatPrice } from '@/composables/useFormatPrice';

const toast = useToastStore();
const categoryStore = useCategoryStore();
const route = useRoute();
const router = useRouter();

const productId = Number(route.params.id);

const product = ref(null);
const idStock = ref(null);

const selectedSection = ref(null);
const selectedCategory = ref(null);
const newCategories = ref([]);

const name = ref('');
const description = ref('');
const price = ref('');
const actualStock = ref(0);

const tab = ref('product');

const submitLoading = ref(false);
const deleteLoading = ref(false);
const uploadLoading = ref(false);
const replacingImageId = ref(null);
const deletingImageId = ref(null);

const file = ref([]);
const updateFile = ref(null);
const onDelete = ref(null);

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

onMounted(async () => {
  await categoryStore.fetch();
  await fetchProduct();
});

const sections = computed(() => categoryStore.sections);
const categories = computed(() => categoryStore.categories);

const filterCatBySec = computed(() => {
  if (!selectedSection.value) return [];

  return categories.value.filter((categoryItem) => {
    return categoryItem.section_id === selectedSection.value;
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
    Number(actualStock.value) >= 0 &&
    !submitLoading.value
  );
});

const preview = computed(() => {
  return {
    ...product.value,
    name: name.value,
    description: description.value,
    price: price.value,
    categories: newCategories.value,
    stocks: [
      {
        id: idStock.value,
        quantity: actualStock.value,
      },
    ],
    images: product.value?.images ?? [],
  };
});

watch(product, (actualValue) => {
  if (!actualValue) return;

  name.value = actualValue.name ?? '';
  description.value = actualValue.description ?? '';
  price.value = String(Math.trunc(Number(actualValue.price ?? 0)));
  actualStock.value = actualValue.stocks?.[0]?.quantity ?? 0;
  newCategories.value = actualValue.categories ? [...actualValue.categories] : [];

  const firstCategory = newCategories.value[0] ?? null;

  if (firstCategory) {
    selectedSection.value = firstCategory.section_id;
  } else {
    selectedSection.value = null;
  }

  selectedCategory.value = null;
});

watch(selectedSection, () => {
  selectedCategory.value = null;
});

async function fetchProduct() {
  try {
    const response = await api.get(`/products/${productId}`);

    product.value = response.data.data;

    if (!product.value.images) {
      product.value.images = [];
    }

    if (!product.value.stocks?.[0]) {
      const resStocks = await api.post('/stocks', {
        product_id: product.value.id,
        quantity: actualStock.value,
      });

      idStock.value = resStocks.data.data.id;
    } else {
      idStock.value = product.value.stocks[0].id;
    }
  } catch (error) {
    const message = error.response?.data?.message ?? 'No se pudo cargar el producto';

    toast.show('Error', message, 'error');
    router.replace({ name: 'admin-product' });
  }
}

function handlePrice(event) {
  const value = event.target.value.replace(/\D/g, '').slice(0, 7);
  price.value = value;
}

function addCategory() {
  if (!selectedCategory.value) return;

  const alreadyExists = newCategories.value.some((categoryItem) => {
    return categoryItem.id === selectedCategory.value.id;
  });

  if (alreadyExists) {
    toast.show('Atención', 'Esta categoría ya fue agregada.', 'warning');
    return;
  }

  newCategories.value.push(selectedCategory.value);
  selectedCategory.value = null;
}

function removeCategory(categoryId) {
  newCategories.value = newCategories.value.filter((categoryItem) => {
    return categoryItem.id !== categoryId;
  });
}

function upStock() {
  actualStock.value++;
}

function downStock() {
  if (actualStock.value <= 0) return;

  actualStock.value--;
}

function normalizeStock() {
  if (actualStock.value === '' || actualStock.value === null || Number(actualStock.value) < 0) {
    actualStock.value = 0;
  }
}

function closeModal() {
  if (submitLoading.value || deleteLoading.value) return;

  modal.value.visible = false;
}

function openSuccessModal() {
  if (!canSubmit.value) {
    toast.show('Atención', 'Completá todos los campos antes de guardar.', 'warning');
    return;
  }

  modal.value = {
    visible: true,
    variant: 'warning',
    title: 'Está por modificar un producto',
    text: 'Los cambios serán visibles para todos los clientes de la tienda.',
    confirmText: 'Guardar cambios',
    action: onSubmit,
    showCancel: true,
  };
}

async function onSubmit() {
  if (!canSubmit.value || submitLoading.value) return;

  submitLoading.value = true;

  try {
    const response = await api.put(`/products/${productId}`, {
      name: name.value.trim(),
      description: description.value.trim(),
      price: Number(price.value),
      categories: newCategories.value.map((categoryItem) => categoryItem.id),
    });

    if (idStock.value) {
      await api.put(`/stocks/${idStock.value}`, {
        product_id: response.data.data.id,
        quantity: Number(actualStock.value),
      });
    } else {
      const stockResponse = await api.post('/stocks', {
        product_id: response.data.data.id,
        quantity: Number(actualStock.value),
      });

      idStock.value = stockResponse.data.data.id;
    }

    modal.value = {
      visible: true,
      variant: 'success',
      title: 'Cambios aplicados',
      text: 'Las modificaciones se aplicaron correctamente.',
      confirmText: 'Continuar',
      action: successModal,
      showCancel: false,
    };
  } catch (error) {
    const errors = error.response?.data?.errors;
    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se pudo editar el producto';

    toast.show('Error', message, 'error');
  } finally {
    submitLoading.value = false;
  }
}

function openDeleteModal() {
  modal.value = {
    visible: true,
    variant: 'danger',
    title: '¿Archivar producto?',
    text: 'El producto dejará de mostrarse en la tienda, pero seguirá disponible en el historial de órdenes.',
    confirmText: 'Archivar',
    action: handleDelete,
    showCancel: true,
  };
}

async function handleDelete() {
  if (deleteLoading.value) return;

  deleteLoading.value = true;

  try {
    await api.delete(`/products/${productId}`);

    modal.value = {
      visible: true,
      variant: 'success',
      title: 'Producto archivado',
      text: 'El producto fue archivado correctamente.',
      confirmText: 'Continuar',
      action: successDeleteModal,
      showCancel: false,
    };
  } catch (error) {
    const errors = error.response?.data?.errors;
    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se pudo archivar el producto';

    toast.show('Error', message, 'error');
  } finally {
    deleteLoading.value = false;
  }
}

async function createFormData() {
  if (!file.value || file.value.length === 0) return;

  uploadLoading.value = true;

  try {
    if (!product.value.images) {
      product.value.images = [];
    }

    for (const image of file.value) {
      const formData = new FormData();

      formData.append('product_id', productId);
      formData.append('image', image);

      const response = await api.post('/images', formData);

      product.value.images.push(response.data.data);
    }

    file.value = [];

    toast.show('Éxito', 'Imagen cargada correctamente', 'success');
  } catch (error) {
    const errors = error.response?.data?.errors;
    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se pudo cargar las imágenes';

    toast.show('Error', message, 'error');
  } finally {
    uploadLoading.value = false;
  }
}

function handleUpload(event) {
  file.value = [...event.target.files];
  createFormData();
  event.target.value = '';
}

async function uploadFormData(id, index) {
  if (!updateFile.value || updateFile.value.length === 0) return;

  replacingImageId.value = id;

  try {
    const image = updateFile.value[0];
    const formData = new FormData();

    formData.append('product_id', productId);
    formData.append('image', image);
    formData.append('_method', 'PUT');

    const response = await api.post(`/images/${id}`, formData);

    product.value.images[index] = response.data.data;
    updateFile.value = null;

    toast.show('Éxito', 'Imagen reemplazada correctamente', 'success');
  } catch (error) {
    const errors = error.response?.data?.errors;
    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se pudo reemplazar la imagen';

    toast.show('Error', message, 'error');
  } finally {
    replacingImageId.value = null;
  }
}

function handleUpdate(event, id, index) {
  updateFile.value = [...event.target.files];
  uploadFormData(id, index);
  event.target.value = '';
}

async function handleImgDelete(id, index) {
  if (deletingImageId.value) return;

  deletingImageId.value = id;

  try {
    await api.delete(`/images/${id}`);

    product.value.images.splice(index, 1);
    onDelete.value = null;

    toast.show('Éxito', 'Imagen eliminada correctamente', 'success');
  } catch (error) {
    const errors = error.response?.data?.errors;
    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se pudo eliminar la imagen';

    toast.show('Error', message, 'error');
  } finally {
    deletingImageId.value = null;
  }
}

async function refreshCategoryStore() {
  if (typeof categoryStore.refresh === 'function') {
    await categoryStore.refresh();
    return;
  }

  await categoryStore.fetch();
}

async function handleModalConfirm() {
  if (typeof modal.value.action !== 'function') {
    modal.value.visible = false;
    return;
  }

  await modal.value.action();
}

async function successModal() {
  modal.value.visible = false;

  await refreshCategoryStore();

  toast.show('Éxito', 'Producto modificado correctamente', 'success');

  await router.replace('/admin-panel/products');
}

async function successDeleteModal() {
  modal.value.visible = false;

  await refreshCategoryStore();

  toast.show('Éxito', 'Producto archivado correctamente', 'success');

  await router.replace('/admin-panel/products');
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <div v-if="!product" class="flex min-h-[100dvh] w-full items-center justify-center px-5">
      <div class="rounded-[34px] border border-slate-100 bg-white px-8 py-10 text-center shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">
          Panel admin
        </span>

        <h2 class="mt-2 text-xl font-black text-emerald-950">
          Cargando producto...
        </h2>

        <p class="mt-2 text-sm font-medium leading-6 text-slate-500">
          Estamos buscando la información del producto.
        </p>
      </div>
    </div>

    <div v-else class="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 pb-32 pt-6">
      <div class="rounded-[28px] border border-slate-100 bg-white p-2 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
        <div class="grid grid-cols-2 gap-2">
          <button type="button" @click="tab = 'product'" class="h-11 rounded-2xl text-sm font-black transition active:scale-[0.98]" :class="tab === 'product' ? 'bg-emerald-600 text-white shadow-[0_10px_24px_rgba(5,150,105,0.18)]' : 'bg-slate-50 text-slate-500'">
            Producto
          </button>

          <button type="button" @click="tab = 'images'" class="h-11 rounded-2xl text-sm font-black transition active:scale-[0.98]" :class="tab === 'images' ? 'bg-emerald-600 text-white shadow-[0_10px_24px_rgba(5,150,105,0.18)]' : 'bg-slate-50 text-slate-500'">
            Imágenes
          </button>
        </div>
      </div>

      <div v-if="tab === 'product'" class="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">
              Panel admin
            </span>

            <h1 class="text-2xl font-black tracking-tight text-emerald-950">
              Editar producto
            </h1>

            <p class="text-sm font-medium leading-6 text-slate-500">
              Modificá la información visible del producto dentro de la tienda.
            </p>
          </div>

          <form @submit.prevent="openSuccessModal" class="rounded-[34px] border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
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

                    <option v-for="categoryOption in filterCatBySec" :key="categoryOption.id" :value="categoryOption">
                      {{ categoryOption.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="flex flex-col gap-3">
                <button type="button" @click="addCategory" :disabled="!canAddCategory" class="h-11 rounded-2xl border border-emerald-100 bg-emerald-50 text-sm font-black text-emerald-700 transition active:scale-[0.98] disabled:border-slate-100 disabled:bg-slate-100 disabled:text-slate-400 disabled:active:scale-100">
                  Agregar categoría
                </button>

                <div v-if="newCategories.length" class="flex flex-wrap gap-2">
                  <span v-for="categoryItem in newCategories" :key="categoryItem.id" class="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-800">
                    <span class="max-w-[180px] truncate">
                      {{ categoryItem.name }}
                    </span>

                    <button type="button" @click="removeCategory(categoryItem.id)" class="text-red-500 font-black">
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
                    Gestioná el stock disponible.
                  </p>
                </div>

                <div class="mt-4 flex items-center justify-center gap-4">
                  <button type="button" @click="downStock" class="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-xl font-black text-emerald-700 transition active:scale-[0.96]">
                    -
                  </button>

                  <input v-model.number="actualStock" @blur="normalizeStock" min="0" type="number" class="h-11 w-24 rounded-2xl border border-slate-200 bg-white text-center text-lg font-black text-emerald-950 outline-none focus:border-emerald-500">

                  <button type="button" @click="upStock" class="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-xl font-black text-emerald-700 transition active:scale-[0.96]">
                    +
                  </button>
                </div>
              </section>

              <button type="submit" :disabled="!canSubmit" class="h-13 rounded-2xl bg-emerald-600 text-sm font-black text-white shadow-[0_14px_32px_rgba(5,150,105,0.22)] transition active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100">
                <span v-if="submitLoading">Cargando...</span>
                <span v-else>Guardar cambios</span>
              </button>
            </div>
          </form>

          <RouterLink to="/admin-panel/products" class="flex h-13 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-sm font-black text-emerald-700 transition active:scale-[0.98]">
            Ver todos los productos
          </RouterLink>

          <button type="button" @click="openDeleteModal" :disabled="deleteLoading" class="h-13 rounded-2xl border border-red-200 bg-red-50 text-sm font-black text-red-600 transition active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100">
            <span v-if="deleteLoading">Cargando...</span>
            <span v-else>Archivar producto</span>
          </button>
        </section>

        <aside class="lg:sticky lg:top-6 lg:self-start">
          <section class="rounded-[34px] border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
            <div>
              <h2 class="text-lg font-black text-emerald-950">
                Vista previa
              </h2>

              <p class="mt-1 text-sm font-medium leading-6 text-slate-500">
                Así visualizarán el producto los clientes.
              </p>
            </div>

            <div class="mt-5 flex justify-center">
              <div class="w-full max-w-[320px]">
                <ProductCard :product="preview" />
              </div>
            </div>
          </section>
        </aside>
      </div>

      <div v-else class="flex flex-col gap-6">
        <section class="flex flex-col gap-2">
          <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">
            Panel admin
          </span>

          <h1 class="text-2xl font-black tracking-tight text-emerald-950">
            Imágenes del producto
          </h1>

          <p class="text-sm font-medium leading-6 text-slate-500">
            Administrá, reemplazá y eliminá las imágenes visibles en la tienda.
          </p>
        </section>

        <section class="grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 lg:grid-cols-3">
          <div v-for="(img, index) in product.images" :key="img.id" class="flex flex-col gap-3 rounded-[28px] border border-slate-100 bg-white p-3 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
            <div class="relative overflow-hidden rounded-[22px] bg-slate-50">
              <img :src="img.image" class="h-48 w-full object-contain p-2" :alt="`Imagen ${index + 1}`">

              <span v-if="index === 0" class="absolute left-3 top-3 flex h-7 items-center rounded-full bg-emerald-600 px-3 text-[10px] font-black uppercase tracking-wide text-white shadow-[0_10px_22px_rgba(5,150,105,0.20)]">
                Principal
              </span>
            </div>

            <div class="flex flex-col gap-3">
              <span class="text-sm font-black text-emerald-950">
                Imagen {{ index + 1 }}
              </span>

              <div class="flex w-full items-center gap-2">
                <label v-if="onDelete !== index" class="flex h-10 flex-1 cursor-pointer items-center justify-center rounded-2xl bg-emerald-50 text-xs font-black text-emerald-700 transition active:scale-[0.95]" :class="replacingImageId === img.id ? 'pointer-events-none opacity-60' : ''">
                  <span v-if="replacingImageId === img.id">Cargando...</span>
                  <span v-else>Reemplazar</span>

                  <input type="file" @change="handleUpdate($event, img.id, index)" class="hidden" :disabled="replacingImageId === img.id">
                </label>

                <div v-if="onDelete === index" class="flex flex-1 items-center gap-2">
                  <button type="button" @click="onDelete = null" :disabled="deletingImageId === img.id" class="h-10 flex-1 rounded-2xl bg-slate-100 text-xs font-black text-slate-600 transition active:scale-[0.95] disabled:opacity-60">
                    Cancelar
                  </button>

                  <button type="button" @click="handleImgDelete(img.id, index)" :disabled="deletingImageId === img.id" class="h-10 flex-1 rounded-2xl bg-red-500 text-xs font-black text-white transition active:scale-[0.95] disabled:opacity-60 disabled:active:scale-100">
                    <span v-if="deletingImageId === img.id">Cargando...</span>
                    <span v-else>Eliminar</span>
                  </button>
                </div>

                <button v-if="onDelete !== index" type="button" @click="onDelete = index" class="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-500 transition active:scale-[0.95]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673A2.25 2.25 0 0 1 15.916 21H8.084a2.25 2.25 0 0 1-2.244-1.327L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0A48.11 48.11 0 0 1 8.25 5.5m3.75 0V4.75A2.25 2.25 0 0 1 14.25 2.5h.75A2.25 2.25 0 0 1 17.25 4.75V5.5m-5.25 0h5.25" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <label v-if="!uploadLoading" class="flex min-h-[260px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[28px] border-2 border-dashed border-emerald-200 bg-emerald-50 p-5 text-center transition active:scale-[0.98]">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl font-black text-emerald-700 shadow-sm">
              +
            </div>

            <div class="flex flex-col items-center gap-1">
              <span class="text-sm font-black text-emerald-900">
                Agregar imagen
              </span>

              <span class="text-xs font-semibold text-emerald-600">
                JPG, PNG o WEBP
              </span>
            </div>

            <input @change="handleUpload($event)" type="file" class="hidden" multiple>
          </label>

          <div v-else class="flex min-h-[260px] flex-col items-center justify-center gap-4 rounded-[28px] border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-center">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-400 shadow-sm">
              ...
            </div>

            <span class="text-sm font-black text-slate-500">
              Cargando...
            </span>
          </div>
        </section>
      </div>
    </div>

    <Modal v-if="modal.visible" :variant="modal.variant" :title="modal.title" :text="modal.text" :confirm-text="submitLoading || deleteLoading ? 'Cargando...' : modal.confirmText" :show-cancel="modal.showCancel" @confirm-action="handleModalConfirm" @close-modal="closeModal" />
  </div>
</template>
