<script setup>
import api from '@/services/api';
import { ref, watch } from 'vue';

const emit = defineEmits(['updated'])
const props = defineProps({
  productId : {
    type:Number,
    default:null
  },
  calificationId: {
    type:Number,
    default:null
  },
  initialScore: {
    type: Number,
    default: 0
  }
})

console.log(props.initialScore);
const scoreStars = ref([5,4,3,2,1]);
const selectedScore = ref(props.initialScore ?? 0);

const hasScore = ref(false);

if (props.initialScore === 0 || props.initialScore === null){
  hasScore.value = false;
}
else{
  hasScore.value = true;
}

watch(
  () => props.initialScore,
  (value) => {
    selectedScore.value = value ?? 0;
    hasScore.value = value !== 0 && value !== null && value !== undefined;
  }
);

const select = async(value)=>{
  const previous = selectedScore.value

  if(previous === value){
    //Canelar
    if (!props.calificationId) return

    try {
      await api.delete(`/products/${props.productId}/califications/${props.calificationId}`)
      selectedScore.value = 0
      hasScore.value = false
      emit('updated')
    }
    catch(error){
      selectedScore.value = previous;
    }
  }
  else{
    selectedScore.value = value
    if (hasScore.value === false){
      try {
        await api.post(`/products/${props.productId}/califications`, {
          product_id: props.productId,
          score: value
        })
        hasScore.value = true;
        emit('updated')
      }
      catch(error){
        selectedScore.value = previous
        hasScore.value = false;
      }
    }

    else if(hasScore.value === true){
      if (!props.calificationId) return

      try {
        await api.patch(`/products/${props.productId}/califications/${props.calificationId}`, {
          product_id: props.productId,
          score: value
        })
        emit('updated')
      }
      catch(error){
        selectedScore.value = previous;
      }
    }
  }

}
</script>

<template>
  <div class="flex flex-row-reverse">
    <svg
      v-for="star in scoreStars"
      :key="star"
      @click="select(star)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="star <= selectedScore
        ? 'text-amber-600 fill-amber-600'
        : 'text-gray-300'"
      class="peer peer-hover:text-amber-600 hover:text-amber-600 cursor-pointer transition lucide lucide-star-icon lucide-star"
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
    </svg>
  </div>
</template>
