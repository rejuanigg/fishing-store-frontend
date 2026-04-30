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
  <div class="bg-red-50 w-3/5 h-full flex justify-center items-center">
    <div>
      <form @submit.prevent="createFormData">
        <div>
          <span>+</span>
        </div>
        <input
        @change="file = $event.target.files[0]"
        type="file"
        multiple
        >
        <button>OK</button>
      </form>
      <div>
        <span>Agrega una o mas imagenes.</span>
        <p>Ten en cuenta que la primera imagen es la que se verá en el producto.</p>
      </div>
    </div>
  </div>
  <div class="bg-red-100 w-2/5 h-full">
    <div class="bg-red-100 w-2/5 h-full">
      <ProductCard v-if="previewProduct" :product="previewProduct"/>
    </div>
  </div>
</template>
