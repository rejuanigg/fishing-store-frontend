<script setup>
import { useAverage } from '@/composables/useAverage';
import { useRouter } from 'vue-router';
import { useFormatPrice } from '@/composables/useFormatPrice';
import { computed } from 'vue';

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
  <article class="group relative overflow-hidden rounded-[28px] border border-emerald-100/80 bg-white p-3 shadow-[0_14px_35px_rgba(15,23,42,0.06)] transition active:scale-[0.98]">

    <button @click="toProductView(props.product.id)" class="block w-full text-left">
      <div class="relative aspect-square overflow-hidden rounded-[22px] bg-emerald-50">

        <span v-if="props.product.stocks?.[0]?.quantity === 0" class="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white shadow-lg shadow-red-500/20">
          Sin stock
        </span>

        <span v-else-if="props.product.stocks?.[0]?.quantity <= 3" class="absolute left-3 top-3 z-10 rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-amber-950 shadow-lg shadow-amber-500/20">
          Últimos
        </span>

        <div class="absolute inset-0 bg-gradient-to-t from-emerald-950/15 via-transparent to-transparent opacity-0 transition group-active:opacity-100"></div>

        <img v-if="props.product.images?.length" :src="props.product.images[0].image" :alt="props.product.name" class="h-full w-full object-cover transition duration-300 group-active:scale-105">

        <img v-else src="../assets/1.png" :alt="props.product.name" class="h-full w-full object-cover transition duration-300 group-active:scale-105">
      </div>

      <div class="mt-3 flex flex-col gap-1">
        <h3 class="line-clamp-2 min-h-[40px] text-sm font-black leading-5 text-emerald-950">
          {{ props.product.name }}
        </h3>

        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-1">
            <span class="text-xs text-amber-400">★</span>
            <span class="text-xs font-bold text-slate-500">{{ average }}</span>
          </div>

          <span v-if="props.product.stocks?.[0]?.quantity > 0" class="text-[11px] font-bold text-emerald-500">
            Stock {{ props.product.stocks?.[0]?.quantity }}
          </span>
        </div>

        <p class="mt-1 text-lg font-black tracking-tight text-emerald-700">
          {{ formatedPriceValue(props.product.price) }}
        </p>
      </div>
    </button>

    <button v-if="isAdmin" @click.stop="toEdit(props.product.id)" class="mt-3 h-11 w-full rounded-2xl border border-emerald-500 bg-white text-sm font-black text-emerald-600 transition active:scale-[0.97]">
      Editar
    </button>

    <button v-else-if="props.product.stocks?.[0]?.quantity > 0" @click.stop="$emit('addCart', props.product)" class="mt-3 h-11 w-full rounded-2xl bg-emerald-500 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition active:scale-[0.97]">
      Agregar
    </button>

    <span v-else class="mt-3 flex h-11 w-full items-center justify-center rounded-2xl bg-slate-100 text-sm font-black text-slate-400">
      No disponible
    </span>

  </article>
</template>
