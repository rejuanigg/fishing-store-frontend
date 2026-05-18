<script setup>
defineProps(['modelValue','placeHolder'])
defineEmits(['update:modelValue'])

</script>

<template>
  <div class="relative w-full">
    <div class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m21 21-4.35-4.35" />
        <circle cx="11" cy="11" r="7" />
      </svg>
    </div>

    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="h-13 min-h-[52px] w-full rounded-2xl border border-slate-200 bg-white px-12 text-sm font-semibold text-emerald-950 shadow-[0_10px_25px_rgba(15,23,42,0.04)] outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" type="text" placeholder="Buscar">

    <button v-if="modelValue" type="button" @click="$emit('update:modelValue', '')" class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl bg-slate-100 text-sm font-black text-slate-400 transition active:scale-[0.96]">
      ×
    </button>
  </div>
</template>
