<script setup>
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';

const router = useRouter();
const route = useRoute();

const productId = route.params.id;
const products = ref([]);

const files = ref([]);
const previews = ref([]);

const onDelete = ref(null);

const handleUpload = (event) => {
  const selectedFiles = Array.from(event.target.files);

  selectedFiles.forEach((img) => {
    files.value.push(img);

    previews.value.push({
      id: crypto.randomUUID(),
      file: img,
      image: URL.createObjectURL(img)

    }
  )});
  event.target.value = '';
};

const createFormData = async () => {
  if (files.value.length === 0) return;
  for (const image of files.value) {
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('image', image);
    await api.post('/images', formData);
  }
  router.push('/admin-panel/dashboard');
};

onMounted(async () => {
  const response = await api.get('/products');
  products.value = response.data.data;

});

const previewProduct = computed(() => {
  const product = products.value.find(p => p.id == productId);
  if (!product) return null;
  return {
    ...product, images: previews.value
  };

});

const removeImage = (index) => {
  URL.revokeObjectURL(previews.value[index].image);
  previews.value.splice(index, 1);
  files.value.splice(index, 1);
  onDelete.value = null;

};

const moveImageLeft = (index) => {

  if (index === 0) return;

  [previews.value[index], previews.value[index - 1]] = [previews.value[index - 1], previews.value[index]];

  [files.value[index], files.value[index - 1]] = [files.value[index - 1], files.value[index]];

};

const moveImageRight = (index) => {

  if (index === previews.value.length - 1) return;

  [previews.value[index], previews.value[index + 1]] = [previews.value[index + 1], previews.value[index]];

  [files.value[index], files.value[index + 1]] = [files.value[index + 1], files.value[index]];

};
</script>


<template>

  <div class="min-h-screen pb-28">

    <section class="px-5 pt-6 flex flex-col gap-5">

      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-bold text-emerald-950">Imágenes del Producto</h1>
        <p class="text-sm leading-6 text-gray-500">Subí y organizá las imágenes visibles dentro de la tienda.</p>
      </div>

      <form @submit.prevent="createFormData" class="flex flex-col gap-5">

        <label class="h-52 rounded-3xl border-2 border-dashed border-emerald-300 bg-emerald-50 flex flex-col items-center justify-center text-center px-6 cursor-pointer active:scale-[0.99] transition">

          <span class="text-4xl text-emerald-500">+</span>

          <span class="mt-3 text-sm font-semibold text-emerald-900">
            Subir imágenes
          </span>

          <p class="mt-1 text-xs leading-5 text-gray-500">
            PNG, JPG o WEBP
          </p>

          <input @change="handleUpload" type="file" multiple class="hidden">

        </label>

        <button class="h-13 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-[0.98] transition">
          Guardar imágenes
        </button>

      </form>

    </section>

    <section v-if="previews.length" class="px-5 pt-8 flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold text-emerald-950">
          Vista previa de Imágenes
        </h2>

        <span class="text-sm text-gray-400">
          {{ previews.length }} imágenes
        </span>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div v-for="(img, index) in previews" :key="img.id" class="bg-white border border-gray-100 rounded-[28px] p-3 flex flex-col gap-4 shadow-sm transition">
          <div class="relative">

            <img :src="img.image" class="h-44 w-full object-cover rounded-[20px]" />

            <span v-if="index === 0" class="absolute top-3 left-3 h-7 px-3 rounded-full bg-emerald-500 text-white text-[10px] font-semibold tracking-wide flex items-center">
              Principal
            </span>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex flex-col">
              <span class="text-sm font-semibold text-emerald-950">
                Imagen {{ index + 1 }}
              </span>

              <span class="text-xs text-gray-400">
                {{ index === 0 ? 'Portada del producto' : 'Imagen secundaria' }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <button @click="moveImageLeft(index)" :disabled="index === 0" class="h-10 w-10 rounded-2xl border border-gray-200 flex items-center justify-center text-emerald-900 font-bold disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition">
                ←
              </button>

              <button @click="moveImageRight(index)" :disabled="index === previews.length - 1" class="h-10 w-10 rounded-2xl border border-gray-200 flex items-center justify-center text-emerald-900 font-bold disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition">
                →
              </button>

              <div class="ml-auto flex items-center gap-2">
                <div v-if="onDelete === index" class="flex items-center gap-2">
                  <button @click="onDelete = null" class="h-10 px-4 rounded-2xl bg-gray-100 text-gray-600 text-xs font-semibold active:scale-95 transition">
                    Cancelar
                  </button>

                  <button @click="removeImage(index)" class="h-10 px-4 rounded-2xl bg-red-500 text-white text-xs font-semibold active:scale-95 transition">
                    Confirmar
                  </button>
                </div>

                <button v-else @click="onDelete = index" class="h-10 w-10 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center active:scale-95 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673A2.25 2.25 0 0 1 15.916 21H8.084a2.25 2.25 0 0 1-2.244-1.327L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0A48.11 48.11 0 0 1 8.25 5.5m3.75 0V4.75A2.25 2.25 0 0 1 14.25 2.5h.75A2.25 2.25 0 0 1 17.25 4.75V5.5m-5.25 0h5.25" />
                  </svg>
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <main class="px-5 pt-8 flex flex-col gap-4">
      <div>
        <h2 class="text-lg font-bold text-emerald-950">Vista previa del Producto</h2>
        <p class="text-sm text-gray-500 mt-1">Así visualizarán el producto los clientes.</p>
      </div>

      <div class="w-full max-w-[360px]">
        <ProductCard v-if="previewProduct" :product="previewProduct" />
      </div>
    </main>
  </div>

</template>
