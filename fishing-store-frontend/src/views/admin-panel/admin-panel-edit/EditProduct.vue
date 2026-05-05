<script setup>
import { useCategory } from '@/composables/useCategory';
import api from '@/services/api';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import Modal from '@/components/Modal.vue';

const route = useRoute();
const router = useRouter();

const product = ref(null);
const productId = Number(route.params.id)

const { categories, sections } = useCategory();

const selectedSection = ref(null);

const category = ref(null);
const name = ref('');
const description = ref('');
const price = ref(0);

const isModalVisible = ref(false);

const openModal = () => isModalVisible.value = true
const closeModal = () => isModalVisible.value = false

const filterCatBySec = computed(()=>{
  return categories.value
  .filter(({section_id})=>section_id === selectedSection.value)
})

onMounted(async()=>{
  const response = await api.get(`/products/${productId}`)
  product.value = response.data.data
})

watch(product, (newValue) =>{
  name.value = newValue.name
  description.value = newValue.description
  price.value = newValue.price

  const productCat = product.value.categories[0];

  selectedSection.value = productCat.section_id

  category.value = productCat

})

const preview = computed(()=>{
  return {
    name:name.value,
    description:description.value,
    price:price.value,
    categories: category.value ? [category.value] : []
  }
})

async function onSubmit(){
  const response = await api.put(`/products/${productId}`,{
    name:name.value,
    description:description.value,
    price:price.value,
    categories:[category.value.id]
  })

  return router.push('/')
}

//Delete

async function handeDelete(){
  const response = await api.delete(`/products/${productId}`)
  return router.push('/')
}

</script>

<template>
  <div v-if="product">
    <form @submit.prevent="onSubmit" class="border-b border-t border-emerald-600 p-5 flex flex-col gap-5">

      <label class="text-emerald-900 font-semibold">Nombre</label>
      <input v-model="name" placeholder="Introduce el nombre de seccion" class="p-2 min-h-[44px] bg-emerald-50 border border-emerald-600 rounded-lg" type="text">

      <label class="text-emerald-900 font-semibold">Precio</label>
      <input v-model="price" placeholder="Introduce un" class="p-2 min-h-[44px] bg-emerald-50 border border-emerald-600 rounded-lg" type="text">

      <label class="text-emerald-900 font-semibold">Descripción</label>
      <textarea v-model="description" placeholder="Introduce el nombre de seccion" class="p-2 min-h-[44px] bg-emerald-50 border border-emerald-600 rounded-lg" type="text"></textarea>

      <label class="text-emerald-900 font-semibold">Seccion</label>
        <select v-model="selectedSection" class="p-2 min-h-[44px] bg-emerald-50 border border-emerald-600 rounded-lg" >
          <option  v-for="section in sections" :key="section.id" :value="section.id" >{{ section.name }}</option>
        </select>

      <label class="text-emerald-900 font-semibold">Categoria</label>
        <select v-model="category" class="p-2 min-h-[44px] bg-emerald-50 border border-emerald-600 rounded-lg" >
          <option v-for="category in filterCatBySec" :key="category.id" :value="category">{{ category.name }}</option>
        </select>

      <button class="bg-emerald-600 rounded-lg py-2 text-white font-semibold">Listo</button>
      <button type="button" @click="openModal" class=" w-full border-2 bg-amber-600 text-white font-semibold py-2 rounded-lg text-sm active:scale-95">
      Eliminar
      </button>
      <RouterLink to="/admin-panel/products" class="text-center border-2 border-emerald-600 rounded-lg py-2 text-emerald-900 font-semibold">Ir a mis productos</RouterLink>
    </form>

    <main class="mt-20 px-20 pb-30 flex-1 flex items-start justify-center">
      <div class="w-full max-w-[360px]">
        <ProductCard :product="preview" />
      </div>
    </main>
  </div>

  <Modal
  v-if="isModalVisible"
  text="Estas por borrar un producto, ¿Desea continuar?"
  type="actionCaution"
  action="Eliminar"
  @close-modal="closeModal"
  @action="handeDelete"
  />

</template>
