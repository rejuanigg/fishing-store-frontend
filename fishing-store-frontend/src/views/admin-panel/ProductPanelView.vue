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

  <div class="bg-red-50 w-3/5 h-full flex justify-center items-center">
      <form class="bg-red-300 w-4/5 h-120 p-10" @submit.prevent="onSubmit">
        <div class="flex">

          <div>
            <div>

              <div>
                <span>Seccion</span>
                <select v-model="selectedSection">
                  <option  v-for="section in sections" :key="section.id" :value="section.id" >{{ section.name }}</option>
                </select>
              </div>

              <div>
                <span>Categoria</span>
                <select v-model="category">
                  <option v-for="category in filterCatBySec" :key="category.id" :value="category">{{ category.name }}</option>
                </select>
              </div>

            </div>
          </div>
        </div>


        <div class="h-1/6 flex flex-col">
          <label for="" class="font-semibold">Nombre</label>
          <input v-model="name" type="text" name="sa" id="s" class="bg-white h-full">
        </div>

        <div class="h-2/5 max-h-max flex flex-col">
          <label for="" class="font-semibold" >Descripcion</label>
          <textarea v-model="description" type="" class="bg-white min-h-max p-2"></textarea>
        </div>

        <div class="h-1/6 flex flex-col">
          <label for="" class="font-semibold" >Precio</label>
          <input v-model="price" type="text" class="bg-white h-full">
        </div>

        <button class="h-1/6 font-semibold">
          Add
        </button>

      </form>
  </div>
  <div class="bg-red-100 w-2/5 h-full">
    <ProductCard
    :product="preview"
    />
  </div>


</template>
