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

const openModal = () => isModalVisible.value = true;
const closeModal = () => isModalVisible.value = false;

const filterCatBySec = computed(()=>{
  return categories.value
  .filter(({section_id})=>section_id === selectedSection.value)
});

onMounted(async()=>{
  const response = await api.get(`/products/${productId}`)
  product.value = response.data.data
});

watch(product, (actualValue) =>{
  name.value = actualValue.name
  description.value = actualValue.description
  price.value = actualValue.price

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

async function handleDelete(){
  const response = await api.delete(`/products/${productId}`)
  return router.push('/')
}

</script>

<template>

<div v-if="product" class="min-h-screen flex flex-col">
  <div class="px-5 pt-6 pb-32 flex flex-col gap-8">
    <section class="flex flex-col gap-2">
      <h1 class="text-2xl font-bold text-emerald-950">
        Editar producto
      </h1>

      <p class="text-sm leading-6 text-gray-500">
        Modificá la información visible
        del producto dentro de la tienda.
      </p>
    </section>

    <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-emerald-900">Nombre</label>

        <input v-model="name" type="text" placeholder="Ej: Reel Shimano FX" class="h-13 px-4 rounded-2xl border border-gray-200 bg-white text-sm outline-none focus:border-emerald-500">
      </div>


      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-emerald-900">
          Precio
        </label>

        <input v-model="price" type="text" placeholder="$ 120000"
        class="h-13 px-4 rounded-2xl border border-gray-200 bg-white text-sm outline-none focus:border-emerald-500">
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-emerald-900">
          Descripción
        </label>

        <textarea v-model="description" placeholder="Describe el producto..."
        class="min-h-[140px] p-4 rounded-2xl border border-gray-200 bg-white text-sm outline-none resize-none focus:border-emerald-500">
        </textarea>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-emerald-900">
          Sección
        </label>

        <select v-model="selectedSection" class="h-13 px-4 rounded-2xl border border-gray-200 bg-white text-sm outline-none focus:border-emerald-500">
          <option v-for="section in sections" :key="section.id" :value="section.id">{{ section.name }}</option>
        </select>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-emerald-900">
          Categoría
        </label>

        <select v-model="category" class="h-13 px-4 rounded-2xl border border-gray-200 bg-white text-sm outline-none focus:border-emerald-500" >
          <option v-for="category in filterCatBySec" :value="category" >
            {{ category.name }}
          </option>
        </select>
      </div>

      <button class="h-13 mt-2 rounded-2xl bg-emerald-500 text-white text-sm font-semibold active:scale-[0.98] transition">
        Guardar cambios
      </button>

    </form>

    <section class="flex flex-col gap-4">
      <div>
        <h2 class="text-lg font-bold text-emerald-950">Vista previa</h2>
        <p class="text-sm text-gray-500 mt-1"> Así visualizarán el producto los clientes.</p>
      </div>

      <div class="flex justify-center">
        <div class="w-full max-w-[320px]">
          <ProductCard :product="preview" />
        </div>
      </div>
    </section>

    <RouterLink to="/admin-panel/products" class="h-13 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-semibold flex items-center justify-center">
      Ver todos los productos
    </RouterLink>

    <button type="button" @click="openModal" class="h-13 rounded-2xl border border-red-200 bg-red-50 text-red-600 text-sm font-semibold">
      Eliminar producto
    </button>

  </div>

  <Modal
    v-if="isModalVisible"
    text="Estas por borrar un producto, ¿Desea continuar?"
    type="actionCaution"
    action="Eliminar"
    @close-modal="closeModal"
    @action="handleDelete"
  />

</div>

</template>
