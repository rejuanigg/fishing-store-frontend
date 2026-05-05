<script setup>

defineEmits(['closeModal']);

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info'
  },
  action:{
    type:String,
    default: ''
  }
});

</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

    <div class="bg-white p-6 rounded-lg shadow-xl">




      <div v-if="type ==='actionCaution'" class="flex flex-col gap-5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 flex items-center w-full text-amber-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <p class="flex flex-col items-center text-emerald-950">{{text}}</p>

        <div class="flex flex-col gap-5">
          <button class=" border-2 px-5 py-2 font-semibold border-emerald-600 text-emerald-900 rounded-lg"
          @click="$emit('closeModal')">Cancelar</button>

          <button class="px-5 py-2 font-semibold bg-amber-600 text-emerald-50 rounded-lg"
          @click="$emit('action')">{{ action }}</button>
        </div>

      </div>

      <div v-if="type === 'actionContinue'" class="flex flex-col gap-5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 flex items-center w-full text-amber-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        <p class="flex flex-col items-center text-emerald-950">{{text}}</p>
        <div class="flex flex-col gap-5">
          <button class="px-5 py-2 font-semibold bg-emerald-500 text-emerald-50 rounded-lg">Continuar</button>
        </div>
      </div>

    <div v-if="type==='actionSend'" class="flex flex-col gap-5">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 flex items-center w-full text-amber-600">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
      <p class="flex flex-col items-center text-emerald-950">{{text}}</p>
      <div class="flex flex-col gap-5">
        <button class="px-5 py-2 font-semibold bg-emerald-500 text-emerald-50 rounded-lg" >Continuar</button>
      </div>
    </div>

    <div v-if="type==='actionBlocked'" class="flex flex-col gap-5">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 flex items-center w-full text-amber-600">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
      <p class="flex flex-col items-center text-emerald-950">{{text}}</p>
      <div class="flex flex-col gap-5">
        <button class="px-5 py-2 font-semibold bg-emerald-500 text-emerald-50 rounded-lg">Continuar</button>
      </div>
    </div>











    </div>

  </div>
</template>
