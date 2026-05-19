<script setup>
import { useAverage } from '@/composables/useAverage';
import { useRouter } from 'vue-router';
import { useFormatPrice } from '@/composables/useFormatPrice';
import { Star } from '@lucide/vue';
import { cartStore } from '@/stores/cart';
import { useToastStore } from '@/stores/toast';

const toast = useToastStore();
const cart = cartStore();

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

function addCartItem() {
  cart.addProduct(props.product)
  toast.show('Éxito', 'Producto agregado correctamente', 'success')
}

const emit = defineEmits(['toggleFeatured']);

const router = useRouter();

const toProductView = (id) => {
  return router.push({name:'product-view', params:{ id:id }})
};

const toEdit = (id) => {
  return router.push({name:'admin-products-edit', params:{ id:id }})
}

const {average} = useAverage(props.product.califications)


const { formatPrice } = useFormatPrice();

</script>

<template>
  <article class="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[28px] border border-slate-100 bg-white p-2 shadow-[0_12px_30px_rgba(15,23,42,0.055)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(15,23,42,0.08)] active:scale-[0.98] sm:p-2.5">
    <button v-if="isAdmin" type="button" @click.stop="emit('toggleFeatured', props.product)" class="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-2xl border border-white/80 bg-white/95 shadow-[0_10px_25px_rgba(15,23,42,0.10)] backdrop-blur-md transition active:scale-[0.95]">
      <Star class="h-[18px] w-[18px]" :class="props.product.is_featured ? 'fill-amber-400 text-amber-400' : 'text-slate-300'" />
      <span v-if="props.product.is_featured && props.product.featured_order" class="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-black text-white ring-2 ring-white">{{ props.product.featured_order }}</span>
    </button>

    <button @click="toProductView(props.product.id)" type="button" class="flex min-w-0 flex-1 flex-col text-left">
      <div class="relative aspect-square overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-50 via-white to-emerald-50/40">
        <span v-if="props.product.stocks?.[0]?.quantity === 0" class="absolute left-2 top-2 z-10 rounded-full bg-red-500 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-white shadow-[0_10px_22px_rgba(239,68,68,0.18)]">Sin stock</span>
        <span v-else-if="props.product.stocks?.[0]?.quantity <= 3" class="absolute left-2 top-2 z-10 rounded-full bg-amber-400 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-amber-950 shadow-[0_10px_22px_rgba(251,191,36,0.18)]">Últimos</span>
        <span v-else-if="props.product.is_featured" class="absolute left-2 top-2 z-10 rounded-full border border-emerald-100 bg-white/95 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-emerald-700 shadow-[0_8px_18px_rgba(15,23,42,0.08)] backdrop-blur-md">Destacado</span>

        <img v-if="props.product.images?.length" :src="props.product.images[0].image" :alt="props.product.name" class="h-full w-full object-contain p-1.5 transition duration-300 group-hover:scale-[1.03] group-active:scale-105 min-[380px]:p-2 sm:p-3" :class="props.product.stocks?.[0]?.quantity === 0 ? 'opacity-70 grayscale-[0.15]' : ''">
        <img v-else src="../assets/1.png" :alt="props.product.name" class="h-full w-full object-contain p-1.5 transition duration-300 group-hover:scale-[1.03] group-active:scale-105 min-[380px]:p-2 sm:p-3" :class="props.product.stocks?.[0]?.quantity === 0 ? 'opacity-70 grayscale-[0.15]' : ''">
      </div>

      <div class="mt-3 flex min-w-0 flex-1 flex-col px-1">
        <h3 class="line-clamp-2 min-h-[40px] text-sm font-black leading-5 text-emerald-950">{{ props.product.name }}</h3>

        <div class="mt-2 flex min-h-[28px] items-center">
          <div class="inline-flex max-w-full items-center gap-1 rounded-full bg-amber-50 px-2 py-1">
            <span class="text-[11px] text-amber-500">★</span>
            <span class="text-xs font-black text-emerald-950">{{ average }}</span>
            <span v-if="props.product.califications?.length" class="hidden text-[11px] font-bold text-slate-400 min-[370px]:inline">({{ props.product.califications.length }})</span>
          </div>
        </div>

        <p class="mt-3 whitespace-nowrap text-[clamp(16px,4vw,19px)] font-black leading-tight tracking-tight text-emerald-800">{{ formatPrice(props.product.price) }}</p>
      </div>
    </button>

    <button v-if="isAdmin" type="button" @click.stop="toEdit(props.product.id)" class="mt-3 h-10 w-full rounded-2xl border border-emerald-200 bg-emerald-50 text-sm font-black text-emerald-700 transition active:scale-[0.97] sm:h-11">Editar producto</button>

    <button v-else-if="props.product.stocks?.[0]?.quantity > 0" type="button" @click.stop="addCartItem" class="mt-3 h-10 w-full rounded-2xl bg-emerald-600 text-sm font-black text-white shadow-[0_10px_22px_rgba(5,150,105,0.18)] transition hover:bg-emerald-700 active:scale-[0.97] sm:h-11">Agregar</button>

    <span v-else class="mt-3 flex h-10 w-full items-center justify-center rounded-2xl bg-slate-100 text-sm font-black text-slate-400 sm:h-11">No disponible</span>
  </article>
</template>
