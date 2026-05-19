<script setup>
import api from '@/services/api';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import { useToastStore } from '@/stores/toast';

const router = useRouter();
const route = useRoute();
const toast = useToastStore();

const productId = Number(route.params.id);

const product = ref(null);
const files = ref([]);
const previews = ref([]);

const onDelete = ref(null);
const fetchLoading = ref(false);
const pageLoading = ref(true);

onMounted(async () => {
  try {
    const response = await api.get(`/products/${productId}`);
    product.value = response.data.data;
  } catch (error) {
    const message = error.response?.data?.message ?? 'No se pudo cargar el producto';
    toast.show('Error', message, 'error');
    router.replace('/admin-panel/products');
  } finally {
    pageLoading.value = false;
  }
});

onBeforeUnmount(() => {
  previews.value.forEach((preview) => {
    URL.revokeObjectURL(preview.image);
  });
});

const hasImagesToSave = computed(() => {
  return files.value.length > 0;
});

const previewProduct = computed(() => {
  if (!product.value) return null;

  return {
    ...product.value,
    images: previews.value.length ? previews.value : product.value.images ?? [],
  };
});

function handleUpload(event) {
  const selectedFiles = Array.from(event.target.files ?? []);

  selectedFiles.forEach((image) => {
    if (!image.type.startsWith('image/')) {
      toast.show('Atención', 'Solo podés subir archivos de imagen.', 'warning');
      return;
    }

    files.value.push(image);

    previews.value.push({
      id: crypto.randomUUID(),
      file: image,
      image: URL.createObjectURL(image),
    });
  });

  event.target.value = '';
}

function removeImage(index) {
  URL.revokeObjectURL(previews.value[index].image);

  previews.value.splice(index, 1);
  files.value.splice(index, 1);
  onDelete.value = null;
}

function moveImageLeft(index) {
  if (index === 0) return;

  [previews.value[index], previews.value[index - 1]] = [previews.value[index - 1], previews.value[index]];
  [files.value[index], files.value[index - 1]] = [files.value[index - 1], files.value[index]];
}

function moveImageRight(index) {
  if (index === previews.value.length - 1) return;

  [previews.value[index], previews.value[index + 1]] = [previews.value[index + 1], previews.value[index]];
  [files.value[index], files.value[index + 1]] = [files.value[index + 1], files.value[index]];
}

async function createFormData() {
  if (!hasImagesToSave.value) {
    toast.show('Atención', 'Seleccioná al menos una imagen para guardar.', 'warning');
    return;
  }

  if (fetchLoading.value) return;

  fetchLoading.value = true;

  try {
    const totalImages = files.value.length;

    for (const image of files.value) {
      const formData = new FormData();

      formData.append('product_id', productId);
      formData.append('image', image);

      await api.post('/images', formData);
    }

    toast.show(
      'Éxito',
      totalImages === 1 ? 'Imagen guardada correctamente.' : 'Imágenes guardadas correctamente.',
      'success'
    );

    await router.replace('/admin-panel/products');
  } catch (error) {
    const errors = error.response?.data?.errors;

    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se pudieron guardar las imágenes';

    toast.show('Error', message, 'error');
  } finally {
    fetchLoading.value = false;
  }
}
</script>

<template>
  <div class="min-h-[100dvh] bg-slate-50 pb-32">
    <div v-if="pageLoading" class="flex min-h-[100dvh] w-full items-center justify-center px-5">
      <div class="rounded-[34px] border border-slate-100 bg-white px-8 py-10 text-center shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">
          Panel admin
        </span>

        <h2 class="mt-2 text-xl font-black text-emerald-950">
          Cargando producto...
        </h2>

        <p class="mt-2 text-sm font-medium leading-6 text-slate-500">
          Estamos preparando la carga de imágenes.
        </p>
      </div>
    </div>

    <template v-else>
      <section class="mx-auto w-full max-w-6xl px-5 pt-6">
        <div class="rounded-[34px] border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
          <div>
            <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">
              Producto
            </span>

            <h1 class="mt-2 text-2xl font-black tracking-tight text-emerald-950">
              Imágenes del producto
            </h1>

            <p class="mt-2 text-sm font-medium leading-6 text-slate-500">
              Subí, revisá y ordená las imágenes que verá el cliente en la tienda.
            </p>
          </div>

          <form @submit.prevent="createFormData" class="mt-5 flex flex-col gap-4">
            <label class="group relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[30px] border-2 border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 px-6 text-center transition active:scale-[0.99]" :class="fetchLoading ? 'pointer-events-none opacity-70' : ''">
              <div class="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-100 blur-3xl"></div>
              <div class="absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-cyan-100 blur-3xl"></div>

              <div class="relative flex h-16 w-16 items-center justify-center rounded-[24px] bg-white text-3xl font-black text-emerald-600 shadow-[0_14px_35px_rgba(15,23,42,0.08)] transition group-active:scale-95">
                +
              </div>

              <span class="relative mt-4 text-sm font-black text-emerald-950">
                Subir imágenes
              </span>

              <p class="relative mt-1 max-w-[260px] text-xs font-medium leading-5 text-slate-500">
                Seleccioná una o varias imágenes en formato PNG, JPG o WEBP.
              </p>

              <input @change="handleUpload" type="file" multiple accept="image/png,image/jpeg,image/webp" class="hidden" :disabled="fetchLoading">
            </label>

            <button type="submit" class="flex h-14 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-[0_14px_32px_rgba(5,150,105,0.22)] transition active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100" :disabled="fetchLoading || !hasImagesToSave">
              <span v-if="fetchLoading">Cargando...</span>
              <span v-else>Guardar imágenes</span>
            </button>
          </form>
        </div>
      </section>

      <section v-if="previews.length" class="mx-auto w-full max-w-6xl px-5 pt-6">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">
              Galería
            </span>

            <h2 class="mt-2 text-xl font-black text-emerald-950">
              Vista previa
            </h2>

            <p class="mt-1 text-sm font-medium leading-6 text-slate-500">
              La primera imagen será la portada del producto.
            </p>
          </div>

          <span class="shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-black text-emerald-700">
            {{ previews.length }} imágenes
          </span>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(img, index) in previews" :key="img.id" class="overflow-hidden rounded-[32px] border border-slate-100 bg-white p-3 shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
            <div class="relative overflow-hidden rounded-[24px] bg-slate-50">
              <img :src="img.image" class="h-52 w-full object-contain p-2" :alt="`Imagen ${index + 1}`">

              <div class="absolute left-3 top-3 flex items-center gap-2">
                <span v-if="index === 0" class="rounded-full bg-emerald-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white shadow-[0_10px_22px_rgba(5,150,105,0.22)]">
                  Principal
                </span>

                <span v-else class="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-slate-500 shadow-[0_10px_22px_rgba(15,23,42,0.10)] backdrop-blur-md">
                  Secundaria
                </span>
              </div>

              <button v-if="onDelete !== index" @click="onDelete = index" type="button" class="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/95 text-red-500 shadow-[0_10px_22px_rgba(15,23,42,0.12)] backdrop-blur-md transition active:scale-95" :disabled="fetchLoading">
                ×
              </button>
            </div>

            <div class="mt-4">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <h3 class="text-sm font-black text-emerald-950">
                    Imagen {{ index + 1 }}
                  </h3>

                  <p class="mt-1 text-xs font-medium text-slate-500">
                    {{ index === 0 ? 'Portada del producto' : 'Imagen secundaria' }}
                  </p>
                </div>

                <span class="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-black text-slate-400">
                  #{{ index + 1 }}
                </span>
              </div>

              <div v-if="onDelete === index" class="mt-4 rounded-[24px] border border-red-100 bg-red-50 p-3">
                <p class="text-xs font-bold leading-5 text-red-600">
                  ¿Querés quitar esta imagen de la selección?
                </p>

                <div class="mt-3 flex gap-2">
                  <button @click="onDelete = null" type="button" class="flex h-10 flex-1 items-center justify-center rounded-2xl bg-white text-xs font-black text-slate-600 transition active:scale-95" :disabled="fetchLoading">
                    Cancelar
                  </button>

                  <button @click="removeImage(index)" type="button" class="flex h-10 flex-1 items-center justify-center rounded-2xl bg-red-500 text-xs font-black text-white transition active:scale-95" :disabled="fetchLoading">
                    Quitar
                  </button>
                </div>
              </div>

              <div v-else class="mt-4 grid grid-cols-2 gap-2">
                <button @click="moveImageLeft(index)" type="button" :disabled="index === 0 || fetchLoading" class="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-600 transition active:scale-95 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-300 disabled:active:scale-100">
                  <span class="text-base leading-none">←</span>
                  <span>Mover antes</span>
                </button>

                <button @click="moveImageRight(index)" type="button" :disabled="index === previews.length - 1 || fetchLoading" class="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-600 transition active:scale-95 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-300 disabled:active:scale-100">
                  <span>Mover después</span>
                  <span class="text-base leading-none">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main class="mx-auto w-full max-w-6xl px-5 pt-8">
        <div class="mb-4">
          <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">
            Cliente
          </span>

          <h2 class="mt-2 text-xl font-black text-emerald-950">
            Vista previa del producto
          </h2>

          <p class="mt-1 text-sm font-medium leading-6 text-slate-500">
            Así se visualizará el producto dentro del catálogo.
          </p>
        </div>

        <div class="w-full max-w-[360px]">
          <ProductCard v-if="previewProduct" :product="previewProduct" />
        </div>
      </main>
    </template>
  </div>
</template>
