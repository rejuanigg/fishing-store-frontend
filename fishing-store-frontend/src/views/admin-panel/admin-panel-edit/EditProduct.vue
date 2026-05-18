<script setup>
import api from '@/services/api';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import Modal from '@/components/UI/Modal.vue';
import { useCategoryStore } from '@/stores/category';

const categoryStore = useCategoryStore()

onMounted(() => categoryStore.fetch())

const sections = computed(() => categoryStore.sections)
const categories = computed(() => categoryStore.categories)

const route = useRoute();
const router = useRouter();

const product = ref(null);
const productId = Number(route.params.id)

const selectedSection = ref(null);

const category = ref(null);
const name = ref('');
const description = ref('');
const price = ref(0);

const filterCatBySec = computed(()=>{
  return categories.value
  .filter(({section_id})=>section_id === selectedSection.value)
});

const idStock = ref(null)

onMounted(async()=>{
  const response = await api.get(`/products/${productId}`)
  product.value = response.data.data
  if(response.data.data.stocks[0] === undefined){
    const resStocks = await api.post('/stocks',{
      product_id:response.data.data.id,
      quantity:actualStock.value
    })
    idStock.value = resStocks.data.data.id
  }
  else{
    idStock.value = response.data.data.stocks[0].id
  }
});

watch(product, (actualValue) =>{
  if (!actualValue) return

  name.value = actualValue.name
  description.value = actualValue.description
  price.value = actualValue.price
  actualStock.value = actualValue.stocks[0]?.quantity ?? 1

  const productCat = actualValue.categories[0];

  if(productCat){
    selectedSection.value = productCat.section_id
    category.value = productCat
  }

})

const preview = computed(()=>{
  return {
    name:name.value,
    description:description.value,
    price:price.value,
    categories: category.value ? [category.value] : [],
    images: product.value?.images ?? []
  }
})

async function onSubmit(){
  const response = await api.put(`/products/${productId}`,{
    name:name.value,
    description:description.value,
    price:price.value,
    categories:[category.value.id],
  })

  await api.put(`/stocks/${idStock.value}`,{
    product_id:response.data.data.id,
    quantity:actualStock.value
  })

  modal.value = {
    visible: true,
    variant: 'success',
    title: 'Cambios aplicados',
    text: 'Las modificaciones se aplicaron correctamente. Puedes ver los cambios en el panel de administrador',
    confirmText: 'Continuar',
    action: successModal,
    showCancel:false
  }
}

//Delete

async function handleDelete(){
  const response = await api.delete(`/products/${productId}`)
  modal.value = {
    visible: true,
    variant: 'success',
    title: 'Producto archivado',
    text: 'El producto fué archivado correctamente',
    confirmText: 'Continuar',
    action: successModal,
    showCancel:true
  }
}

//Stock
const actualStock = ref(1);

const upStock = () => {actualStock.value++}
const downStock = () => {
  if(actualStock.value <= 0) return
  actualStock.value--
}

//Cambiar de pestañas
const tab = ref('product')

//Subir imagen
const file = ref([])

const createFormData = async()=>{
  if(!file.value || file.value.length === 0) return null;

  for (const image of file.value){
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('image', image);
    const response = await api.post('/images', formData)
    product.value.images.push(response.data.data);
  }
  file.value = []
}

const handleUpload = (evento) =>{
  file.value = [...evento.target.files];
  createFormData();
}

//Actualizar img

const updateFile = ref(null)

const uploadFormData = async(id, index)=>{
  if(!updateFile.value || updateFile.value.length === 0) return null;

  for (const image of updateFile.value){
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('image', image);
    formData.append('_method', 'PUT')

    const response = await api.post(`/images/${id}`, formData)
    product.value.images[index] = response.data.data
  }
}

const handleUpdate = (evento, id, index) =>{
  updateFile.value = [...evento.target.files]
  uploadFormData(id, index);
}

//Eliminacion
const onDelete = ref(null)

async function handleImgDelete(id, index){
  await api.delete(`/images/${id}`)
  product.value.images.splice(index,1)
}

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

// Modal de advetencia

const openSuccessModal = () => {
  modal.value = {
    visible: true,
    variant: 'warning',
    title: 'Está por modificar un Producto',
    text: 'Tenga en cuenta los cambios serán visibles para todos los productos ya existentes.',
    confirmText: 'Continuar',
    action: onSubmit
  }
}

//Modal para confirmar eliminacion

const openDeleteModal = () => {
  modal.value = {
    visible: true,
    variant: 'danger',
    title: '¿Archivar Producto?',
    text: 'El producto dejará de mostrarse en la tienda, pero seguirá disponible en el historial de órdenes.',
    confirmText: 'Archivar',
    action: handleDelete,
    showCancel:true
  }
}

const closeModal = () => {
  modal.value.visible = false
}

const successModal = () => router.push('/admin-panel/dashboard')


</script>

<template>
<div class="w-full bg-gray-100 rounded-2xl p-1 flex items-center gap-1">

  <button
    @click="tab = 'product'"
    class="flex-1 h-11 rounded-xl text-sm font-semibold transition"
    :class="tab === 'product'
      ? 'bg-emerald-500 text-white shadow-sm'
      : 'text-gray-500'"
  >
    Producto
  </button>

  <button
    @click="tab = 'images'"
    class="flex-1 h-11 rounded-xl text-sm font-semibold transition"
    :class="tab === 'images'
      ? 'bg-emerald-500 text-white shadow-sm'
      : 'text-gray-500'"
  >
    Imágenes
  </button>

</div>


<div v-if="tab==='product'">

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

      <form @submit.prevent="openSuccessModal" class="flex flex-col gap-6">
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

        <section class="flex flex-col gap-3">

          <div class="flex flex-col gap-3">
            <h2 class="text-lg font-bold text-emerald-950">
              Inventario
            </h2>

            <p class="text-sm text-gray-500">
              Gestioná el stock disponible.
            </p>

            <div class="w-full flex text-xl items-center justify-center gap-5">
              <span @click="downStock" class="border border-emerald-400 bg-emerald-100 px-2 rounded-lg">-</span>
              <span>{{actualStock}}</span>
              <span @click="upStock" class="border border-emerald-400 bg-emerald-100 px-2 rounded-lg">+</span>
            </div>
          </div>

        </section>

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

      <button type="button" @click="openDeleteModal" class="h-13 rounded-2xl border border-red-200 bg-red-50 text-red-600 text-sm font-semibold">
        Archivar producto
      </button>

    </div>

  </div>
</div>


<div v-else-if="product" class="min-h-screen flex flex-col">

  <div class="px-5 pt-6 pb-32 flex flex-col gap-6">

    <div class="flex flex-col gap-2">

      <h1 class="text-2xl font-bold text-emerald-950">
        Imágenes del producto
      </h1>

      <p class="text-sm leading-6 text-gray-500">
        Administrá, reemplazá y eliminá las imágenes visibles en la tienda.
      </p>

    </div>

    <div class="grid grid-cols-2 gap-4">

      <div v-for="(img, index) in product.images" :key="img.id" @click="item = index" class="bg-white border rounded-[28px] p-3 flex flex-col gap-3 shadow-sm transition cursor-pointer" :class="item === index ? 'border-emerald-500 shadow-emerald-100 scale-[1.01]' : 'border-gray-100'">

        <div class="relative">
          <img :src="img.image" class="h-40 w-full object-cover rounded-[20px]" />

          <span v-if="index === 0" class="absolute top-3 left-3 h-7 px-3 rounded-full bg-emerald-500 text-white text-[10px] font-semibold tracking-wide flex items-center">
            Principal
          </span>
        </div>

        <div class="flex flex-col gap-3">
          <div class="flex flex-col">
            <span class="text-sm font-semibold text-emerald-950">
              Imagen {{ index + 1 }}
            </span>
          </div>

            <div class="flex items-center gap-2 w-full">

              <label v-if="onDelete !== index" class="flex-1 h-10 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center justify-center cursor-pointer active:scale-95 transition">
                Reemplazar
                <input type="file" @change="handleUpdate($event, img.id, index)" class="hidden">
              </label>

              <div v-if="onDelete === index" class="flex items-center gap-2 flex-1">

                <button @click="onDelete = null" class="flex-1 h-10 rounded-2xl bg-gray-100 text-gray-600 text-xs font-semibold active:scale-95 transition">
                  Cancelar
                </button>

                <button @click="handleImgDelete(img.id, index)" class="flex-1 h-10 rounded-2xl bg-red-500 text-white text-xs font-semibold active:scale-95 transition">
                  Confirmar
                </button>

              </div>

              <button v-if="onDelete!==index" @click="onDelete = index" class="h-10 w-10 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center active:scale-95 transition">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673A2.25 2.25 0 0 1 15.916 21H8.084a2.25 2.25 0 0 1-2.244-1.327L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0A48.11 48.11 0 0 1 8.25 5.5m3.75 0V4.75A2.25 2.25 0 0 1 14.25 2.5h.75A2.25 2.25 0 0 1 17.25 4.75V5.5m-5.25 0h5.25" />
                </svg>

              </button>
            </div>
          </div>
      </div>

      <label class="bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-[28px] p-5 flex flex-col items-center justify-center gap-4 min-h-[260px] cursor-pointer active:scale-[0.98] transition">

        <div class="h-14 w-14 rounded-2xl bg-white flex items-center justify-center shadow-sm text-emerald-700">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>

        </div>

        <div class="flex flex-col items-center gap-1 text-center">
          <span class="text-sm font-semibold text-emerald-900">
            Agregar imagen
          </span>

          <span class="text-xs text-emerald-600">
            JPG, PNG o WEBP
          </span>
        </div>

        <input @change="handleUpload($event)" type="file" class="hidden" multiple />

      </label>
    </div>
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
