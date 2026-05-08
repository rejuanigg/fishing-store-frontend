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
  <div class="min-h-screen flex flex-col">
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

          <select v-model="selectedSection" class="h-13 px-4  rounded-2xl border border-gray-200 bg-white text-sm  outline-none focus:border-emerald-500">
            <option v-for="section in sections" :key="section.id"   :value="section.id">{{ section.name }}</option>
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

        <button class="h-13 mt-2 rounded-2xl bg-emerald-500 text-white  text-sm font-semibold active:scale-[0.98] transition">
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
  </div>

</div>


</template>
