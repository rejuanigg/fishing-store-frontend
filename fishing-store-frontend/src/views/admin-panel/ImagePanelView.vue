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
  if(file.value === null) return null;

  const formData = new FormData()

  formData.append('image', file.value);
  formData.append('product_id', productId)

  await api.post('/images', formData)

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
  if (file.value === null) return null
  return URL.createObjectURL(file.value);
})

</script>


<template>

  <div class="min-h-screen">
    <form @submit.prevent="createFormData" class="border-b border-t border-emerald-600 p-5 flex flex-col gap-5">

      <input class=" bg-emerald-100 h-50 w-50 border-3 border-dashed border-emerald-500 rounded-xl"
        @change="file = $event.target.files[0]"
        type="file"
        multiple>
      <button class="bg-emerald-600 rounded-lg py-2 text-emerald-100 font-semibold">Agregar Producto</button>
    </form>

  <main class="mt-20 px-20 pb-30 flex-1 flex items-start justify-center">
    <div class="w-full max-w-[360px]">
      <ProductCard
    v-if="previewProduct" :product="previewProduct"
    />
    </div>
  </main>

  </div>



</template>
