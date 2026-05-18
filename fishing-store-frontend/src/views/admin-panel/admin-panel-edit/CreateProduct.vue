<script setup>
import { useRouter } from 'vue-router';
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { useCategoryStore } from '@/stores/category';
import Modal from '@/components/UI/Modal.vue';

import { useToastStore } from '@/stores/toast';

const toast = useToastStore();
const fecthLoading = ref(false)

const router = useRouter();

const categoryStore = useCategoryStore()

onMounted(() => categoryStore.fetch())

const sections = computed(() => categoryStore.sections)
const categories = computed(() => categoryStore.categories)
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
  fecthLoading.value = true
  try {
    const response = await api.post('/products',{
      name:name.value,
      description:description.value,
      price:price.value,
      categories:[category.value.id]
    })

    await api.post('/stocks',{
      product_id:response.data.data.id,
      quantity:actualStock.value
    })
    successModal(response.data.data.id)
  }

  catch (error) {
    const errors = error.response?.data?.errors
    const message = errors
      ? Object.values(errors).flat().join(' | ')
      : error.response?.data?.message ?? 'No se puede crear el producto, revisá bien antes de enviar.'
    toast.show('Error', message, 'error')
  }

  finally {
    fecthLoading.value = false
  }
}

const preview = computed(()=>{
  return {
    name:name.value,
    description:description.value,
    price:price.value,
    categories: category.value ? [category.value] : []
  }
})

//Stock
const actualStock = ref(1);

const upStock = () => {actualStock.value++}
const downStock = () => {actualStock.value--}

//Modal

const modal = ref({
  visible: false,
  variant: 'warning',
  title: '',
  text: '',
  confirmText: '',
  action: null,
  showCancel:true
})

const successModal = (id) => {
  toast.show('Éxito', 'Producto creado correctamente', 'success')
  return router.push({name:'admin-product-image', params:{id:id}})
}

</script>


<template>
  <div class="min-h-screen flex flex-col">
    <div class="px-5 pt-6 pb-32 flex flex-col gap-8">
      <section class="flex flex-col gap-2">
        <h1 class="text-2xl font-bold text-emerald-950">
          Crear producto
        </h1>

        <p class="text-sm leading-6 text-gray-500">
          Creá un producto para mostrarlo en tu tienda.
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

        <section class="flex flex-col gap-3">

          <div class="flex flex-col gap-1">
            <h2 class="text-lg font-bold text-emerald-950">
              Inventario
            </h2>

            <p class="text-sm text-gray-500">
              Seleccioná el stock disponible.
            </p>

            <div class="w-full flex text-xl items-center justify-center gap-5">
              <span @click="downStock" class="border border-emerald-400 bg-emerald-100 px-2 rounded-lg">-</span>
              <input v-model="actualStock" type="number">
              <span @click="upStock" class="border border-emerald-400 bg-emerald-100 px-2 rounded-lg">+</span>
            </div>

          </div>

        </section>

        <button class="h-13 mt-2 rounded-2xl bg-emerald-500 text-white  text-sm font-semibold active:scale-[0.98] transition" :disabled="fecthLoading">
          <span v-if="fecthLoading"> Creando...</span>
          <span v-else>Crear producto</span>
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

<Modal
v-if="modal.visible"
:variant="modal.variant"
:title="modal.title"
:text="modal.text"
:confirm-text="modal.confirmText"
:show-cancel="modal.showCancel"
@confirm-action="modal.action"
@close-modal="closeModal"
/>


</template>
