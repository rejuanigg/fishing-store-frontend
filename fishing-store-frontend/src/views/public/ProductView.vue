<script setup>
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAverage } from '@/composables/useAverage';
import { useFormatPrice } from '@/composables/useFormatPrice';
import { cartStore } from '@/stores/cart';
import Score from '@/components/Score.vue';
import Loading from '@/components/UI/Loading.vue';
import Toast from '@/components/UI/Toast.vue';
import { useToastStore } from '@/stores/toast';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const cart = cartStore();
const productId = Number(route.params.id)
const product = ref(null)
const item = ref(0)
const loading = ref(true)
const calification = ref(null)

onMounted(async()=>{
  const response = await api.get(`/products/${productId}`)
  product.value = response.data.data
  loading.value = false
  calification.value = response.data.data.califications;
})

async function refresh() {
  const response = await api.get(`/products/${productId}`)
  product.value = response.data.data
  calification.value = response.data.data.califications
  console.log(calification.value)
}

const userCalification = computed(() =>{
  return calification.value?.find(c=>c.user_id === auth.id);
})

const averageValue = computed(() => {
  const { average } = useAverage(product.value.califications);
  return average;
});

const { formatPrice } = useFormatPrice();

const toast = useToastStore()

function addCartItem() {
  toast.show('Éxito', 'Producto agregado correctamente', 'success');
  cart.addProduct(product.value);
}

//Mostrar todas las categorias
const productCategories = computed(() => {
  return Array.isArray(product.value?.categories) ? product.value.categories : [];
});

</script>

<template>
  <div v-if="loading" class="flex min-h-[100dvh] w-full items-center justify-center bg-slate-50">
    <Loading />
  </div>

  <div v-else class="min-h-[100dvh] w-full bg-slate-50 pb-32 lg:pb-10">
    <main class="mx-auto grid w-full max-w-6xl gap-5 px-3 pt-3 min-[380px]:px-4 min-[380px]:pt-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-6 lg:px-6 lg:pt-6">
      <section class="min-w-0 lg:sticky lg:top-6 lg:self-start">
        <div class="relative overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.07)] min-[380px]:rounded-[34px]">
          <div class="absolute left-3 top-3 z-20 flex items-center gap-2 min-[380px]:left-4 min-[380px]:top-4">
            <RouterLink to="/products" class="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/80 bg-white/95 text-lg font-black text-emerald-950 shadow-[0_10px_25px_rgba(15,23,42,0.10)] backdrop-blur-md transition active:scale-[0.96]">‹</RouterLink>

            <span v-if="product.is_featured" class="flex h-10 items-center justify-center rounded-2xl border border-white/80 bg-white/95 px-3 text-[11px] font-black uppercase tracking-wide text-emerald-700 shadow-[0_10px_25px_rgba(15,23,42,0.10)] backdrop-blur-md">Destacado</span>
          </div>

          <div class="absolute right-3 top-3 z-20 min-[380px]:right-4 min-[380px]:top-4">
            <span v-if="product.stocks?.[0]?.quantity <= 0" class="flex h-10 items-center justify-center rounded-2xl bg-red-500 px-3 text-[11px] font-black uppercase tracking-wide text-white shadow-[0_10px_25px_rgba(239,68,68,0.20)]">Sin stock</span>
            <span v-else-if="product.stocks?.[0]?.quantity <= 3" class="flex h-10 items-center justify-center rounded-2xl bg-amber-400 px-3 text-[11px] font-black uppercase tracking-wide text-amber-950 shadow-[0_10px_25px_rgba(251,191,36,0.22)]">Últimos</span>
          </div>

          <div class="relative flex h-[300px] w-full items-center justify-center bg-white p-3 min-[380px]:h-[340px] min-[380px]:p-4 sm:h-[430px] lg:h-[520px]">

            <img v-if="product.images?.[item]?.image" class="relative z-[1] h-full w-full rounded-[24px] object-contain transition duration-300 sm:rounded-[28px]" :class="product.stocks?.[0]?.quantity <= 0 ? 'opacity-70 grayscale-[0.15]' : ''" :src="product.images?.[item]?.image" :alt="product.name">
            <img v-else src="../../assets/1.png" class="relative z-[1] h-full w-full rounded-[24px] object-contain transition duration-300 sm:rounded-[28px]" :class="product.stocks?.[0]?.quantity <= 0 ? 'opacity-70 grayscale-[0.15]' : ''" :alt="product.name">
          </div>
        </div>

        <div v-if="product.images?.length > 1" class="mt-4 flex gap-3 overflow-x-auto px-1 pb-1 snap-x snap-mandatory">
          <button v-for="(img, index) in product.images" :key="index" type="button" @click="item = index" class="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 bg-white p-1 shadow-[0_10px_25px_rgba(15,23,42,0.05)] transition active:scale-[0.96] snap-start min-[380px]:h-20 min-[380px]:w-20 min-[380px]:rounded-3xl" :class="item === index ? 'border-emerald-500 opacity-100' : 'border-slate-100 opacity-70'">
            <img :src="img.image" class="h-full w-full rounded-[18px] object-contain min-[380px]:rounded-[20px]" :alt="product.name">
          </button>
        </div>
      </section>

      <section class="min-w-0 space-y-5">
        <article class="rounded-[30px] border border-slate-100 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] min-[380px]:rounded-[34px] min-[380px]:p-5">
          <div class="flex flex-col gap-5">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <span class="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600 min-[380px]:text-[11px]">Producto</span>
                <h1 class="mt-2 text-[clamp(24px,7vw,38px)] font-black leading-tight tracking-tight text-emerald-950">{{ product.name }}</h1>
              </div>

              <span v-if="product.stocks?.[0]?.quantity > 0" class="shrink-0 rounded-full bg-emerald-50 px-3 py-2 text-[11px] font-black text-emerald-700">Disponible</span>
              <span v-else class="shrink-0 rounded-full bg-red-50 px-3 py-2 text-[11px] font-black text-red-600">Sin stock</span>
            </div>

            <div class="rounded-[28px] border border-emerald-100 bg-emerald-50/80 p-4">
              <span class="text-xs font-bold uppercase tracking-wide text-emerald-600">Precio</span>
              <p class="mt-1 whitespace-nowrap text-[clamp(26px,7vw,38px)] font-black leading-tight tracking-tight text-emerald-700">
                {{ formatPrice(product.price) }}
              </p>
            </div>
            <div class="flex flex-col gap-3">
              <div class="rounded-[28px] border border-amber-100 bg-amber-50/70 p-4">
                <div class="flex items-start justify-between gap-3">
                  <span class="text-[10px] font-black uppercase tracking-wide text-amber-700">
                    Puntuación
                  </span>

                  <div class="shrink-0 text-right">
                    <span class="block text-2xl font-black leading-none text-emerald-950">
                      {{ averageValue }}
                    </span>

                    <span class="mt-1 block text-[11px] font-bold text-slate-400">
                      {{ product.califications?.length ?? 0 }} reseñas
                    </span>
                  </div>
                </div>

                <div class="mt-4 flex justify-start">
                  <Score
                  :product-id="product.id"
                  :initial-score="userCalification?.score"
                  :calification-id="userCalification?.id"
                  @updated="refresh"
                  />
                </div>
              </div>

              <div class="rounded-[28px] border p-4" :class="product.stocks?.[0]?.quantity > 0 ? 'border-emerald-100 bg-emerald-50/70' : 'border-red-100 bg-red-50/70'">
                <div class="flex items-start justify-between gap-3">
                  <span class="text-[10px] font-black uppercase tracking-wide" :class="product.stocks?.[0]?.quantity > 0 ? 'text-emerald-600' : 'text-red-500'">
                    Stock disponible
                  </span>

                  <span class="shrink-0 rounded-full px-3 py-1 text-xs font-black" :class="product.stocks?.[0]?.quantity > 0 ? 'bg-white text-emerald-700' : 'bg-white text-red-500'">
                    {{ product.stocks?.[0]?.quantity > 0 ? 'Disponible' : 'Sin stock' }}
                  </span>
                </div>

                <div class="mt-3 flex items-end gap-2">
                  <span class="text-3xl font-black leading-none" :class="product.stocks?.[0]?.quantity > 0 ? 'text-emerald-950' : 'text-red-600'">
                    {{ product.stocks?.[0]?.quantity > 0 ? product.stocks?.[0]?.quantity : 0 }}
                  </span>

                  <span class="pb-0.5 text-sm font-bold text-slate-500">
                    {{ product.stocks?.[0]?.quantity > 0 ? 'unidades' : 'sin stock' }}
                  </span>
                </div>
              </div>
            </div>



          </div>
        </article>

        <section class="rounded-[30px] border border-slate-100 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] min-[380px]:rounded-[34px] min-[380px]:p-5">
          <div>
            <span class="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-600">Detalles del producto</span>
            <h2 class="mt-2 text-xl font-black text-emerald-950">Información completa</h2>
          </div>

          <div class="mt-5">
            <span class="text-xs font-bold uppercase tracking-wide text-slate-400">Categorías</span>

            <div v-if="productCategories.length" class="mt-3 flex flex-wrap gap-2">
              <span v-for="category in productCategories" :key="category.id" class="inline-flex max-w-full items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                <span class="block max-w-[170px] truncate sm:max-w-none">{{ category.name }}</span>
              </span>
            </div>

            <span v-else class="mt-3 inline-flex w-fit items-center rounded-full border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-black text-slate-500">General</span>
          </div>

          <div class="mt-6 border-t border-slate-100 pt-5">
            <span class="text-xs font-bold uppercase tracking-wide text-slate-400">Descripción</span>
            <p class="mt-3 text-[15px] font-medium leading-7 text-slate-500 text-pretty">{{ product.description }}</p>
          </div>
        </section>

        <section class="grid grid-cols-1 gap-3 min-[440px]:grid-cols-2">
          <div class="rounded-[28px] border border-emerald-100 bg-emerald-50/70 p-4">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">✓</div>
            <h3 class="mt-3 text-sm font-black text-emerald-950">Stock real</h3>
            <p class="mt-1 text-xs font-medium leading-5 text-emerald-700">La tienda valida disponibilidad al crear tu pedido.</p>
          </div>

          <div class="rounded-[28px] border border-cyan-100 bg-white p-4 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">↗</div>
            <h3 class="mt-3 text-sm font-black text-emerald-950">Por WhatsApp</h3>
            <p class="mt-1 text-xs font-medium leading-5 text-slate-500">Coordinás pago, retiro o entrega después de enviar el pedido.</p>
          </div>
        </section>
      </section>
    </main>

    <div class="fixed inset-x-0 bottom-0 z-40 border-t border-emerald-100/70 bg-white/95 px-3 pt-2.5 pb-[calc(env(safe-area-inset-bottom)+10px)] shadow-[0_-16px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl lg:hidden">
      <div class="mx-auto flex max-w-screen-md items-center gap-2 rounded-[24px] border border-slate-100 bg-white p-2 shadow-[0_12px_35px_rgba(15,23,42,0.06)] min-[380px]:gap-3 min-[380px]:rounded-[28px]">
        <div class="min-w-0 flex-1 px-2 min-[380px]:px-3">
          <span class="block text-[9px] font-black uppercase tracking-[0.14em] text-slate-400 min-[380px]:text-[10px]">Total en carrito</span>
          <span class="mt-0.5 block truncate text-base font-black tracking-tight text-emerald-950 min-[380px]:text-xl">{{ formatPrice(cart.total) }}</span>
        </div>

        <button v-if="product.stocks?.[0]?.quantity > 0" @click="addCartItem" type="button" class="flex h-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 px-4 text-sm font-black text-white shadow-[0_12px_28px_rgba(5,150,105,0.24)] transition active:scale-[0.97] min-[380px]:h-14 min-[380px]:px-5">Añadir</button>
        <span v-else class="flex h-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 px-4 text-sm font-black text-slate-400 min-[380px]:h-14 min-[380px]:px-5">Sin stock</span>
      </div>
    </div>
  </div>
</template>
