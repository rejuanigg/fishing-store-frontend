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

const formatedPriceValue = (value) => {
  const { formatedPrice } = useFormatPrice(value);
  return formatedPrice;
};

</script>

<template>
  <article class="group relative overflow-hidden rounded-[30px] border border-slate-100 bg-white p-2.5 shadow-[0_14px_35px_rgba(15,23,42,0.06)] transition active:scale-[0.98]">
    <button v-if="isAdmin" type="button" @click.stop="emit('toggleFeatured', props.product)" class="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/80 bg-white/95 shadow-[0_10px_25px_rgba(15,23,42,0.12)] backdrop-blur-md transition active:scale-[0.95]">
      <Star class="h-5 w-5" :class="props.product.is_featured ? 'fill-amber-400 text-amber-400' : 'text-slate-300'" />

      <span v-if="props.product.is_featured && props.product.featured_order" class="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-black text-white ring-2 ring-white">
        {{ props.product.featured_order }}
      </span>
    </button>

    <button @click="toProductView(props.product.id)" type="button" class="block w-full text-left">
      <div class="relative aspect-square overflow-hidden rounded-[26px] bg-slate-50">
        <span v-if="props.product.stocks?.[0]?.quantity === 0" class="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white shadow-[0_10px_22px_rgba(239,68,68,0.20)]">
          Sin stock
        </span>

        <span v-else-if="props.product.stocks?.[0]?.quantity <= 3" class="absolute left-3 top-3 z-10 rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-amber-950 shadow-[0_10px_22px_rgba(251,191,36,0.22)]">
          Últimos
        </span>

        <span v-else-if="props.product.is_featured" class="absolute left-3 top-3 z-10 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-emerald-700 shadow-[0_10px_22px_rgba(15,23,42,0.10)] backdrop-blur-md">
          Destacado
        </span>

        <div class="absolute inset-0 z-[1] bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent opacity-0 transition group-active:opacity-100"></div>

        <img v-if="props.product.images?.length" :src="props.product.images[0].image" :alt="props.product.name" class="h-full w-full object-cover transition duration-300 group-active:scale-105" :class="props.product.stocks?.[0]?.quantity === 0 ? 'opacity-70 grayscale-[0.15]' : ''">

        <img v-else src="../assets/1.png" :alt="props.product.name" class="h-full w-full object-cover transition duration-300 group-active:scale-105" :class="props.product.stocks?.[0]?.quantity === 0 ? 'opacity-70 grayscale-[0.15]' : ''">
      </div>

      <div class="mt-3 px-1">
        <h3 class="line-clamp-2 min-h-[40px] text-sm font-black leading-5 text-emerald-950">
          {{ props.product.name }}
        </h3>

        <div class="mt-2 flex items-center justify-between gap-2">
          <div class="flex min-w-0 items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1">
            <span class="text-xs text-amber-500">★</span>
            <span class="text-xs font-black text-emerald-950">{{ average }}</span>
            <span v-if="props.product.califications?.length" class="text-[11px] font-bold text-slate-400">
              ({{ props.product.califications.length }})
            </span>
          </div>

          <span v-if="props.product.stocks?.[0]?.quantity > 0" class="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-black text-emerald-600">
            Stock {{ props.product.stocks?.[0]?.quantity }}
          </span>

          <span v-else class="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-black text-red-500">
            Agotado
          </span>
        </div>

        <div class="mt-3 flex items-end justify-between gap-2">
          <p class="text-lg font-black tracking-tight text-emerald-700">
            {{ formatedPriceValue(props.product.price) }}
          </p>
        </div>
      </div>
    </button>

    <button v-if="isAdmin" type="button" @click.stop="toEdit(props.product.id)" class="mt-3 h-11 w-full rounded-2xl border border-emerald-200 bg-emerald-50 text-sm font-black text-emerald-700 transition active:scale-[0.97]">
      Editar producto
    </button>

    <button v-else-if="props.product.stocks?.[0]?.quantity > 0" type="button" @click.stop="addCartItem" class="mt-3 h-11 w-full rounded-2xl bg-emerald-600 text-sm font-black text-white shadow-[0_12px_28px_rgba(5,150,105,0.22)] transition active:scale-[0.97]">
      Agregar
    </button>

    <span v-else class="mt-3 flex h-11 w-full items-center justify-center rounded-2xl bg-slate-100 text-sm font-black text-slate-400">
      No disponible
    </span>
  </article>
</template>
