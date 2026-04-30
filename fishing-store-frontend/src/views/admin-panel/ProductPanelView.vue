<script setup>
import { useCategory } from '@/composables/useCategory';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import { computed, ref } from 'vue';
import ProductCard from '@/components/ProductCard.vue';

const router = useRouter();

const { categories, sections } = useCategory();

const selectedSection = ref(null);

const category = ref(null);
const name = ref('');
const description = ref('');
const price = ref(0);

const filterCatBySec = computed(()=>{
  return categories.value
  .filter(({section_id})=>section_id === selectedSection.value)
})

async function onSubmit(){
  const response = await api.post('/products',{
    name:name.value,
    description:description.value,
    price:price.value,
    categories:[category.value.id]
  })

  return router.push(`/admin-panel/products/${response.data.data.id}/image`)

}

const preview = computed(()=>{
  return {
    name:name.value,
    description:description.value,
    price:price.value,
    categories: category.value ? [category.value] : []
  }
})

</script>


<template>

  <div class="bg-red-50 w-3/5 h-svh flex justify-center items-center">
      <form class="bg-red-300 w-4/5 h-9/10 px-20 flex flex-col" @submit.prevent="onSubmit">

        <div class="flex flex-col h-1/5 justify-center">
          <div class="w-full flex justify-center ">
            <h2 class="text-xl font-bold">Añade un Producto</h2>
          </div>
        </div>

        <div class="flex flex-col h-2/5">

          <div class="w-full h-1/4">
            <span class="font-semibold">Seccion</span>
            <select class="w-full bg-red-50 h-3/5" v-model="selectedSection">
              <option  v-for="section in sections" :key="section.id" :value="section.id" >{{ section.name }}</option>
            </select>
          </div>

          <div class="w-full h-1/4">
            <span class="font-semibold">Categoria</span>
            <select class="w-full bg-red-50 h-3/5" v-model="category">
              <option v-for="category in filterCatBySec" :key="category.id" :value="category">{{ category.name }}</option>
            </select>
          </div>

          <div class="h-1/4 flex flex-col w-full">
            <label for="" class="font-semibold">Nombre</label>
            <input v-model="name" type="text" name="sa" id="s" class="bg-white h-full">
          </div>

          <div class="h-1/4 flex flex-col">
            <label for="" class="font-semibold" >Precio</label>
            <input v-model="price" type="text" class="bg-white h-full">
          </div>

        </div>

        <div class="h-1/5 flex flex-col">
            <label for="" class="font-semibold" >Descripcion</label>
            <textarea v-model="description" type="" class="bg-white h-full p-2"></textarea>
        </div>

        <div class="h-1/5 w-full flex items-center justify-center gap-4">
          <button class="h-2/4 font-semibold bg-red-50 p-2 rounded-lg flex items-center">
            Agregar Producto
          </button>
        </div>
<!-- v-if="previewProduct" :product="previewProduct" -->
      </form>
  </div>
  <div class="bg-red-100 w-2/5 h-svh flex justify-center items-center flex-col gap-10">
    <h2 class="text-xl font-bold">Vista Previa</h2>
    <ProductCard
    :product="preview"
    />
  </div>


</template>
