<script setup>
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';

const router = useRouter();
const route = useRoute()
const productId = route.params.id
const products = ref([])
const file = ref(null)

const createFormData = async() => {
  if(!file.value || file.value.length === 0) return null;

  for (const image of file.value) {

    const formData = new FormData()
    formData.append('product_id', productId)
    formData.append('image', image);
    console.log(image)
    await api.post('/images', formData)
  }

  return router.push('/admin-panel')
}

onMounted(async()=>{
  const response = await api.get('/products')
  products.value = response.data.data
})

const previewProduct = computed(()=>{
  const product = products.value.find(p => p.id == productId)
  if (!product) return null
  return { ...product, images: [{ image: previewImage.value }] }
})

const previewImage = computed(()=>{
  if(!file.value || file.value.length === 0) return null
  return URL.createObjectURL(file.value[0]);
})

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
          <span class="mt-3 text-sm font-semibold text-emerald-900">Subir imágenes</span>
          <p class="mt-1 text-xs leading-5 text-gray-500">PNG, JPG o WEBP</p>

          <input class="hidden" @change="file = $event.target.files" type="file" multiple>
        </label>

        <button class="h-13 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-[0.98] transition">
          Guardar imágenes
        </button>

      </form>

    </section>

    <main class="px-5 pt-8 flex justify-center">

      <div class="w-full max-w-[360px]">
        <ProductCard v-if="previewProduct" :product="previewProduct" />
      </div>

    </main>

  </div>

</template>
