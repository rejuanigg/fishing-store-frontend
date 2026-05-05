<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])

</script>

<template>
  <input
  :value="modelValue"
  @input="$emit('update:modelValue', $event.target.value)"
  class="w-full min-h-[44px] px-4 rounded-xl border border-emerald-300" type="text" placeholder="Buscar Producto">
</template>
