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
  <div class="bg-red-50 w-3/5 h-full flex justify-center items-center flex-col">

    <form class="flex flex-col h-full w-full" @submit.prevent="createFormData">
      <div class=" bg-red-100 h-3/5 flex justify-center items-center">
        <input class="bg-red-300 h-50 w-50 border-3 border-dashed rounded-xl"
        @change="file = $event.target.files[0]"
        type="file"
        multiple>
      </div>

      <div class="flex justify-center items-center h-1/5">
        <button class="h-1/3 w-2/4 bg-red-600">OK</button>
      </div>

      <div class="1/5 flex flex-col justify-center px-20">
        <span class="text-xl">Agrega una o mas imagenes.</span>
        <p>Ten en cuenta que la primera imagen es la que se verá en el producto.</p>
      </div>

    </form>
  </div>

  <div class="bg-red-100 w-2/5 h-svh flex justify-center items-center flex-col gap-10">
    <h2 class="text-xl font-bold">Vista Previa</h2>
    <ProductCard
    v-if="previewProduct" :product="previewProduct"
    />
  </div>
</template>
